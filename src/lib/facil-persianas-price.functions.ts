import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Preço ao vivo direto do site da Fácil Persianas — mesma técnica usada pelo
 * agente de vendas do WhatsApp (ver agente-ia-vendas/templates/whatsapp/agent_template.py,
 * função `buscar_preco_ao_vivo`). O mercado desse produto não segue uma reta
 * simples de R$/m² (a taxa por m² varia por faixa), então em vez de usar o
 * price_per_sqm fixo do banco, buscamos os preços reais das variantes
 * (largura x altura) publicadas pela Fácil Persianas e interpolamos entre os
 * pontos mais próximos da área pedida.
 *
 * Se a busca falhar por qualquer motivo (site fora do ar, timeout, produto
 * sem handle mapeado), retorna success:false — quem chamar deve cair de
 * volta pro price_per_sqm estático do produto.
 */

const FACIL_PERSIANAS_BASE = "https://www.facilpersianas.com.br";

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

function interpolarPreco(areaM2: number, pontos: Array<[number, number]>): number {
  const ordenados = [...pontos].sort((a, b) => a[0] - b[0]);
  if (areaM2 <= ordenados[0][0]) return ordenados[0][1];
  const ultimo = ordenados[ordenados.length - 1];
  let a0: number, p0: number, a1: number, p1: number;
  if (areaM2 >= ultimo[0]) {
    [a0, p0] = ordenados[ordenados.length - 2];
    [a1, p1] = ultimo;
  } else {
    let i = 0;
    for (; i < ordenados.length - 1; i++) {
      if (ordenados[i][0] <= areaM2 && areaM2 <= ordenados[i + 1][0]) break;
    }
    [a0, p0] = ordenados[i];
    [a1, p1] = ordenados[i + 1];
  }
  const taxa = (p1 - p0) / (a1 - a0);
  return p0 + (areaM2 - a0) * taxa;
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
    return interpolarPreco(areaM2, pontos);
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
