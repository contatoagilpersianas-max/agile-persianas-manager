import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/politica-de-entrega")({
  head: () => ({
    meta: [
      { title: "Política de Entrega — Ágil Persianas" },
      {
        name: "description",
        content: "Como funcionam os prazos e as condições de entrega da Ágil Persianas.",
      },
    ],
  }),
  component: DeliveryPage,
});

const ITEMS = [
  "O prazo de entrega começa a contar a partir da confirmação do pagamento.",
  "Para produtos sob medida, o prazo de fabricação será informado na página do produto e acrescido ao prazo da transportadora.",
  "As entregas são realizadas em horário comercial, de segunda a sexta-feira, e devem ter alguém disponível no local para recebimento.",
  "Caso a entrega não seja realizada por ausência do destinatário ou endereço incorreto, poderá haver cobrança de novo frete.",
  "Atrasos ocasionados por fatores externos (greves, desastres naturais, restrições logísticas) são de responsabilidade da transportadora, mas nossa equipe dará todo o suporte necessário.",
];

function DeliveryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="bg-gradient-warm border-b">
          <div className="container-premium py-16 md:py-20 text-center max-w-3xl mx-auto">
            <span className="eyebrow">Legal</span>
            <h1 className="font-display text-4xl md:text-5xl mt-3">
              Política de Entrega
            </h1>
          </div>
        </section>

        <section className="container-premium py-16 md:py-20 max-w-3xl">
          <p className="text-base leading-relaxed text-foreground/90">
            A Ágil Persianas trabalha com envios para todo o Brasil.
          </p>
          <ul className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90">
            {ITEMS.map((it, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
