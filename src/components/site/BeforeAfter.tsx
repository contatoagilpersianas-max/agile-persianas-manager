// Seção "Compare de perto" — comparador interativo (slider) com fotos reais
// do mostruário da Ágil, comparando dois acabamentos reais lado a lado
// (nunca "antes/depois de instalação", já que a Ágil não presta esse serviço).
import { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { useSiteSetting } from "@/hooks/use-site-setting";
import { BEFORE_AFTER_DEFAULTS, type BeforeAfterConfig } from "@/components/admin/site/BeforeAfterModule";

type Pair = { before: string; after: string; title: string; desc: string; beforeLabel: string; afterLabel: string };

const FALLBACK_PAIRS: Pair[] = [
  {
    before: "/showroom/rolo-blackout-branca-mostruario.jpg",
    after: "/showroom/rolo-blackout-cinza-mostruario-2.jpg",
    title: "Rolô Blackout",
    desc: "Fotos reais do nosso mostruário: acabamento Liso Branco e acabamento Texturizado, os dois com bloqueio total de luz.",
    beforeLabel: "Liso",
    afterLabel: "Texturizado",
  },
  {
    before: "/showroom/double-vision-listrado-showroom.jpg",
    after: "/showroom/double-vision-zebrado-showroom.jpg",
    title: "Double Vision",
    desc: "Fotos reais da nossa loja: faixas em listras finas e faixas zebradas — arraste para comparar o efeito de cada trama.",
    beforeLabel: "Listrado",
    afterLabel: "Zebrado",
  },
];

function CompareSlider({ pair }: { pair: Pair }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  // Listeners globais para arraste fluido (continua mesmo se cursor sair do figure)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      move(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
      document.body.style.userSelect = "";
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current) return;
      move(e.touches[0].clientX);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [move]);

  const startDrag = (clientX: number) => {
    draggingRef.current = true;
    document.body.style.userSelect = "none";
    move(clientX);
  };

  return (
    <figure
      ref={ref}
      className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card cursor-ew-resize select-none group"
      onMouseDown={(e) => {
        e.preventDefault();
        startDrag(e.clientX);
      }}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
    >
      {/* Segunda foto (fundo) */}
      <img
        src={pair.after}
        alt={`${pair.title} — ${pair.afterLabel}`}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />
      {/* Primeira foto (clipada) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${pos}%` }}
      >
        <img
          src={pair.before}
          alt={`${pair.title} — ${pair.beforeLabel}`}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${(100 / Math.max(pos, 0.001)) * 100}%`, maxWidth: "none" }}
        />
      </div>

      {/* Labels — sempre visíveis, alto contraste */}
      <span className="absolute left-4 top-4 z-10 rounded-full bg-black/75 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-lg pointer-events-none">
        {pair.beforeLabel}
      </span>
      <span className="absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-lg pointer-events-none">
        {pair.afterLabel}
      </span>

      {/* Linha + handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
        style={{ left: `${pos}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 rounded-full bg-white shadow-2xl flex items-center justify-center pointer-events-none ring-2 ring-primary"
        style={{ left: `${pos}%` }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
        </svg>
      </div>

      {/* Caption flutuante — muda conforme o slider */}
      <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-5 pointer-events-none">
        <div className="font-display text-lg text-white" style={{ fontWeight: 500 }}>
          {pair.title}
        </div>
        <div className="mt-1 text-xs text-white/85 transition-opacity duration-300">
          {pos > 50 ? pair.beforeLabel : pair.afterLabel}
          {" — "}
          {pair.desc}
        </div>
      </figcaption>
    </figure>
  );
}

export function BeforeAfter() {
  const { value: cfg } = useSiteSetting<BeforeAfterConfig>("before_after", BEFORE_AFTER_DEFAULTS);
  if (!cfg.enabled) return null;
  const rawPairs = cfg.pairs?.length ? cfg.pairs : FALLBACK_PAIRS;
  const pairs: Pair[] = rawPairs.map((p, i) => {
    const fallback = FALLBACK_PAIRS[i % FALLBACK_PAIRS.length];
    return {
      title: p.title || fallback.title,
      desc: p.desc || fallback.desc,
      before: p.before || fallback.before,
      after: p.after || fallback.after,
      beforeLabel: fallback.beforeLabel,
      afterLabel: fallback.afterLabel,
    };
  });
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container-premium">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {cfg.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl" style={{ fontWeight: 500 }}>
            {cfg.title}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {cfg.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pairs.map((p) => (
            <CompareSlider key={p.title} pair={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
