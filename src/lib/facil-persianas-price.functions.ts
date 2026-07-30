import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Preço ao vivo direto do site da Fácil Persianas — mesma técnica usada pelo
 * agente de vendas do WhatsApp (ver agente-ia-vendas/templates/whatsapp/agent_template.py,
 * função `buscar_preco_ao_vivo`). O mercado desse produto não segue uma reta
 * simples de R$/m² (o preço sobe em degraus reais por tamanho), então em vez
 * de usar o price_per_sqm fixo do banco, buscamos os preços reais das
 * variantes (largura x altura) publicadas pela Fácil Persianas e usamos o
 * preço do próximo degrau real >= área pedida (a Fácil arredonda pra cima,
 * não interpola — testado ao vivo no seletor real deles em 2026-07-30).
 *
 * Se a busca falhar por qualquer motivo (site fora do ar, timeout, produto
 * sem handle mapeado), retorna success:false — quem chamar deve cair de
 * volta pro price_per_sqm estático do produto.
 */

const FACIL_PERSIANAS_BASE = "https://www.facilpersianas.com.br";

/**
 * Área mínima cobrada pela Ágil (política própria, decidida pelo cliente em
 * 2026-07-30) — qualquer pedido menor que isso é cobrado como se tivesse
 * essa área. Usar esse valor em qualquer lugar do site que precise mostrar
 * ou calcular a área mínima, em vez do campo `min_area` do banco (que ainda
 * está com o valor antigo de 1 m² e não pode ser editado por aqui).
 */
export const AREA_MINIMA_COBRADA_M2 = 1.8;

// Mesmo mapeamento cor → handle usado pelo agente do WhatsApp.
const HANDLES_ROLO_BLACKOUT_LISO: Record<string, string> = {
  branco: "persiana-rolo-blackout-branca",
  branca: "persiana-rolo-blackout-branca",
  bege: "persiana-rolo-blackout-bege",
  cinza: "persiana-rolo-blackout-cinza",
  preto: "persiana-rolo-blackout-preta",
  preta: "persiana-rolo-blackout-preta",
};

const HANDLES_ROLO_TEXTURIZADO: Record<string, string> = {
  branco: "persiana-rolo-tela-solar-3-branca",
  branca: "persiana-rolo-tela-solar-3-branca",
  bege: "persiana-rolo-tela-solar-3-bege",
  cinza: "persiana-rolo-tela-solar-3-cinza",
  preto: "persiana-rolo-tela-solar-3-preta",
  preta: "persiana-rolo-tela-solar-3-preta",
};

/** Decide qual mapa de handles usar a partir do slug do produto no site da Ágil. */
function handlesForSlug(slug: string): Record<string, string> | null {
  const s = slug.toLowerCase();
  if (s.includes("texturizado")) return HANDLES_ROLO_TEXTURIZADO;
  if (s.includes("liso")) return HANDLES_ROLO_BLACKOUT_LISO;
  return null;
}

/**
 * A Fácil Persianas NÃO interpola suavemente entre tamanhos — testamos ao
 * vivo no site deles (mudando largura/altura no seletor real) e confirmamos
 * que o preço "arredonda pra cima" pro próximo tamanho real de verdade
 * (ex: 1,00m x 1,00m cobra o mesmo preço de 1,00m x 1,20m, porque não existe
 * corte menor que 1,20m de altura pra essa largura). Por isso usamos o preço
 * do próximo ponto real ≥ área pedida (degrau), em vez de calcular uma média
 * entre dois pontos — a média dava um valor mais barato que o real.
 */
function precoPorDegrau(areaM2: number, pontos: Array<[number, number]>): number {
  const ordenados = [...pontos].sort((a, b) => a[0] - b[0]);
  for (const [area, preco] of ordenados) {
    if (areaM2 <= area) return preco;
  }
  // Área maior que o maior ponto coletado: aí sim extrapola pela inclinação
  // do último trecho, já que não há um próximo degrau real pra usar.
  const [a0, p0] = ordenados[ordenados.length - 2];
  const [a1, p1] = ordenados[ordenados.length - 1];
  const taxa = (p1 - p0) / (a1 - a0);
  return p1 + (areaM2 - a1) * taxa;
}

async function buscarPrecoAoVivo(handle: string, areaM2: number): Promise<number | null> {
  try {
    const url = `${FACIL_PERSIANAS_BASE}/products/${handle}.json`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "application/json,text/html;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      product?: { variants?: Array<{ title?: string; price?: string | number }> };
    };
    const pontos: Array<[number, number]> = [];
    for (const v of data.product?.variants ?? []) {
      const m = /^(\d+)-(\d+)$/.exec(v.title ?? "");
      if (!m) continue;
      const wCm = Number(m[1]);
      const hCm = Number(m[2]);
      const area = (wCm / 100) * (hCm / 100);
      const price = Number(v.price);
      if (Number.isFinite(area) && Number.isFinite(price)) pontos.push([area, price]);
    }
    if (pontos.length === 0) return null;
    return precoPorDegrau(areaM2, pontos);
  } catch (err) {
    console.error(`Preço ao vivo (Fácil Persianas) falhou para ${handle}:`, err);
    return null;
  }
}

const PrecoAoVivoSchema = z.object({
  productSlug: z.string().min(1),
  color: z.string().min(1),
  areaM2: z.number().min(0.01).max(50),
});

export const getPrecoAoVivo = createServerFn({ method: "GET" })
  .inputValidator((input: z.infer<typeof PrecoAoVivoSchema>) => PrecoAoVivoSchema.parse(input))
  .handler(async ({ data }) => {
    const handles = handlesForSlug(data.productSlug);
    if (!handles) return { success: false as const };

    const corNorm = data.color.trim().toLowerCase();
    const handle = handles[corNorm] ?? handles["branca"];
    const preco = await buscarPrecoAoVivo(handle, data.areaM2);
    if (preco === null) return { success: false as const };
    return { success: true as const, price: preco };
  });
