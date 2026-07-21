import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Star, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { supabase } from "@/integrations/supabase/client";
import { formatBRL } from "@/lib/cart";

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

export const Route = createFileRoute("/categoria/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Ágil Persianas` },
      {
        name: "description",
        content: `Confira nossa linha de ${params.slug.replace(/-/g, " ")} sob medida com entrega para todo o Brasil.`,
      },
    ],
  }),
  component: CategoriaPage,
});

function CategoriaPage() {
  const { slug } = useParams({ from: "/categoria/$slug" });

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
  const parent = current?.parent_id ? cats.find((c) => c.id === current.parent_id) ?? null : null;
  const children = current ? cats.filter((c) => c.parent_id === current.id) : [];
  const siblings = parent ? cats.filter((c) => c.parent_id === parent.id) : [];

  // Coleta todos IDs descendentes
  const descendantIds: string[] = [];
  if (current) {
    const ids = new Set<string>([current.id]);
    let added = true;
    while (added) {
      added = false;
      for (const c of cats) {
        if (c.parent_id && ids.has(c.parent_id) && !ids.has(c.id)) {
          ids.add(c.id);
          added = true;
        }
      }
    }
    descendantIds.push(...ids);
  }

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["cat-products", slug, descendantIds.join(",")],
    enabled: !!current,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id,name,slug,price,sale_price,price_per_sqm,product_type,rating,reviews_count,cover_image,badge,category_id",
        )
        .eq("active", true)
        .in("category_id", descendantIds)
        .order("position", { ascending: true })
        .order("bestseller", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as ProductRow[];
    },
    staleTime: 0,
  });

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

        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Categoria</p>
          <h1 className="mt-2 font-display text-3xl md:text-5xl">{current?.name}</h1>
          <p className="mt-2 text-muted-foreground">
            {products.length} {products.length === 1 ? "produto" : "produtos"}
          </p>
        </header>

        {/* Filtros: irmãos (se estiver numa sub) ou filhos (se estiver na raiz) */}
        {(siblings.length > 1 || children.length > 0) && (
          <div className="mb-8 -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
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

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse rounded-md bg-muted" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border bg-card p-12 text-center">
            <p className="font-medium">Nenhum produto nesta categoria ainda</p>
            <Link
              to="/catalogo"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
            >
              Ver todos os produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
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
          <span className="mt-0.5 text-[11px] text-muted-foreground">
            ou em até 6× sem juros
          </span>
        </div>
      </div>
    </Link>
  );
}