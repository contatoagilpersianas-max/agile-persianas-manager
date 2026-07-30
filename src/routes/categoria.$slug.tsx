import { createFileRoute, Link, useParams, useSearch, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Star, ChevronRight, ChevronLeft, SlidersHorizontal, X } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { supabase } from "@/integrations/supabase/client";
import { formatBRL } from "@/lib/cart";

const PAGE_SIZE = 24;
const SITE = "https://agil2.lovable.app";
const DEFAULT_OG =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5171a845-35f3-4188-8ac2-9a322b547a7d/id-preview-6ba4c76c--e82f979a-13e1-4ed4-b867-203a2377e8d5.lovable.app-1776846844365.png";

const SORT_OPTIONS = [
  { value: "relevancia", label: "Relevância" },
  { value: "menor_preco", label: "Menor preço" },
  { value: "maior_preco", label: "Maior preço" },
  { value: "avaliacao", label: "Melhor avaliação" },
  { value: "mais_vendidos", label: "Mais vendidos" },
];

type Search = {
  page?: number;
  sort?: string;
  preco_min?: number;
  preco_max?: number;
};

type Cat = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  position: number;
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
};

function parsePage(v: unknown): number | undefined {
  if (typeof v === "number") return Math.max(1, Math.floor(v));
  if (typeof v === "string") {
    const n = parseInt(v, 10);
    return isNaN(n) ? undefined : Math.max(1, n);
  }
  return undefined;
}

function parsePrice(v: unknown): number | undefined {
  if (typeof v === "number") return v > 0 ? v : undefined;
  if (typeof v === "string") {
    const n = parseFloat(v);
    return isNaN(n) || n <= 0 ? undefined : n;
  }
  return undefined;
}

function collectDescendants(catId: string, allCats: { id: string; parent_id: string | null }[]): string[] {
  const ids = new Set<string>([catId]);
  let added = true;
  while (added) {
    added = false;
    for (const c of allCats) {
      if (c.parent_id && ids.has(c.parent_id) && !ids.has(c.id)) {
        ids.add(c.id);
        added = true;
      }
    }
  }
  return Array.from(ids);
}

export const Route = createFileRoute("/categoria/$slug")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    page: parsePage(s.page),
    sort: typeof s.sort === "string" ? s.sort : undefined,
    preco_min: parsePrice(s.preco_min),
    preco_max: parsePrice(s.preco_max),
  }),

  loader: async ({ params }) => {
    try {
      const [{ data: cat }, { data: allCats }] = await Promise.all([
        supabase
          .from("categories")
          .select("id,name,slug,parent_id")
          .eq("slug", params.slug)
          .eq("active", true)
          .maybeSingle(),
        supabase.from("categories").select("id,parent_id").eq("active", true),
      ]);

      let ogImage = DEFAULT_OG;
      if (cat) {
        const ids = collectDescendants(cat.id, allCats ?? []);
        const { data: firstProduct } = await supabase
          .from("products")
          .select("cover_image")
          .eq("active", true)
          .in("category_id", ids)
          .not("cover_image", "is", null)
          .limit(1)
          .maybeSingle();
        if (firstProduct?.cover_image) ogImage = firstProduct.cover_image;
      }

      return { cat: cat ?? null, ogImage };
    } catch {
      return { cat: null, ogImage: DEFAULT_OG };
    }
  },

  head: ({ loaderData, params }) => {
    const cat = loaderData?.cat;
    const catName = cat?.name ?? params.slug.replace(/-/g, " ");
    const description = `Compre ${catName} sob medida com entrega para todo o Brasil. Qualidade, garantia e preço justo na Ágil Persianas.`;
    const url = `${SITE}/categoria/${params.slug}`;
    const ogImage = loaderData?.ogImage ?? DEFAULT_OG;

    return {
      meta: [
        { title: `${catName} — Persianas Sob Medida | Ágil Persianas` },
        { name: "description", content: description },
        { property: "og:title", content: `${catName} — Ágil Persianas` },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:locale", content: "pt_BR" },
        { property: "og:site_name", content: "Ágil Persianas" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${catName} — Ágil Persianas` },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
        { name: "robots", content: "index, follow" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Início", item: SITE },
              { "@type": "ListItem", position: 2, name: "Catálogo", item: `${SITE}/catalogo` },
              { "@type": "ListItem", position: 3, name: catName, item: url },
            ],
          }),
        },
      ],
    };
  },

  component: CategoriaPage,
});

function CategoriaPage() {
  const { slug } = useParams({ from: "/categoria/$slug" });
  const search = useSearch({ from: "/categoria/$slug" });
  const navigate = useNavigate();

  const page = search.page ?? 1;
  const sort = search.sort ?? "relevancia";
  const from = (page - 1) * PAGE_SIZE;
  const to = page * PAGE_SIZE - 1;

  const [precoMin, setPrecoMin] = useState(search.preco_min?.toString() ?? "");
  const [precoMax, setPrecoMax] = useState(search.preco_max?.toString() ?? "");
  const [showFilters, setShowFilters] = useState(!!(search.preco_min || search.preco_max));

  const { data: cats = [] } = useQuery({
    queryKey: ["all-cats"],
    queryFn: async () => {
      const { data } = await supabase
        .from("categories")
        .select("id,name,slug,parent_id,position,active,show_in_menu")
        .eq("active", true)
        .order("position");
      return (data ?? []) as Cat[];
    },
    staleTime: 60_000,
  });

  const current = cats.find((c) => c.slug === slug) ?? null;
  const parent = current?.parent_id ? (cats.find((c) => c.id === current.parent_id) ?? null) : null;
  const children = current ? cats.filter((c) => c.parent_id === current.id) : [];
  const siblings = parent ? cats.filter((c) => c.parent_id === parent.id) : [];
  const descendantIds = current ? collectDescendants(current.id, cats) : [];

  const { data: result, isLoading } = useQuery({
    queryKey: ["cat-products", slug, descendantIds.join(","), page, sort, search.preco_min, search.preco_max],
    enabled: descendantIds.length > 0,
    queryFn: async () => {
      let q = supabase
        .from("products")
        .select(
          "id,name,slug,price,sale_price,price_per_sqm,product_type,rating,reviews_count,cover_image,badge,category_id",
          { count: "exact" },
        )
        .eq("active", true)
        .in("category_id", descendantIds);

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
      }

      const { data, count, error } = await q.range(from, to);
      if (error) throw error;
      return { products: (data ?? []) as ProductRow[], total: count ?? 0 };
    },
    staleTime: 0,
  });

  const products = result?.products ?? [];
  const total = result?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const hasActiveFilters = !!(search.preco_min || search.preco_max);

  function applyFilters() {
    const min = precoMin ? parseFloat(precoMin) : undefined;
    const max = precoMax ? parseFloat(precoMax) : undefined;
    navigate({
      to: "/categoria/$slug",
      params: { slug },
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
      to: "/categoria/$slug",
      params: { slug },
      search: { ...search, page: undefined, preco_min: undefined, preco_max: undefined },
    });
  }

  function goToPage(p: number) {
    navigate({
      to: "/categoria/$slug",
      params: { slug },
      search: { ...search, page: p <= 1 ? undefined : p },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (cats.length > 0 && !current) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container-premium py-20 text-center">
          <h1 className="font-display text-3xl">Categoria não encontrada</h1>
          <Link
            to="/catalogo"
            className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
          >
            Ver catálogo completo
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const pageNumbers = buildPageNumbers(page, totalPages);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container-premium py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Início</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/catalogo" className="hover:text-primary">Catálogo</Link>
          {parent && (
            <>
              <ChevronRight className="h-3 w-3" />
              <Link to="/categoria/$slug" params={{ slug: parent.slug }} className="hover:text-primary">
                {parent.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{current?.name}</span>
        </nav>

        {/* Header + controls */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Categoria</p>
            <h1 className="mt-2 font-display text-3xl md:text-5xl">{current?.name}</h1>
            <p className="mt-2 text-muted-foreground">
              {isLoading
                ? "Carregando..."
                : `${total} ${total === 1 ? "produto" : "produtos"}${totalPages > 1 ? ` · página ${page} de ${totalPages}` : ""}`}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 pt-1">
            <label className="hidden text-xs text-muted-foreground sm:block">Ordenar:</label>
            <select
              value={sort}
              onChange={(e) =>
                navigate({
                  to: "/categoria/$slug",
                  params: { slug },
                  search: { ...search, sort: e.target.value, page: undefined },
                })
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

        {/* Subcategory chips */}
        {(siblings.length > 1 || children.length > 0) && (
          <div className="mb-6 -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <div className="flex min-w-max items-center gap-2">
              {parent && (
                <Link
                  to="/categoria/$slug"
                  params={{ slug: parent.slug }}
                  className="inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-xs font-semibold hover:border-primary/40 hover:text-primary"
                >
                  ← Todos {parent.name}
                </Link>
              )}
              {(parent ? siblings : children).map((c) => {
                const active = c.slug === slug;
                return (
                  <Link
                    key={c.id}
                    to="/categoria/$slug"
                    params={{ slug: c.slug }}
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
        )}

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

            {/* Active filter tags */}
            {hasActiveFilters && (
              <div className="mt-3 flex flex-wrap gap-2">
                {search.preco_min && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    A partir de {formatBRL(search.preco_min)}
                    <button
                      onClick={() => {
                        setPrecoMin("");
                        navigate({
                          to: "/categoria/$slug",
                          params: { slug },
                          search: { ...search, preco_min: undefined, page: undefined },
                        });
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {search.preco_max && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Até {formatBRL(search.preco_max)}
                    <button
                      onClick={() => {
                        setPrecoMax("");
                        navigate({
                          to: "/categoria/$slug",
                          params: { slug },
                          search: { ...search, preco_max: undefined, page: undefined },
                        });
                      }}
                    >
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
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse rounded-md bg-muted" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border bg-card p-12 text-center">
            <p className="font-medium">Nenhum produto encontrado</p>
            {hasActiveFilters ? (
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
              >
                Limpar filtros
              </button>
            ) : (
              <Link
                to="/catalogo"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                Ver todos os produtos
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} p={p} />
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

function ProductCard({ p }: { p: ProductRow }) {
  const isM2 = p.product_type === "metro_quadrado";
  const finalPrice = isM2
    ? p.price_per_sqm
    : p.sale_price && p.sale_price > 0
      ? p.sale_price
      : p.price;
  const fullPrice = isM2 ? null : p.price;
  const showFrom = isM2 || (p.sale_price && p.sale_price > 0 && p.sale_price < p.price);

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
          <span className="mt-0.5 text-[11px] text-muted-foreground">ou em até 6× sem juros</span>
        </div>
      </div>
    </Link>
  );
}
