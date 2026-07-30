import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export type GalleryImage = string | { url: string; caption?: string; color?: string };

function normalize(images: GalleryImage[]): { url: string; caption?: string; color?: string }[] {
  return images.map((i) =>
    typeof i === "string" ? { url: i } : { url: i.url, caption: i.caption, color: i.color },
  );
}

export function ProductGallery({
  images,
  alt,
  badge,
  activeColor,
}: {
  images: GalleryImage[];
  alt: string;
  badge?: string | null;
  /** Quando muda, troca a imagem principal para a 1ª que tenha esta cor. */
  activeColor?: string | null;
}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [magnify, setMagnify] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });
  const stageRef = useRef<HTMLDivElement>(null);
  const list = normalize(images);
  const safe = list.length ? list : [{ url: "/placeholder.svg" }];
  const current = safe[active];

  function handleStageMove(e: React.MouseEvent) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) });
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!zoomed) return;
      if (e.key === "Escape") setZoomed(false);
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % safe.length);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + safe.length) % safe.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomed, safe.length]);

  useEffect(() => {
    if (!activeColor) return;
    const idx = safe.findIndex(
      (img) => img.color && img.color.toLowerCase() === activeColor.toLowerCase(),
    );
    if (idx >= 0) setActive(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeColor]);

  return (
    <div className="space-y-4">
      {/* Layout estilo Blinds.com — thumbs verticais à esquerda + imagem grande */}
      <div className="flex gap-3 md:gap-4">
        {/* Thumbs verticais (desktop apenas) */}
        {safe.length > 1 && (
          <div className="hidden lg:flex flex-col gap-3 w-[92px] flex-shrink-0">
            {safe.slice(0, 6).map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`group relative aspect-square w-full overflow-hidden rounded-2xl border transition-all duration-300 ease-premium ${
                  i === active
                    ? "border-primary shadow-glow ring-2 ring-primary/10"
                    : "border-border/70 opacity-80 hover:opacity-100 hover:-translate-y-0.5 hover:border-foreground/20"
                }`}
                title={img.caption}
                aria-label={`Imagem ${i + 1}`}
                aria-pressed={i === active}
              >
                <img
                  src={img.url}
                  alt={img.caption || ""}
                  className="h-full w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-[1.06]"
                />
                <span
                  className={`pointer-events-none absolute inset-x-2 bottom-2 h-0.5 rounded-full transition-all duration-300 ${
                    i === active ? "bg-primary opacity-100" : "bg-card/80 opacity-0 group-hover:opacity-100"
                  }`}
                />
              </button>
            ))}
            {safe.length > 6 && (
              <div className="text-[10px] text-muted-foreground text-center font-medium">
                +{safe.length - 6}
              </div>
            )}
          </div>
        )}

        {/* Imagem principal */}
        <div className="relative flex-1 overflow-hidden rounded-[24px] md:rounded-[28px] bg-sand shadow-card ring-1 ring-black/5">
          {badge && (
            <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground uppercase text-[10px] tracking-widest px-3 py-1.5">
              {badge}
            </Badge>
          )}
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card/95 backdrop-blur shadow-md transition-transform duration-300 ease-premium hover:scale-105"
            aria-label="Ampliar"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <div
            ref={stageRef}
            className="group relative aspect-[10/12] sm:aspect-[5/6] lg:aspect-[4/5] w-full overflow-hidden lg:cursor-zoom-in"
            onMouseEnter={() => setMagnify(true)}
            onMouseLeave={() => setMagnify(false)}
            onMouseMove={handleStageMove}
          >
            <img
              key={current.url}
              src={current.url}
              alt={current.caption || alt}
              className="h-full w-full object-cover object-center animate-fade-up transition-transform duration-700 ease-premium group-hover:scale-[1.05]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
            {/* Lupa — amplia a imagem seguindo o cursor (só desktop, padrão de e-commerce premium) */}
            <div
              className="pointer-events-none absolute inset-0 hidden bg-no-repeat transition-opacity duration-200 lg:block"
              style={{
                opacity: magnify ? 1 : 0,
                backgroundImage: `url(${current.url})`,
                backgroundSize: "220%",
                backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
              }}
            />
          </div>
          {current.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-sm px-5 py-3">
              {current.caption}
            </div>
          )}
          {safe.length > 1 && (
            <>
              <button
                onClick={() => setActive((a) => (a - 1 + safe.length) % safe.length)}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/95 shadow transition-transform duration-300 ease-premium hover:scale-105"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActive((a) => (a + 1) % safe.length)}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/95 shadow transition-transform duration-300 ease-premium hover:scale-105"
                aria-label="Próxima"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbs horizontais (mobile/tablet) */}
      {safe.length > 1 && (
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1 lg:hidden">
          {safe.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`group relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition-all duration-300 ease-premium ${
                i === active
                  ? "border-primary shadow-glow ring-2 ring-primary/10"
                  : "border-border/70 opacity-80 hover:-translate-y-0.5 hover:opacity-100"
              }`}
              title={img.caption}
              aria-label={`Miniatura ${i + 1}`}
              aria-pressed={i === active}
            >
              <img
                src={img.url}
                alt={img.caption || ""}
                className="h-full w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-[1.06]"
              />
              <span
                className={`pointer-events-none absolute inset-x-3 bottom-2 h-0.5 rounded-full transition-all duration-300 ${
                  i === active ? "bg-primary opacity-100" : "bg-card/80 opacity-0 group-hover:opacity-100"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out animate-fade-up"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
            }}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
          {safe.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:top-6 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              {active + 1} / {safe.length}
            </div>
          )}
          <img
            src={current.url}
            alt={current.caption || alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-full rounded-lg cursor-default shadow-2xl"
          />
          {safe.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((a) => (a - 1 + safe.length) % safe.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 sm:left-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((a) => (a + 1) % safe.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 sm:right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                aria-label="Próxima"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
