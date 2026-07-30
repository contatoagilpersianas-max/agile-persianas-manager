import { Star, Quote } from "lucide-react";
import { useSiteSetting } from "@/hooks/use-site-setting";
import { TESTIMONIALS_DEFAULTS, type TestimonialsConfig } from "@/components/admin/site/TestimonialsModule";

// ⚠️ Esta seção só renderiza depoimentos REAIS, cadastrados no painel admin.
// Não existe mais fallback de exemplo: antes havia 3 depoimentos fictícios
// ("Marina Lopes", "Rafael Andrade", "Juliana Castro") com rostos de banco de
// imagem, que apareciam como se fossem clientes de verdade — isso é propaganda
// enganosa (CDC art. 37). Se não houver depoimento real cadastrado, a seção
// simplesmente não aparece. NÃO reintroduza dados de exemplo aqui.

export function Testimonials() {
  const { value: cfg } = useSiteSetting<TestimonialsConfig>("testimonials", TESTIMONIALS_DEFAULTS);
  if (!cfg.enabled) return null;
  const items = (cfg.items ?? []).filter((it) => it.name?.trim() && it.text?.trim());
  if (items.length === 0) return null;
  return (
    <section className="bg-sand py-12 md:py-16">
      <div className="container-premium">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {cfg.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            {cfg.title}
          </h2>
          {/* Só mostra resumo de nota se houver um valor real configurado —
              nunca exibir estrelas/contagem inventadas. */}
          {cfg.ratingSummary?.trim() && (
            <div className="mt-3 inline-flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-sm font-semibold">
                {cfg.ratingSummary}
              </span>
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, idx) => (
            <figure
              key={`${it.name}-${idx}`}
              className="relative rounded-2xl bg-card p-7 shadow-card"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/15" />
              <div className="flex gap-1">
                {[...Array(it.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <blockquote className="mt-4 leading-relaxed text-foreground/90">
                "{it.text}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                {/* Sem foto real cadastrada, mostra a inicial do nome —
                    nunca um rosto de banco de imagem fingindo ser o cliente. */}
                {it.photo ? (
                  <img
                    src={it.photo}
                    alt={it.name}
                    loading="lazy"
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary ring-2 ring-primary/20"
                  >
                    {it.name.trim().charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="font-semibold">{it.name}</div>
                  <div className="text-sm text-muted-foreground">{it.city}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
