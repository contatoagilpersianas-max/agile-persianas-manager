/**
 * FabricSwatch — amostra de tecido renderizada em CSS, sem depender de foto.
 *
 * Por que existe: o catálogo não tem fotografia real de cada tecido/cor, e as
 * imagens que estavam ali eram de banco de imagem (quebradas na prática, o que
 * deixava o seletor com alt-text no lugar da foto). Em vez de fingir uma foto,
 * a gente desenha a *trama* do tecido: cada tipo tem um padrão próprio
 * (blackout liso, texturizado, tela solar, double vision, romana, madeira,
 * alumínio), pintado na cor real do produto.
 *
 * Isso é honesto — lê como amostra de mostruário, não como foto do produto
 * instalado — e escala pra qualquer cor nova sem precisar de estúdio.
 */

export type FabricKind =
  | "liso"
  | "texturizado"
  | "vedacao"
  | "screen"
  | "doublevision"
  | "romana"
  | "translucida"
  | "madeira"
  | "aluminio"
  | "tela";

/** Descobre o tipo de trama a partir do nome comercial do produto. */
export function fabricKindFromName(name: string, categoryLabel?: string): FabricKind {
  const s = `${name} ${categoryLabel ?? ""}`.toLowerCase();

  if (s.includes("mosquiteira") || s.includes("mosquito")) return "tela";
  if (s.includes("madeira")) return "madeira";
  if (s.includes("alumín") || s.includes("alumin")) return "aluminio";
  if (s.includes("double vision") || s.includes("doublevision")) return "doublevision";
  if (s.includes("vedação total") || s.includes("vedacao total") || s.includes("guia") || s.includes("kitbox"))
    return "vedacao";
  if (s.includes("tela solar") || s.includes("screen") || /\b[135]\s*%/.test(s)) return "screen";
  if (s.includes("romana")) return "romana";
  if (s.includes("translúc") || s.includes("transluc") || s.includes("opaca")) return "translucida";
  if (s.includes("textur")) return "texturizado";
  if (s.includes("liso")) return "liso";
  return "texturizado";
}

/** Uma linha curta descrevendo o comportamento do tecido — vira legenda no seletor. */
export function fabricDescriptor(kind: FabricKind): string {
  switch (kind) {
    case "liso":
      return "Superfície lisa · bloqueio total de luz";
    case "texturizado":
      return "Trama em relevo · bloqueio total de luz";
    case "vedacao":
      return "Guias laterais · escuridão sem frestas";
    case "screen":
      return "Micro-trama · filtra o sol e mantém a vista";
    case "doublevision":
      return "Faixas alternadas · luz regulável";
    case "romana":
      return "Dobras horizontais · caimento sofisticado";
    case "translucida":
      return "Difusa · luz suave com privacidade";
    case "madeira":
      return "Lâminas amadeiradas · resistente à umidade";
    case "aluminio":
      return "Lâminas metálicas · ângulo ajustável";
    case "tela":
      return "Tela fina · barra insetos sem travar o ar";
  }
}

/**
 * Encurta o nome comercial pro seletor, tirando o que já está implícito.
 * A categoria já foi escolhida no passo anterior, então repetir "Cortina Rolô"
 * em cada card só empurra o texto pra 3 linhas e estoura o layout.
 *   "Cortina Rolô Blackout - Tecido Liso"  (cat. Rolô) → "Blackout · Tecido Liso"
 */
export function shortFabricName(name: string, categoryLabel?: string): string {
  let s = name.trim();

  s = s.replace(/\bsob\s+medida\b/gi, "");
  s = s.replace(/^(cortina|persiana|tela)\s+/i, "");

  if (categoryLabel) {
    const cat = categoryLabel.trim();
    // remove o nome da categoria (e variações sem acento) do começo do texto
    const loose = cat.replace(/[^\p{L}\s]/gu, "").trim();
    for (const token of loose.split(/\s+/).filter(Boolean)) {
      s = s.replace(new RegExp(`^\\s*${token}\\s+`, "i"), "");
    }
  }

  s = s.replace(/\s*[-–—]\s*/g, " · ");
  s = s.replace(/\s{2,}/g, " ").replace(/^[·\s]+|[·\s]+$/g, "");

  return s || name;
}

/** Camadas de gradiente que simulam a trama de cada tecido. */
function fabricLayers(kind: FabricKind): { image: string; size?: string } {
  switch (kind) {
    case "liso":
      return {
        image: [
          "linear-gradient(100deg, rgba(255,255,255,.20) 0%, rgba(255,255,255,0) 42%)",
          "linear-gradient(180deg, rgba(255,255,255,.14), rgba(0,0,0,.05) 58%, rgba(0,0,0,.16))",
        ].join(","),
      };

    case "texturizado":
      return {
        image: [
          "repeating-linear-gradient(90deg, rgba(0,0,0,.07) 0 1px, rgba(255,255,255,.05) 1px 2px, transparent 2px 4px)",
          "repeating-linear-gradient(0deg, rgba(0,0,0,.06) 0 1px, rgba(255,255,255,.06) 1px 2px, transparent 2px 4px)",
          "linear-gradient(180deg, rgba(255,255,255,.12), rgba(0,0,0,.14))",
        ].join(","),
      };

    case "vedacao":
      // trama fechada + trilhos laterais escuros (as guias que matam a fresta)
      return {
        image: [
          "linear-gradient(90deg, rgba(0,0,0,.34) 0 8%, transparent 8% 92%, rgba(0,0,0,.34) 92%)",
          "repeating-linear-gradient(0deg, rgba(0,0,0,.05) 0 1px, transparent 1px 3px)",
          "linear-gradient(180deg, rgba(255,255,255,.10), rgba(0,0,0,.20))",
        ].join(","),
      };

    case "screen":
      // micro-mesh: grade fina com "furos" deixando passar luz
      return {
        image: [
          "repeating-linear-gradient(0deg, rgba(0,0,0,.20) 0 1px, transparent 1px 3px)",
          "repeating-linear-gradient(90deg, rgba(0,0,0,.20) 0 1px, transparent 1px 3px)",
          "linear-gradient(180deg, rgba(255,255,255,.26), rgba(255,255,255,.04) 60%, rgba(0,0,0,.10))",
        ].join(","),
      };

    case "doublevision":
      // faixas opacas alternadas com faixas translúcidas
      return {
        image: [
          "repeating-linear-gradient(180deg, rgba(0,0,0,.20) 0 5px, rgba(255,255,255,.34) 5px 10px)",
          "linear-gradient(180deg, rgba(255,255,255,.10), rgba(0,0,0,.12))",
        ].join(","),
      };

    case "romana":
      // dobras empilhadas: linha de luz no topo de cada gomo, sombra embaixo
      return {
        image: [
          "repeating-linear-gradient(180deg, rgba(255,255,255,.22) 0 1px, rgba(255,255,255,.05) 1px 4px, transparent 4px 13px, rgba(0,0,0,.16) 13px 15px)",
          "linear-gradient(180deg, rgba(255,255,255,.10), rgba(0,0,0,.14))",
        ].join(","),
      };

    case "translucida":
      return {
        image: [
          "repeating-linear-gradient(0deg, rgba(255,255,255,.10) 0 1px, transparent 1px 3px)",
          "linear-gradient(180deg, rgba(255,255,255,.34), rgba(255,255,255,.10) 55%, rgba(0,0,0,.08))",
        ].join(","),
      };

    case "madeira":
      // veio de madeira: estrias verticais irregulares + lâminas horizontais
      return {
        image: [
          "repeating-linear-gradient(180deg, rgba(0,0,0,.24) 0 1px, transparent 1px 12px)",
          "repeating-linear-gradient(90deg, rgba(0,0,0,.09) 0 2px, transparent 2px 5px, rgba(255,255,255,.07) 5px 7px, transparent 7px 11px)",
          "linear-gradient(180deg, rgba(255,255,255,.14), rgba(0,0,0,.18))",
        ].join(","),
      };

    case "aluminio":
      // lâminas metálicas com brilho especular em cada uma
      return {
        image: [
          "repeating-linear-gradient(180deg, rgba(255,255,255,.42) 0 1px, rgba(255,255,255,.14) 1px 3px, rgba(0,0,0,.06) 3px 8px, rgba(0,0,0,.26) 8px 9px)",
          "linear-gradient(100deg, rgba(255,255,255,.22), transparent 45%)",
        ].join(","),
      };

    case "tela":
      return {
        image: [
          "repeating-linear-gradient(0deg, rgba(0,0,0,.30) 0 1px, transparent 1px 4px)",
          "repeating-linear-gradient(90deg, rgba(0,0,0,.30) 0 1px, transparent 1px 4px)",
          "linear-gradient(180deg, rgba(255,255,255,.20), rgba(0,0,0,.06))",
        ].join(","),
      };
  }
}

/** Grão sutil por cima — é o que faz a amostra "virar" pano em vez de gradiente. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='80' height='80' filter='url(%23n)'/%3E%3C/svg%3E\")";

type Props = {
  hex: string;
  kind: FabricKind;
  className?: string;
  /** Mostra o tubo/roldana no topo, como numa peça montada. */
  withHeadrail?: boolean;
  title?: string;
};

export function FabricSwatch({ hex, kind, className = "", withHeadrail = false, title }: Props) {
  const layers = fabricLayers(kind);

  return (
    <span
      className={`relative block overflow-hidden ${className}`}
      style={{ backgroundColor: hex }}
      title={title}
      aria-hidden="true"
    >
      {/* trama */}
      <span
        className="absolute inset-0 block"
        style={{ backgroundImage: layers.image, backgroundSize: layers.size }}
      />
      {/* grão de tecido */}
      <span
        className="absolute inset-0 block opacity-[0.16] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN, backgroundSize: "80px 80px" }}
      />
      {/* profundidade: borda interna + leve vinheta nas laterais */}
      <span
        className="absolute inset-0 block"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,.30), inset 0 -1px 0 rgba(0,0,0,.22), inset 0 0 0 1px rgba(0,0,0,.10)",
        }}
      />
      {withHeadrail && (
        <span
          className="absolute inset-x-0 top-0 block h-[13%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.62) 45%, rgba(0,0,0,.14))",
            boxShadow: "0 1px 2px rgba(0,0,0,.22)",
          }}
        />
      )}
    </span>
  );
}
