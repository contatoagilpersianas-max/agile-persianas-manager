import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { SITE_CONFIG, whatsappLink } from "@/lib/site-config";

export const Route = createFileRoute("/trocas-e-devolucoes")({
  head: () => ({
    meta: [
      { title: "Trocas e Devoluções — Ágil Persianas" },
      {
        name: "description",
        content: "Política de trocas e devoluções da Ágil Persianas.",
      },
    ],
  }),
  component: ExchangesPage,
});

const ITEMS = [
  "O cliente poderá solicitar a devolução em até 7 dias corridos após o recebimento do produto.",
  "Para produtos com defeito de fabricação, o prazo para troca é de 30 dias após o recebimento.",
  "O produto deve ser devolvido em sua embalagem original, sem sinais de uso ou danos.",
  "Produtos feitos sob medida não poderão ser trocados ou devolvidos, exceto em casos de defeito de fabricação ou erro da loja.",
];

function ExchangesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="bg-gradient-warm border-b">
          <div className="container-premium py-16 md:py-20 text-center max-w-3xl mx-auto">
            <span className="eyebrow">Legal</span>
            <h1 className="font-display text-4xl md:text-5xl mt-3">
              Trocas e Devoluções
            </h1>
          </div>
        </section>

        <section className="container-premium py-16 md:py-20 max-w-3xl">
          <p className="text-base leading-relaxed text-foreground/90">
            A {SITE_CONFIG.brand} segue o Código de Defesa do Consumidor e
            assegura o direito de troca ou devolução de produtos.
          </p>
          <ul className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90">
            {ITEMS.map((it, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base leading-relaxed text-foreground/90">
            As solicitações devem ser feitas pelo e-mail{" "}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary underline underline-offset-4">
              {SITE_CONFIG.email}
            </a>{" "}
            ou{" "}
            <a
              href={whatsappLink("Olá! Gostaria de solicitar uma troca/devolução.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              WhatsApp {SITE_CONFIG.whatsappDisplay}
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
