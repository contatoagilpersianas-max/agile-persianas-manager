import { useEffect, useMemo, useRef, useState } from "react";
import {
  Camera,
  Upload,
  Sparkles,
  Loader2,
  Download,
  RotateCcw,
  Check,
  ShoppingBag,
  MessageCircle,
  Share2,
  Image as ImageIcon,
  Sun,
  Maximize2,
  ShieldCheck,
  Clock,
  Gift,
  ArrowLeftRight,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { simulateRoom } from "@/lib/simulate-room.functions";
import { paletteFor, type FabricColor } from "@/lib/fabric-palettes";
import { trackEvent } from "@/lib/analytics";
import { useSiteContact, whatsappLink } from "@/hooks/use-site-contact";
import {
  FabricSwatch,
  fabricKindFromName,
  fabricDescriptor,
  shortFabricName,
} from "@/components/site/FabricSwatch";

type ColorOpt = { color: string; hex: string; img: string; swatch?: string };
type Product = {
  id: string;
  name: string;
  description: string;
  prompt: string;
  thumbs: ColorOpt[];
  href: string;
  cover: string;
  category: string;
};
type CategoryOpt = { id: string; label: string; hint: string };

const FALLBACK_HEX: Record<string, string> = {
  branca: "#F5F1EA", branco: "#F5F1EA",
  bege: "#C9B89A", "bege rústico": "#B8A07A", "bege rustico": "#B8A07A",
  cinza: "#8A8A8A", preta: "#222222", preto: "#222222",
  marrom: "#6B4A2B", azul: "#3B5BA9", verde: "#4F7A4A",
};
function guessHex(name: string): string {
  const k = name.trim().toLowerCase();
  return FALLBACK_HEX[k] ?? "#B8B8B8";
}

/** Paleta neutra padrão usada quando o produto não tem cores curadas nem cadastradas. */
const DEFAULT_NEUTRAL_PALETTE: { name: string; hex: string }[] = [
  { name: "Branco", hex: "#F2F2EE" },
  { name: "Bege", hex: "#D9C7A9" },
  { name: "Cinza", hex: "#9B9C99" },
  { name: "Marrom", hex: "#7A6852" },
  { name: "Preto", hex: "#33373B" },
];

/** Ambientes de demonstração — para clientes que querem testar sem enviar foto própria. */
const DEMO_ROOMS: { label: string; url: string }[] = [
  { label: "Sala", url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1280&q=80" },
  { label: "Quarto", url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1280&q=80" },
  { label: "Escritório", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1280&q=80" },
];

function toTitle(s: string): string {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

async function downscaleImage(dataUrl: string, maxSide = 1280): Promise<string> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d");
      if (!ctx) return rej(new Error("canvas"));
      ctx.drawImage(img, 0, 0, w, h);
      res(c.toDataURL("image/jpeg", 0.88));
    };
    img.onerror = rej;
    img.src = dataUrl;
  });
}

function loadImage(src: string, crossOrigin?: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    if (crossOrigin) img.crossOrigin = crossOrigin;
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

/** Compositor client-side: desenha a persiana (foto real do produto) sobre a
 *  área típica de janela do ambiente e aplica tinta da cor escolhida.
 *  Não depende de IA externa — resultado instantâneo e previsível. */
async function composeSimulation(
  originalUrl: string,
  productCoverUrl: string,
  colorHex: string,
): Promise<string> {
  const base = await loadImage(originalUrl);
  let overlay: HTMLImageElement | null = null;
  try {
    overlay = await loadImage(productCoverUrl, "anonymous");
  } catch {
    try {
      overlay = await loadImage(productCoverUrl);
    } catch {
      overlay = null;
    }
  }

  const c = document.createElement("canvas");
  c.width = base.naturalWidth;
  c.height = base.naturalHeight;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("canvas context");
  ctx.drawImage(base, 0, 0, c.width, c.height);

  const x = c.width * 0.15;
  const y = 0;
  const w = c.width * 0.7;
  const h = c.height * 0.55;

  if (overlay) {
    try {
      ctx.save();
      ctx.globalAlpha = 0.92;
      ctx.drawImage(overlay, x, y, w, h);
      ctx.restore();
    } catch {
      // overlay tainted — pula textura, mantém tinta
    }
  }

  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.45;
  ctx.fillStyle = colorHex;
  ctx.fillRect(x, y, w, h);
  ctx.restore();

  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;

  // Borda superior sutil (varão)
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(x, y, w, Math.max(4, c.height * 0.012));
  ctx.restore();

  try {
    return c.toDataURL("image/jpeg", 0.88);
  } catch {
    // Canvas tainted pelo overlay cross-origin — repete sem o overlay
    const c2 = document.createElement("canvas");
    c2.width = c.width;
    c2.height = c.height;
    const ctx2 = c2.getContext("2d")!;
    ctx2.drawImage(base, 0, 0, c2.width, c2.height);
    ctx2.save();
    ctx2.globalCompositeOperation = "multiply";
    ctx2.globalAlpha = 0.5;
    ctx2.fillStyle = colorHex;
    ctx2.fillRect(x, y, w, h);
    ctx2.restore();
    return c2.toDataURL("image/jpeg", 0.88);
  }
}

export function RoomSimulator() {
  // SSR-safe: o simulador depende de catálogo dinâmico e usa <select> nativos
  // que extensões de browser (ex: "bb-custom-select") reescrevem antes do React
  // hidratar. Para evitar hydration mismatch, montamos os controles interativos
  // somente no cliente, após o primeiro paint.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <section id="simulador-ambiente" className="relative overflow-hidden py-16 md:py-24">
        <div className="container-premium">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
              Simulador IA
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl">Simule na sua janela</h2>
            <p className="mt-3 text-muted-foreground">Carregando simulador…</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="aspect-[4/3] rounded-3xl bg-muted/40 animate-pulse" />
            <div className="rounded-3xl bg-muted/40 animate-pulse h-[420px]" />
          </div>
        </div>
      </section>
    );
  }
  return <RoomSimulatorInner />;
}

function StepHeader({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-xs font-bold text-primary-foreground shadow-md">
        {n}
      </span>
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/80">{title}</span>
    </div>
  );
}

function RoomSimulatorInner() {
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const runSimulate = useServerFn(simulateRoom);
  const [original, setOriginal] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [compare, setCompare] = useState(50);

  const [catalog, setCatalog] = useState<{ categories: CategoryOpt[]; products: Product[] }>({
    categories: [],
    products: [],
  });
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [productId, setProductId] = useState<string>("");
  const [colorIdx, setColorIdx] = useState(0);
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [{ data: cats }, { data: prods }, { data: links }] = await Promise.all([
          supabase.from("categories").select("id, name, slug, parent_id, position, active").eq("active", true),
          supabase
            .from("products")
            .select("id, name, slug, short_description, description, cover_image, colors, category_id, active")
            .eq("active", true)
            .order("name", { ascending: true }),
          supabase.from("product_categories").select("product_id, category_id"),
        ]);
        if (cancelled) return;

        type CatRow = { id: string; name: string; slug: string; parent_id: string | null; position: number };
        const catById = new Map<string, CatRow>();
        (cats ?? []).forEach((c: any) => catById.set(c.id, c));
        const rootOf = (id: string | null | undefined): CatRow | null => {
          let cur = id ? catById.get(id) ?? null : null;
          while (cur && cur.parent_id) cur = catById.get(cur.parent_id) ?? null;
          return cur ?? null;
        };

        // product → categorias (direct + product_categories)
        const productCats = new Map<string, Set<string>>();
        const add = (pid: string, cid: string | null | undefined) => {
          if (!pid || !cid) return;
          if (!productCats.has(pid)) productCats.set(pid, new Set());
          productCats.get(pid)!.add(cid);
        };
        (prods ?? []).forEach((p: any) => add(p.id, p.category_id));
        (links ?? []).forEach((l: any) => add(l.product_id, l.category_id));

        // Agrupa produtos por categoria-folha (= modelo).
        // Ex.: "Rolô Blackout Tecido Liso", "Rolô Blackout Texturizado",
        // "Double Vision Translúcida"… Cada modelo vira UMA opção no
        // simulador, evitando duplicar entradas só por cor.
        const modelGroups = new Map<string, { cat: CatRow; covers: string[]; sample: any }>();
        for (const p of prods ?? []) {
          const cover = p.cover_image as string | null;
          if (!cover) continue;
          const catIds = Array.from(productCats.get(p.id) ?? []);
          for (const cid of catIds) {
            const cat = catById.get(cid);
            if (!cat) continue;
            // Ignora categorias "ambientes" (não são modelos de persiana).
            const root = rootOf(cat.id);
            if (root && root.slug === "ambientes") continue;
            const g = modelGroups.get(cat.id);
            if (g) {
              g.covers.push(cover);
            } else {
              modelGroups.set(cat.id, { cat, covers: [cover], sample: p });
            }
          }
        }

        const rootMap = new Map<string, CategoryOpt & { position: number }>();
        const products: Product[] = [];

        for (const { cat, covers, sample } of modelGroups.values()) {
          const root = rootOf(cat.id) ?? cat;
          // Quando a categoria-folha é também raiz (ex.: "Rolô Blackout
          // Tecido Liso" sem parent), agrupa sob ela mesma.
          if (!rootMap.has(root.id)) {
            rootMap.set(root.id, {
              id: root.id,
              label: toTitle(root.name),
              hint: "Sob medida · simulação realista",
              position: root.position,
            });
          }
          const cover = covers[0];
          const curated = paletteFor(cat.name, (sample?.short_description as string) ?? "");
          const colorsRaw: any[] = Array.isArray(sample?.colors) ? sample.colors : [];
          let thumbs: ColorOpt[] = curated
            ? curated.map((c: FabricColor) => ({ color: c.name, hex: c.hex, img: cover, swatch: c.swatch }))
            : colorsRaw
                .filter((c) => c && (c.name || c.color))
                .map((c: any) => ({
                  color: String(c.name ?? c.color),
                  hex: typeof c.hex === "string" && c.hex ? c.hex : guessHex(String(c.name ?? c.color)),
                  img: typeof c.img === "string" && c.img ? c.img : cover,
                }));
          if (thumbs.length === 0) {
            thumbs = DEFAULT_NEUTRAL_PALETTE.map((c) => ({ color: c.name, hex: c.hex, img: cover }));
          }
          products.push({
            id: cat.id,
            name: toTitle(cat.name),
            description: `Modelo ${toTitle(cat.name)} sob medida`,
            prompt: `${cat.name}, instalada no topo da janela, tecido com caimento natural`,
            href: `/catalogo?categoria=${cat.slug}`,
            cover,
            category: root.id,
            thumbs,
          });
        }

        products.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

        const categories = Array.from(rootMap.values())
          .sort((a, b) => a.position - b.position)
          .map(({ position: _p, ...rest }) => rest);

        setCatalog({ categories, products });
        setCategoryId(categories[0]?.id ?? "");
        const firstProd = products.find((p) => p.category === (categories[0]?.id ?? ""));
        setProductId(firstProd?.id ?? "");
        setColorIdx(0);
      } catch (e) {
        console.error("simulator catalog load", e);
      } finally {
        if (!cancelled) setCatalogLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const productsInCategory = useMemo(
    () => catalog.products.filter((p) => p.category === categoryId),
    [catalog.products, categoryId],
  );
  const product = useMemo(
    () => catalog.products.find((p) => p.id === productId) ?? productsInCategory[0],
    [catalog.products, productId, productsInCategory],
  );
  const color = product?.thumbs[Math.min(colorIdx, (product?.thumbs.length ?? 1) - 1)];
  const category = catalog.categories.find((c) => c.id === categoryId);
  // Trama do tecido selecionado — usada para desenhar as amostras de cor.
  const selectedKind = fabricKindFromName(product?.name ?? "", category?.label);

  // A simulação por IA é cara — só roda quando o cliente clica em "Simular".
  // Trocar de cor/produto após a primeira geração limpa o resultado para
  // sinalizar que é preciso clicar de novo.
  const firstRunRef = useRef(true);
  useEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }
    setResult(null);
  }, [productId, colorIdx, original]);

  // Pré-carrega ambiente de demonstração no mount — cliente já vê algo
  // assim que abre a página, como nos simuladores Bali Blinds / Graber.
  useEffect(() => {
    if (original) return;
    let cancelled = false;
    (async () => {
      try {
        const resp = await fetch(DEMO_ROOMS[0].url);
        const blob = await resp.blob();
        const raw = await fileToDataUrl(new File([blob], "demo.jpg", { type: blob.type || "image/jpeg" }));
        const small = await downscaleImage(raw, 1280);
        if (!cancelled) setOriginal(small);
      } catch {
        /* silencioso — usuário ainda pode enviar foto */
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleFile(f: File | null) {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Envie uma foto (JPG ou PNG).");
      return;
    }
    if (f.size > 12 * 1024 * 1024) {
      toast.error("Imagem muito grande (máx. 12MB).");
      return;
    }
    try {
      const raw = await fileToDataUrl(f);
      const small = await downscaleImage(raw, 1280);
      setOriginal(small);
      setResult(null);
    } catch {
      toast.error("Não consegui ler essa imagem.");
    }
  }

  async function useDemoRoom(url: string) {
    try {
      const resp = await fetch(url);
      const blob = await resp.blob();
      const raw = await fileToDataUrl(new File([blob], "demo.jpg", { type: blob.type || "image/jpeg" }));
      const small = await downscaleImage(raw, 1280);
      setOriginal(small);
      setResult(null);
    } catch {
      toast.error("Não consegui carregar o ambiente de demonstração.");
    }
  }

  async function generate() {
    if (!original) {
      toast.error("Envie a foto da sua janela primeiro.");
      return;
    }
    if (!product || !color) {
      toast.error("Escolha o produto e a cor.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const data = await runSimulate({
        data: {
          imageDataUrl: original,
          product: product.name,
          color: color.color,
          ambient: category?.label ?? "",
        },
      });
      if (data?.imageUrl) {
        setResult(data.imageUrl);
        setCompare(50);
        toast.success("Simulação pronta!");
      } else if (data?.error) {
        // Server function devolveu erro tratado (rate limit, sem créditos, etc).
        toast.error(data.error);
        // Fallback: compositor canvas para o cliente não ficar sem prévia.
        const url = await composeSimulation(original, product.cover, color.hex);
        setResult(url);
        setCompare(50);
      } else {
        throw new Error("Sem resposta da IA");
      }
    } catch (e) {
      console.error(e);
      try {
        const url = await composeSimulation(original, product.cover, color.hex);
        setResult(url);
        setCompare(50);
        toast.message("Mostrando prévia rápida (IA indisponível agora).");
      } catch {
        toast.error(e instanceof Error ? e.message : "Erro ao gerar simulação");
      }
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setOriginal(null);
    setResult(null);
  }

  function downloadResult() {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `agil-simulacao-${product?.id ?? "persiana"}.png`;
    a.click();
    trackEvent("simulator_download", { product: product?.name, color: color?.color });
  }

  const contact = useSiteContact();
  const whatsappText = `Olá! Acabei de simular a ${product?.name ?? "persiana"} (cor ${color?.color ?? ""}) no meu ambiente pelo site da Ágil Persianas e gostaria de um orçamento.`;
  const whatsappHref = whatsappLink(contact.whatsapp, whatsappText);

  async function shareResult() {
    if (!result) return;
    trackEvent("simulator_share", { product: product?.name, color: color?.color });
    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        // Tenta compartilhar como arquivo (mobile moderno).
        try {
          const blob = await (await fetch(result)).blob();
          const file = new File([blob], `agil-simulacao.jpg`, { type: blob.type || "image/jpeg" });
          const nav = navigator as Navigator & {
            canShare?: (data: { files: File[] }) => boolean;
            share?: (data: unknown) => Promise<void>;
          };
          if (nav.canShare && nav.canShare({ files: [file] })) {
            await (navigator as any).share({ files: [file], title: "Minha janela com a Ágil Persianas", text: whatsappText });
            return;
          }
        } catch {
          /* cai no fallback */
        }
        await (navigator as any).share({ title: "Ágil Persianas", text: whatsappText, url: window.location.href });
        return;
      }
    } catch {
      /* usuário cancelou ou browser não suporta */
    }
    // Fallback: WhatsApp
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  }

  // Slider before/after (drag)
  const compareRef = useRef<HTMLDivElement>(null);
  function onCompareMove(clientX: number) {
    const el = compareRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setCompare(Math.max(0, Math.min(100, pct)));
  }

  return (
    <section
      id="simulador-ambiente"
      className="relative overflow-hidden border-y border-border bg-gradient-to-b from-background via-muted/30 to-background py-14 sm:py-20"
    >
      {/* Ornamentos suaves — inspirado no visual dos referências (Bali, Novo) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4">
        {/* ============ HERO ============ */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Simulador com IA · Grátis · Sem login
          </div>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl md:text-6xl leading-[1.05] tracking-tight">
            Veja a persiana <em className="not-italic text-primary">na sua janela</em> antes de comprar.
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Envie uma foto do seu ambiente, escolha o modelo e a cor. Nossa IA instala a persiana
            na foto em segundos — fotorrealista, sem cadastro e sem compromisso.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5 text-[11px] font-semibold text-foreground/70">
              <Gift className="h-3.5 w-3.5 text-primary" /> 100% grátis
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5 text-[11px] font-semibold text-foreground/70">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Sua foto não é armazenada
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5 text-[11px] font-semibold text-foreground/70">
              <Clock className="h-3.5 w-3.5 text-primary" /> Resultado em segundos
            </span>
          </div>
        </div>

        {/* ============ COMO FUNCIONA — 3 PASSOS ============ */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-3">
          {[
            { n: 1, icon: Upload, title: "Envie sua foto", desc: "Ou escolha um ambiente de amostra." },
            { n: 2, icon: Sparkles, title: "Escolha modelo e cor", desc: "Rolô, Romana, Double Vision e mais." },
            { n: 3, icon: ImageIcon, title: "Veja instalada", desc: "Compare antes/depois, baixe e compartilhe." },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur transition hover:border-primary/40 hover:shadow-md">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-md">
                  <Icon className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-foreground text-[10px] font-bold text-background">
                    {s.n}
                  </span>
                </div>
                <div>
                  <div className="font-display text-base leading-tight">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============ PAINEL DO SIMULADOR ============ */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* COLUNA ESQUERDA — preview / before-after */}
          <div className="rounded-3xl border bg-card p-3 shadow-elegant sm:p-4 lg:sticky lg:top-24 lg:self-start">
            {!original && (
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-primary/30 bg-muted/40 p-6 text-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="font-display text-xl">Envie a foto do ambiente</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tire uma foto da janela bem iluminada, de frente, com a janela visível por completo.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => cameraRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
                  >
                    <Camera className="h-4 w-4" /> Usar câmera
                  </button>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-bold transition hover:border-primary"
                  >
                    <Upload className="h-4 w-4" /> Enviar foto
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground">JPG ou PNG · até 12MB · sua imagem não é armazenada</p>
                <div className="mt-2 flex w-full flex-col items-center gap-2 border-t border-border/60 pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Sem foto agora? Use um ambiente de demonstração
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {DEMO_ROOMS.map((d) => (
                      <button
                        key={d.label}
                        type="button"
                        onClick={() => useDemoRoom(d.url)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-[11px] font-semibold transition hover:border-primary hover:bg-primary/5"
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {original && !result && (
              <div className="relative overflow-hidden rounded-2xl">
                <img src={original} alt="Foto enviada do ambiente" className="block w-full" />
                <div className="pointer-events-none absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground shadow-sm backdrop-blur">
                  Sua janela
                </div>
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <div className="font-display text-lg">Instalando a persiana na sua janela…</div>
                    <div className="text-xs text-muted-foreground">Isso leva entre 15 e 40 segundos</div>
                  </div>
                )}
              </div>
            )}

            {original && result && (
              <div
                ref={compareRef}
                className="relative select-none overflow-hidden rounded-2xl"
                onMouseMove={(e) => e.buttons === 1 && onCompareMove(e.clientX)}
                onTouchMove={(e) => onCompareMove(e.touches[0].clientX)}
              >
                {/* base = resultado (depois) */}
                <img src={result} alt="Ambiente com a persiana instalada" className="block w-full" draggable={false} />
                {/* overlay = original (antes), recortado */}
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${compare}%` }}
                >
                  <img
                    src={original}
                    alt="Foto original antes da simulação"
                    className="block h-full w-auto max-w-none"
                    style={{ width: compareRef.current ? `${compareRef.current.clientWidth}px` : "100%" }}
                    draggable={false}
                  />
                </div>
                {/* labels */}
                <div className="pointer-events-none absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground shadow-sm backdrop-blur">
                  Antes
                </div>
                <div className="pointer-events-none absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-sm">
                  Depois
                </div>
                {/* handle */}
                <div
                  className="absolute inset-y-0 z-10 -translate-x-1/2 cursor-ew-resize"
                  style={{ left: `${compare}%` }}
                  onMouseDown={(e) => onCompareMove(e.clientX)}
                  onTouchStart={(e) => onCompareMove(e.touches[0].clientX)}
                >
                  <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
                  <div className="pointer-events-none absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-white">
                    <ArrowLeftRight className="h-4 w-4" />
                  </div>
                </div>
                {/* range invisível para acessibilidade / teclado */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={compare}
                  onChange={(e) => setCompare(Number(e.target.value))}
                  aria-label="Comparar antes e depois"
                  className="absolute inset-x-0 bottom-2 mx-auto w-2/3 opacity-0"
                />
              </div>
            )}

            {original && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium hover:border-primary"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Outra foto
                  </button>
                  <div className="hidden items-center gap-1 sm:flex">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Amostras:</span>
                    {DEMO_ROOMS.map((d) => (
                      <button
                        key={d.label}
                        type="button"
                        onClick={() => useDemoRoom(d.url)}
                        className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold transition hover:border-primary hover:bg-primary/5"
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
                {result && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={downloadResult}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium hover:border-primary"
                    >
                      <Download className="h-3.5 w-3.5" /> Baixar
                    </button>
                    <button
                      type="button"
                      onClick={shareResult}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium hover:border-primary"
                    >
                      <Share2 className="h-3.5 w-3.5" /> Compartilhar
                    </button>
                  </div>
                )}
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
          </div>

          {/* COLUNA DIREITA — controles */}
          <div className="rounded-3xl border bg-gradient-to-br from-card via-card to-muted/40 p-6 shadow-elegant ring-1 ring-primary/5">
            {/* Passo 1 — Categoria (chips) */}
            <div>
              <StepHeader n={1} title="Escolha o produto" />
              <div className="-mx-1 mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {catalogLoading && catalog.categories.length === 0 &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-muted" />
                  ))}
                {catalog.categories.map((c) => {
                  const active = categoryId === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategoryId(c.id)}
                      className={`shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition ${
                        active
                          ? "bg-primary text-primary-foreground shadow-glow"
                          : "border border-border bg-background text-foreground/70 hover:border-primary hover:text-foreground"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{category?.hint ?? (catalogLoading ? "Carregando catálogo…" : "Nenhum produto disponível")}</p>
            </div>

            {/* Passo 2 — Tecido / Acabamento */}
            <div className="mt-6">
              <StepHeader n={2} title="Tecido / Acabamento" />
              {/* Mostruário: cada linha é uma amostra do tecido desenhada em CSS
                  (ver FabricSwatch). Antes eram cards com foto de banco de
                  imagem que não carregava — sobrava alt-text no lugar da foto. */}
              <div className="mt-3 space-y-1.5">
                {catalogLoading && productsInCategory.length === 0 &&
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-[62px] animate-pulse rounded-xl bg-muted" />
                  ))}
                {!catalogLoading && productsInCategory.length === 0 && (
                  <p className="text-xs text-muted-foreground">Nenhum produto cadastrado nesta categoria.</p>
                )}
                {productsInCategory.map((p) => {
                  const active = productId === p.id;
                  const kind = fabricKindFromName(p.name, category?.label);
                  const swatchHex =
                    (active
                      ? p.thumbs[Math.min(colorIdx, p.thumbs.length - 1)]?.hex
                      : p.thumbs[0]?.hex) ?? "#D8D3CB";
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setProductId(p.id);
                        setColorIdx(0);
                      }}
                      aria-pressed={active}
                      className={`group relative flex w-full items-center gap-3.5 overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
                        active
                          ? "border-primary/40 bg-primary/[0.055] shadow-[0_1px_0_rgba(0,0,0,.02),0_8px_24px_-16px_rgba(0,0,0,.35)]"
                          : "border-border/70 bg-background/60 hover:border-primary/30 hover:bg-background"
                      }`}
                    >
                      {/* filete de acento no selecionado */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 left-0 w-[3px] bg-primary transition-transform duration-300 ${
                          active ? "scale-y-100" : "scale-y-0"
                        }`}
                      />
                      <FabricSwatch
                        hex={swatchHex}
                        kind={kind}
                        withHeadrail
                        className={`h-[46px] w-[34px] shrink-0 rounded-[4px] shadow-sm transition-transform duration-300 ${
                          active ? "scale-[1.06]" : "group-hover:scale-[1.03]"
                        }`}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-semibold leading-snug tracking-[-0.01em]">
                          {shortFabricName(p.name, category?.label)}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] leading-snug text-muted-foreground">
                          {fabricDescriptor(kind)}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/80 bg-transparent text-transparent group-hover:border-primary/40"
                        }`}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Passo 3 — Cor */}
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <StepHeader n={3} title="Cor do tecido" />
                {color && (
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Selecionado:{" "}
                    <span className="font-bold text-foreground">{color.color}</span>
                  </span>
                )}
              </div>
              {/* Amostras de cor com a trama do tecido selecionado, não bolinhas
                  chapadas: a mesma cor lê muito diferente em screen e em blackout. */}
              <div className="mt-3 grid grid-cols-5 gap-1.5 sm:gap-2">
                {product?.thumbs.map((t, i) => {
                  const active = colorIdx === i;
                  return (
                    <button
                      key={`${t.color}-${i}`}
                      type="button"
                      onClick={() => setColorIdx(i)}
                      title={t.color}
                      aria-pressed={active}
                      className="group flex flex-col items-center gap-1.5 rounded-lg p-1 transition"
                    >
                      <span
                        className={`relative block w-full overflow-hidden rounded-[4px] transition-all duration-300 ${
                          active
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                            : "ring-1 ring-black/10 group-hover:ring-primary/40"
                        }`}
                      >
                        <FabricSwatch
                          hex={t.hex}
                          kind={selectedKind}
                          className={`block h-[52px] w-full transition-transform duration-500 ${
                            active ? "scale-[1.04]" : "group-hover:scale-[1.02]"
                          }`}
                        />
                        {active && (
                          <span className="pointer-events-none absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                            <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                          </span>
                        )}
                      </span>
                      <span
                        className={`line-clamp-1 text-[10px] leading-tight transition-colors ${
                          active ? "font-bold text-foreground" : "font-medium text-muted-foreground"
                        }`}
                      >
                        {t.color}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">
                As amostras são uma representação da trama do tecido. Toque em uma cor — a persiana é repintada na sua janela em segundos.
              </p>
            </div>

            <button
              type="button"
              onClick={generate}
              disabled={loading || !original}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Gerando…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  {result ? "Gerar nova simulação" : "Simular na minha janela"}
                </>
              )}
            </button>

            {result && product && (
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <a
                  href={product.href}
                  onClick={() => trackEvent("simulator_view_product", { product: product.name })}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-background transition hover:opacity-90"
                >
                  <ShoppingBag className="h-3.5 w-3.5" /> Ver e comprar
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("simulator_whatsapp", { product: product.name, color: color?.color })}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition hover:border-primary"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Falar no WhatsApp
                </a>
              </div>
            )}

            <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
              A simulação é uma representação artística gerada por IA. Pequenas variações de tom, textura e caimento podem
              ocorrer no produto final. Sua foto é usada apenas para gerar a prévia e não é armazenada.
            </p>
          </div>
        </div>

        {/* ============ DICAS PARA UMA BOA FOTO — layout editorial ============ */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Coluna imagem — referência visual */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                  alt="Exemplo de foto ideal: janela enquadrada e luz natural"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10" />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground shadow-sm backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Exemplo ideal
                </div>
              </div>
            </div>

            {/* Coluna conteúdo */}
            <div className="lg:col-span-7 lg:pt-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
                Guia rápido — 3 passos
              </span>
              <h3 className="font-display mt-3 text-3xl leading-[1.05] sm:text-4xl lg:text-[2.75rem]">
                Fotos boas ficam
                <br />
                <span className="italic text-primary">ainda melhores.</span>
              </h3>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                A IA identifica a janela sozinha, mas seguir essas orientações eleva o realismo da simulação a um outro patamar.
              </p>

              <ol className="mt-8 divide-y divide-border/70 border-y border-border/70">
                {[
                  {
                    icon: Maximize2,
                    title: "Janela inteira no quadro",
                    desc: "Enquadre do topo do batente até abaixo do peitoril, sem cortar as bordas.",
                  },
                  {
                    icon: Sun,
                    title: "Luz natural do lado",
                    desc: "Evite contraluz direto. Prefira fotografar no início da manhã ou fim da tarde.",
                  },
                  {
                    icon: Camera,
                    title: "De frente, sem inclinar",
                    desc: "Fique perpendicular à parede para preservar as proporções do vão.",
                  },
                ].map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <li key={i} className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 py-5">
                      <span className="font-display text-2xl text-muted-foreground/60 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="font-display text-lg leading-tight">{t.title}</div>
                        <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                      </div>
                      <Icon className="mt-1 h-5 w-5 text-primary/80" />
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        {/* ============ CTA FINAL — split editorial ============ */}
        <div className="mx-auto mt-20 max-w-6xl overflow-hidden rounded-[4px] bg-foreground text-background shadow-elegant">
          <div className="grid lg:grid-cols-2">
            {/* Imagem */}
            <div className="relative min-h-[280px] lg:min-h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
                alt="Sala de estar com persianas Ágil instaladas"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-foreground/10 to-transparent lg:bg-gradient-to-l" />
              <div className="absolute bottom-5 left-5 rounded-full bg-background/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-foreground">
                Conferimos sua medida
              </div>
            </div>

            {/* Conteúdo */}
            <div className="relative flex flex-col justify-center gap-6 p-8 sm:p-12 lg:p-14">
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
                Próximo passo
              </span>
              <h3 className="font-display text-3xl leading-[1.05] sm:text-4xl lg:text-[2.5rem]">
                Gostou do que viu?
                <br />
                <span className="italic text-primary">Vamos medir juntos.</span>
              </h3>
              {/* Não prometer medição em domicílio nem instalação: a Ágil
                  fabrica e envia, o cliente instala. Também não citar cidade. */}
              <p className="max-w-md text-[15px] leading-relaxed text-background/75">
                A gente te ajuda a medir pelo WhatsApp — manda uma foto da janela com a fita esticada e nós conferimos antes de produzir. Envio para todo o Brasil.
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#orcamento"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-glow transition hover:-translate-y-0.5"
                >
                  Pedir orçamento gratuito
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-background/25 bg-transparent px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-background transition hover:bg-background hover:text-foreground"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-background/60">
                <span className="inline-flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" /> Sem compromisso</span>
                <span className="inline-flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" /> Resposta em 24h</span>
                <span className="inline-flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" /> Parcelamento 6×</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}