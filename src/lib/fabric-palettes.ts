/**
 * Paletas de cores reais dos tecidos da Ágil Persianas.
 * Mapeamento por modelo/tecido — usado no Simulador de Ambiente
 * para garantir que o cliente veja exatamente as cores disponíveis
 * para cada produto (em vez de cores genéricas).
 */

export type FabricColor = {
  name: string;
  hex: string;
  /** Caminho público para a foto da amostra real (quando houver). */
  swatch?: string;
};

/**
 * Blackout Texturizado — serve Rolô, Romana e Painel (mesmo tecido).
 * Cores e amostras extraídas da cartela oficial da Ágil
 * (Imagens/Blackout-Texturizado-cores.png); os hex são a média real
 * medida em cada faixa da cartela, não valores inventados.
 */
export const TEXTURIZADO: FabricColor[] = [
  { name: "Branco", hex: "#F1F1F3", swatch: "/fabrics/tex2-branco.jpg" },
  { name: "Light Green", hex: "#E6E7E3", swatch: "/fabrics/tex2-light-green.jpg" },
  { name: "Bege", hex: "#D9D7CB", swatch: "/fabrics/tex2-bege.jpg" },
  { name: "Cinza", hex: "#D1D2D4", swatch: "/fabrics/tex2-cinza.jpg" },
  { name: "Marron", hex: "#C1BDB0", swatch: "/fabrics/tex2-marron.jpg" },
];

/**
 * Blackout Tecido Liso — serve Rolô, Romana e Painel (mesmo tecido).
 * Cartela oficial: Imagens/Blackout-Liso_cores.png.
 */
export const PINPOINT: FabricColor[] = [
  { name: "Branco", hex: "#D1D0CC", swatch: "/fabrics/liso-branco.jpg" },
  { name: "Bege", hex: "#BCB6AA", swatch: "/fabrics/liso-bege.jpg" },
  { name: "Marron", hex: "#969289", swatch: "/fabrics/liso-marron.jpg" },
  { name: "Preto", hex: "#1B1C1D", swatch: "/fabrics/liso-preto.jpg" },
];

/**
 * Tela Solar — todos os modelos (rolô, romana, painel).
 * Ainda sem cartela oficial fotografada: os hex abaixo são aproximações
 * das cores de catálogo e NÃO têm foto de amostra real associada
 * (por isso sem `swatch`). Trocar assim que chegar a cartela.
 */
export const TELA_SOLAR: FabricColor[] = [
  { name: "Branco", hex: "#E8E4D6" },
  { name: "Bege", hex: "#C2AE84" },
  { name: "Cinza", hex: "#8C8C88" },
  { name: "Light Green", hex: "#DDE0D8" },
  { name: "Preto", hex: "#2A2D30" },
];

/** União de todas as opções — usada para Vedação Total. */
export const VEDACAO_TOTAL: FabricColor[] = (() => {
  const seen = new Set<string>();
  const out: FabricColor[] = [];
  for (const c of [...TEXTURIZADO, ...PINPOINT, ...TELA_SOLAR]) {
    const key = c.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(c);
  }
  return out;
})();

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Decide qual paleta usar a partir do nome (e descrição) do produto.
 * Se nada bater, retorna `null` para o caller usar o fallback do banco.
 */
export function paletteFor(productName: string, extra?: string): FabricColor[] | null {
  const t = norm(`${productName} ${extra ?? ""}`);

  // Vedação Total é o mais permissivo — mostra tudo.
  if (t.includes("vedacao") || t.includes("vedação")) return VEDACAO_TOTAL;

  // Tela Solar / Solar Screen (todos os modelos).
  if (t.includes("tela solar") || t.includes("solar")) return TELA_SOLAR;

  // Tecido Liso / Pinpoint (apenas no Rolô Blackout Tecido Liso).
  if (t.includes("tecido liso") || t.includes("pinpoint") || t.includes("liso"))
    return PINPOINT;

  // Texturizado e Translúcida nos modelos rolô / romana / painel.
  if (t.includes("texturizado") || t.includes("translucid")) return TEXTURIZADO;

  return null;
}