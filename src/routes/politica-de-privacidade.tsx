import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { SITE_CONFIG } from "@/lib/site-config";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Ágil Persianas" },
      {
        name: "description",
        content: "Como a Ágil Persianas coleta, usa e protege seus dados pessoais.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="bg-gradient-warm border-b">
          <div className="container-premium py-16 md:py-20 text-center max-w-3xl mx-auto">
            <span className="eyebrow">Legal</span>
            <h1 className="font-display text-4xl md:text-5xl mt-3">
              Política de Privacidade
            </h1>
          </div>
        </section>

        <section className="container-premium py-16 md:py-20 max-w-3xl">
          <div className="space-y-6 text-base leading-relaxed text-foreground/90">
            <p>
              A {SITE_CONFIG.brand} respeita a sua privacidade e está comprometida
              em proteger os dados pessoais de todos os clientes.
            </p>
            <p>
              Todas as informações fornecidas durante a navegação em nosso site
              são utilizadas exclusivamente para processar pedidos, personalizar
              a experiência de compra e melhorar nossos serviços.
            </p>
            <p>
              Garantimos que seus dados não serão vendidos, trocados ou
              divulgados a terceiros, exceto quando necessários para a conclusão
              de transações (como operadoras de pagamento e transportadoras).
            </p>
            <p>
              Nosso site utiliza certificados de segurança (SSL), garantindo que
              todas as informações sejam transmitidas de forma criptografada.
            </p>
            <p>
              Dúvidas sobre o uso dos seus dados podem ser enviadas para{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary underline underline-offset-4">
                {SITE_CONFIG.email}
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
