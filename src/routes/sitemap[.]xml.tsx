import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/lib/blog-posts";
import { supabase } from "@/integrations/supabase/client";

const SITE = "https://agilpersianasecortinas.lovable.app";

const STATIC_PAGES = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/catalogo", priority: "0.9", changefreq: "daily" },
  { path: "/persiana-rolo-blackout", priority: "0.9", changefreq: "weekly" },
  { path: "/persiana-solar-screen", priority: "0.9", changefreq: "weekly" },
  { path: "/cortina-romana", priority: "0.9", changefreq: "weekly" },
  { path: "/persiana-double-vision", priority: "0.9", changefreq: "weekly" },
  { path: "/persiana-painel", priority: "0.9", changefreq: "weekly" },
  { path: "/persiana-vertical", priority: "0.9", changefreq: "weekly" },
  { path: "/persiana-horizontal", priority: "0.9", changefreq: "weekly" },
  { path: "/persiana-rio-de-janeiro", priority: "0.8", changefreq: "weekly" },
  { path: "/persiana-belo-horizonte", priority: "0.8", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "daily" },
  { path: "/politica-de-privacidade", priority: "0.3", changefreq: "monthly" },
  { path: "/termos-de-uso", priority: "0.3", changefreq: "monthly" },
  { path: "/trocas-e-devolucoes", priority: "0.4", changefreq: "monthly" },
  { path: "/politica-de-entrega", priority: "0.4", changefreq: "monthly" },
];

function urlEntry(loc: string, lastmod: string, changefreq: string, priority: string) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

function toDate(v: string | null | undefined, fallback: string): string {
  if (!v) return fallback;
  try { return v.split("T")[0]; } catch { return fallback; }
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split("T")[0];

        const [{ data: categories }, { data: products }] = await Promise.all([
          supabase
            .from("categories")
            .select("slug,updated_at")
            .eq("active", true)
            .order("position", { ascending: true }),
          supabase
            .from("products")
            .select("slug,updated_at")
            .eq("active", true)
            .order("position", { ascending: true }),
        ]);

        const urls: string[] = [
          // Static pages
          ...STATIC_PAGES.map((p) =>
            urlEntry(`${SITE}${p.path}`, today, p.changefreq, p.priority)
          ),

          // Category pages — /categoria/:slug
          ...(categories ?? []).map((c) =>
            urlEntry(
              `${SITE}/categoria/${c.slug}`,
              toDate((c as { slug: string; updated_at?: string }).updated_at, today),
              "weekly",
              "0.8",
            )
          ),

          // Product pages — /produto/:slug
          ...(products ?? []).map((p) =>
            urlEntry(
              `${SITE}/produto/${p.slug}`,
              toDate((p as { slug: string; updated_at?: string }).updated_at, today),
              "weekly",
              "0.7",
            )
          ),

          // Blog posts
          ...blogPosts.map((post) =>
            urlEntry(
              `${SITE}/blog/${post.slug}`,
              post.date,
              "monthly",
              "0.6",
            )
          ),
        ];

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          urls.join("\n"),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
