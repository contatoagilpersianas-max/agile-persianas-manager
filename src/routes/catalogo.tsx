import { createFileRoute, Link, useSearch, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { supabase } from "@/integrations/supabase/client";
import { Star, ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { formatBRL } from "@/lib/cart";

const PAGE_SIZE = 24;

const SORT_OPTIONS = [
  { value: "relevancia", label: "Relevância" },
  { value: "menor_preco", label: "Menor preço" },
  { value: "maior_preco", label: "Maior preço" },
  { value: "avaliacao", label: "Melhor avaliação" },
  { value: "mais_vendidos", label: "Mais vendidos" },
];

type Search = {
  categoria?: string;
  ambiente?: string;
  q?: string;
  bestseller?: string;
  page?: number;
  sort?: string;
  preco_min?: number;
  preco_max?: number;
};

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  price_per_sqm: number;
  product_type: string;
  rating: number;
  reviews_count: number;
  cover_image: string | null;
  badge: string | null;
  category_id: string | null;
  bestseller: boolean;
};

function parsePage(v: unknown): number | undefined {
  if (typeof v === "number") return Math.max(1, Math.floor(v));
  if (typeof v === "string") { const n = parseInt(v, 10); return isNaN(n) ? undefined : Math.max(1, n); }
  return undefined;
}

function parsePrice(v: unknown): number | undefined {
  if (typeof v === "number") return v > 0 ? v : undefined;
  if (typeof v === "string") { const n = parseFloat(v); return isNaN(n) || n <= 0 ? undefined : n; }
  return undefined;
}

function buildPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [];
  const addPage = (n: number) => { if (!pages.includes(n)) pages.push(n); };
  const addEllipsis = () => { if (pages[pages.length - 1] !== "...") pages.push("..."); };
  addPage(1);
  if (current > 3) addEllipsis();
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) addPage(i);
  if (current < total - 2) addEllipsis();
  addPage(total);
  return pages;
}

export const Route = createFileRoute("/catalogo")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    categoria: typeof s.categoria === "string" ? s.categoria : undefined,
    ambiente: typeof s.ambiente === "string" ? s.ambiente : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
    bestseller: typeof s.bestseller === "string" ? s.bestseller : undefined,
    page: parsePage(s.page),
    sort: typeof s.sort === "string" ? s.sort : undefined,
    preco_min: parsePrice(s.preco_min),
    preco_max: parsePrice(s.preco_max),
  }),
  head: () => ({
    meta: [
      { title: "Catálogo — Persianas e Cortinas | Ágil Persianas" },
      {
        name: "description",
        content:
          "Catálogo completo de persianas, cortinas e toldos sob medida. Filtre por categoria, preço e ambiente, com entrega para todo Brasil.",
      },
    ],
  }),
  component: CatalogoPage,
});

function CatalogoPage() {
  const search = useSearch({ from: "/catalogo" });
  const navigate = useNavigate();

  const filterSlug = search.categoria || search.ambiente;
  const onlyBestsellers = search.bestseller === "1";
  const page = search.page ?? 1;
  const sort = search.sort ?? "relevancia";
  const from = (page - 1) * PAGE_SIZE;
  const to = page * PAGE_SIZE - 1;

  const [precoMin, setPrecoMin] = useState(search.preco_min?.toString() ?? "");
  const [precoMax, setPrecoMax] = useState(search.preco_max?.toString() ?? "");
  const [showFilters, setShowFilters] = useState(!!(search.preco_min || search.preco_max));

  const { data: result, isLoading } = useQuery({
    queryKey: ["catalogo", filterSlug, search.q, onlyBestsellers, page, sort, search.preco_min, search.preco_max],
    queryFn: async () => {
      let categoryIds: string[] = [];
      if (filterSlug) {
        const { data: allCats } = await supabase
          .from("categories")
          .select("id,slug,parent_id")
          .eq("active", true);
        const list = allCats ?? [];
        const root = list.find((c) => c.slug === filterSlug);
        if (root) {
          const ids = new Set<string>([root.id]);
          let added = true;
          while (added) {
            added = false;
            for (const c of list) {
              if (c.parent_id && ids.has(c.parent_id) && !ids.has(c.id)) { ids.add(c.id); added = true; }
            }
          }
          categoryIds = Array.from(ids);
        }
      }

      let q = supabase
        .from("products")
        .select(
          "id,name,slug,price,sale_price,price_per_sqm,product_type,rating,reviews_count,cover_image,badge,category_id,bestseller",
          { count: "exact" },
        )
        .eq("active", true);

      if (categoryIds.length > 0) q = q.in("category_id", categoryIds);
      if (search.q) q = q.ilike("name", `%${search.q}%`);
      if (onlyBestsellers) q = q.eq("bestseller", true);
      if (search.preco_min) q = q.gte("price", search.preco_min);
      if (search.preco_max) q = q.lte("price", search.preco_max);

      if (sort === "menor_preco") q = q.order("price", { ascending: true });
      else if (sort === "maior_preco") q = q.order("price", { ascending: false });
      else if (sort === "avaliacao") q = q.order("rating", { ascending: false });
      else if (sort === "mais_vendidos") {
        q = q.order("bestseller", { ascending: false });
        q = q.order("reviews_count", { ascending: false });
      } else {
        q = q.order("position", { ascending: true });
        q = q.order("bestseller", { ascending: false });
        q = q.order("featured", { ascending: false });
      }

      const { data, count, error } = await q.range(from, to);
      if (error) throw error;
      return { products: (data ?? []) as ProductRow[], total: count ?? 0 };
    },
    staleTime: 0,
    refetchOnMount: "always",
  });

  const products = result?.products ?? [];
  const total = result?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const hasActiveFilters = !!(search.preco_min || search.preco_max);

  const { data: catName } = useQuery({
    queryKey: ["cat-name", filterSlug],
    enabled: !!filterSlug,
    queryFn: async () => {
      const { data } = await supabase
        .from("categories")
        .select("name")
        .eq("slug", filterSlug as string)
        .maybeSingle();
      return data?.name ?? "";
    },
  });

  const { data: rootCats = [] } = useQuery({
    queryKey: ["catalogo-root-cats"],
    queryFn: async () => {
      const { data } = await supabase
        .from("categories")
        .select("id,name,slug,parent_id,position")
        .eq("active", true)
        .is("parent_id", null)
        .order("position", { ascending: true });
      return (data ?? []) as { id: string; name: string; slug: string }[];
    },
    staleTime: 5 * 60_000,
  });

  const title = onlyBestsellers ? "Mais vendidos" : catName ? catName : "Todos os produtos";

  function applyFilters() {
    const min = precoMin ? parseFloat(precoMin) : undefined;
    const max = precoMax ? parseFloat(precoMax) : undefined;
    navigate({
      to: "/catalogo",
      search: {
        ...search,
        page: undefined,
        preco_min: min && !isNaN(min) ? min : undefined,
        preco_max: max && !isNaN(max) ? max : undefined,
      },
    });
  }

  function clearFilters() {
    setPrecoMin("");
    setPrecoMax("");
    navigate({
      to: "/catalogo",
      search: { ...search, page: undefined, preco_min: undefined, preco_max: undefined },
    });
  }

  function goToPage(p: number) {
    navigate({
      to: "/catalogo",
      search: { ...search, page: p <= 1 ? undefined : p },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const pageNumbers = buildPageNumbers(page, totalPages);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container-premium py-10 md:py-14">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Catálogo</p>
            <h1 className="mt-2 font-display text-3xl md:text-5xl">{title}</h1>
            <p className="mt-2 text-muted-foreground">
              {isLoading
                ? "Carregando..."
                : `${total} ${total === 1 ? "produto" : "produtos"} encontrados${totalPages > 1 ? ` · página ${page} de ${totalPages}` : ""}`}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 pt-1">
            <label className="hidden text-xs text-muted-foreground sm:block">Ordenar:</label>
            <select
              value={sort}
              onChange={(e) =>
                navigate({ to: "/catalogo", search: { ...search, sort: e.target.value, page: undefined } })
              }
              className="h-9 rounded-md border border-border bg-card px-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-xs font-medium transition ${
                hasActiveFilters || showFilters
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filtros{hasActiveFilters ? ` (${[search.preco_min, search.preco_max].filter(Boolean).length})` : ""}
            </button>
          </div>
        </div>

        {/* Category chips */}
        <div className="mb-6 -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <div className="flex min-w-max items-center gap-2">
            <Link
              to="/catalogo"
              className={`inline-flex h-9 items-center rounded-full border px-4 text-xs font-semibold transition ${
                !filterSlug && !onlyBestsellers
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/40 hover:text-primary"
              }`}
            >
              Todos
            </Link>
            <Link
              to="/catalogo"
              search={(prev: Record<string, unknown>) => ({ ...prev, bestseller: "1", categoria: undefined, ambiente: undefined, page: undefined })}
              className={`inline-flex h-9 items-center rounded-full border px-4 text-xs font-semibold transition ${
                onlyBestsellers
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/40 hover:text-primary"
              }`}
            >
              Mais vendidos
            </Link>
            {rootCats.map((c) => {
              const active = filterSlug === c.slug;
              return (
                <Link
                  key={c.id}
                  to="/catalogo"
                  search={(prev: Record<string, unknown>) => ({ ...prev, categoria: c.slug, bestseller: undefined, ambiente: undefined, page: undefined })}
                  className={`inline-flex h-9 items-center rounded-full border px-4 text-xs font-semibold whitespace-nowrap transition ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {c.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Advanced filters panel */}
        {showFilters && (
          <div className="mb-6 rounded-xl border border-border bg-card p-4">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-muted-foreground">Preço mínimo</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">R$</span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    placeholder="0"
                    value={precoMin}
                    onChange={(e) => setPrecoMin(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                    className="h-9 w-32 rounded-md border border-border bg-background pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-muted-foreground">Preço máximo</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">R$</span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    placeholder="sem limite"
                    value={precoMax}
                    onChange={(e) => setPrecoMax(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                    className="h-9 w-36 rounded-md border border-border bg-background pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={applyFilters}
                  className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Aplicar
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex h-9 items-center gap-1 rounded-md border border-border px-3 text-xs font-medium hover:border-destructive hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                    Limpar
                  </button>
                )}
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-3 flex flex-wrap gap-2">
                {search.preco_min && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    A partir de {formatBRL(search.preco_min)}
                    <button onClick={() => { setPrecoMin(""); navigate({ to: "/catalogo", search: { ...search, preco_min: undefined, page: undefined } }); }}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {search.preco_max && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Até {formatBRL(search.preco_max)}
                    <button onClick={() => { setPrecoMax(""); navigate({ to: "/catalogo", search: { ...search, preco_max: undefined, page: undefined } }); }}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Product grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-md bg-muted animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border bg-card p-12 text-center">
            <p className="font-medium">Nenhum produto encontrado</p>
            <p className="text-sm text-muted-foreground mt-1">
              {hasActiveFilters
                ? "Tente ajustar os filtros de preço."
                : "Tente outra categoria ou volte ao catálogo completo."}
            </p>
            {hasActiveFilters ? (
              <button
                onClick={clearFilters}
                className="inline-flex mt-4 items-center justify-center rounded-full border border-border px-5 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
              >
                Limpar filtros
              </button>
            ) : (
              <Link
                to="/catalogo"
                className="inline-flex mt-4 items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                Ver todos os produtos
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10">
              {products.map((p) => (
                <CatalogCard key={p.id} p={p} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-sm transition hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
                    aria-label="Página anterior"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {pageNumbers.map((n, i) =>
                    n === "..." ? (
                      <span key={`ellipsis-${i}`} className="inline-flex h-9 w-9 items-center justify-center text-xs text-muted-foreground">
                        …
                      </span>
                    ) : (
                      <button
                        key={n}
                        onClick={() => goToPage(n as number)}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition ${
                          n === page
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary hover:text-primary"
                        }`}
                      >
                        {n}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-sm transition hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
                    aria-label="Próxima página"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Página {page} de {totalPages} · {total} produtos
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

function CatalogCard({ p }: { p: ProductRow }) {
  const isM2 = p.product_type === "metro_quadrado";
  const finalPrice =
    isM2
      ? p.price_per_sqm
      : p.sale_price && p.sale_price > 0
        ? p.sale_price
        : p.price;
  const showFrom = isM2 || (p.sale_price && p.sale_price > 0 && p.sale_price < p.price);
  const fullPrice = isM2 ? null : p.price;

  return (
    <Link to="/produto/$slug" params={{ slug: p.slug }} className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-secondary">
        {p.cover_image && (
          <img
            src={p.cover_image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        {p.badge && (
          <span className="absolute left-3 top-3 inline-flex items-center justify-center rounded-md bg-primary px-2.5 py-1 text-[11px] font-bold text-white">
            {p.badge}
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-col text-left">
        <h3 className="line-clamp-2 text-[13px] font-medium text-foreground transition group-hover:text-primary">
          {p.name}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="font-medium text-foreground/80">{p.rating.toFixed(1)}</span>
          <span>({p.reviews_count})</span>
        </div>
        <div className="mt-2 flex flex-col">
          {showFrom && fullPrice && fullPrice > finalPrice && (
            <span className="text-[11px] text-muted-foreground line-through">
              de {formatBRL(fullPrice)}
            </span>
          )}
          <span className="font-display text-xl font-bold text-foreground">
            {isM2 ? `a partir de ${formatBRL(finalPrice)}/m²` : formatBRL(finalPrice)}
          </span>
          <span className="text-[11px] text-muted-foreground mt-0.5">
            ou em até 6× sem juros
          </span>
        </div>
      </div>
    </Link>
  );
}
