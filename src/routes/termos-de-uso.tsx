import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      { title: "Termos e Condições — Ágil Persianas" },
      {
        name: "description",
        content: "Termos e condições de compra da Ágil Persianas.",
      },
    ],
  }),
  component: TermsPage,
});

const ITEMS = [
  "Todas as imagens exibidas têm caráter ilustrativo, podendo haver variação mínima de cor devido à iluminação e configurações de tela.",
  "Os prazos de entrega são estimados e dependem da transportadora escolhida.",
  "Compras realizadas somente serão confirmadas após a aprovação do pagamento.",
  "Produtos sob medida são fabricados conforme especificações enviadas pelo cliente. Recomendamos atenção redobrada nas medidas fornecidas.",
  "A Ágil Persianas reserva-se o direito de alterar preços, promoções e condições sem aviso prévio.",
];

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="bg-gradient-warm border-b">
          <div className="container-premium py-16 md:py-20 text-center max-w-3xl mx-auto">
            <span className="eyebrow">Legal</span>
            <h1 className="font-display text-4xl md:text-5xl mt-3">
              Termos e Condições
            </h1>
          </div>
        </section>

        <section className="container-premium py-16 md:py-20 max-w-3xl">
          <p className="text-base leading-relaxed text-foreground/90">
            Ao acessar e comprar em nosso site, você concorda com os seguintes
            termos:
          </p>
          <ol className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90">
            {ITEMS.map((it, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-display text-primary shrink-0">{i + 1}.</span>
                <span>{it}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </div>
  );
}
