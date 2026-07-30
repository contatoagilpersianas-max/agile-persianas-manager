const SUPABASE_URL = "https://unkciujfohuqdkhfpmqi.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVua2NpdWpmb2h1cWRraGZwbXFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNjA5OTIsImV4cCI6MjA5ODkzNjk5Mn0.7_BgkiOohCJzaxpVwqDkDG3iahRGq6Z1wPXA5_HjAUo";

const CATEGORY_ID = "946345c9-680f-4b3b-b481-7ba30ed30d2b";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const product = {
  name: "Cortina Rolo Blackout Tecido Liso",
  slug: "cortina-rolo-blackout-tecido-liso",
  category_id: CATEGORY_ID,
  product_type: "metro_quadrado",
  active: true,
  featured: true,
  bestseller: false,

  // Pricing (R$/m2 com base no mercado nacional)
  price: 0,
  price_per_sqm: 89.9,
  sale_price: null,
  bando_price: 35.0,
  motor_manual_price: 0,
  motor_rf_price: 450.0,
  motor_wifi_price: 680.0,

  // Dimensoes (cm)
  min_width_cm: 40,
  max_width_cm: 280,
  min_height_cm: 50,
  max_height_cm: 350,
  min_area: 0.3,

  // Producao e estoque
  processing_days: 7,
  stock: 9999,
  stock_min: 0,
  weight_kg: 1.5,
  package_width_cm: 15,
  package_height_cm: 10,
  package_length_cm: 30,

  // Imagens (Pexels - uso livre)
  cover_image:
    "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800",
  gallery: [
    "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3299293/pexels-photo-3299293.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/6580703/pexels-photo-6580703.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ],

  // Descricao
  short_description:
    "Cortina Rolo Blackout em tecido liso de alta qualidade. Bloqueia 100% da luz solar, ideal para quartos, home theater e ambientes que exigem escurecimento total.",
  description: `
<p>A <strong>Cortina Rolo Blackout Tecido Liso</strong> da Agil Persianas combina funcionalidade maxima com design elegante. Produzida sob medida para o seu ambiente, esta cortina bloqueia completamente a entrada de luz solar, proporcionando privacidade total e conforto termico.</p>

<h3>Tecido Blackout de Alta Performance</h3>
<p>Nosso tecido blackout de 3 camadas garante bloqueio de 100% da luz, reduz o ruido externo em ate 30% e contribui para o isolamento termico do ambiente, ajudando a economizar energia com ar-condicionado.</p>

<h3>Feita Sob Medida</h3>
<p>Cada cortina e produzida especialmente para o seu vao, com larguras de 40 a 280 cm e alturas de 50 a 350 cm. Informe as medidas exatas ao realizar o pedido - nossa equipe verifica cada detalhe antes da producao.</p>

<h3>Sistema de Acionamento</h3>
<p>Disponivel com acionamento manual por cordao ou corrent, ou com motorizacao RF (controle remoto) e Wi-Fi (app no smartphone e assistentes de voz como Alexa e Google Home).</p>
`.trim(),

  installation: `
<h3>Como Instalar sua Cortina Rolo Blackout</h3>
<ol>
  <li><strong>Escolha o tipo de fixacao:</strong> suporte teto ou parede, incluso no kit.</li>
  <li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li>
  <li><strong>Fixe os suportes:</strong> parafuse no teto ou parede com bucha S6 (inclusa).</li>
  <li><strong>Encaixe o rolo:</strong> pressione lateralmente ate ouvir o clique de travamento.</li>
  <li><strong>Regule o limitador de subida e descida</strong> seguindo o manual impresso.</li>
</ol>
<p>Tempo medio de instalacao: 15 a 30 minutos. Video tutorial disponivel no canal do YouTube da Agil Persianas.</p>
`.trim(),

  // Cores disponiveis
  colors: [
    { name: "Branco", hex: "#FFFFFF" },
    { name: "Off White", hex: "#F5F0E8" },
    { name: "Marfim", hex: "#EDE0C8" },
    { name: "Cinza Claro", hex: "#D0D0D0" },
    { name: "Cinza Medio", hex: "#9E9E9E" },
    { name: "Cinza Escuro", hex: "#616161" },
    { name: "Chumbo", hex: "#37474F" },
    { name: "Preto", hex: "#212121" },
    { name: "Bege", hex: "#D7C4A3" },
    { name: "Marrom", hex: "#795548" },
  ],

  // Especificacoes tecnicas
  specs: [
    { label: "Material do tecido", value: "Poliester 100% - 3 camadas" },
    { label: "Bloqueio de luz", value: "100% (blackout total)" },
    { label: "Gramatura", value: "280 g/m2" },
    { label: "Espessura", value: "0,45 mm" },
    { label: "Reducao de ruido", value: "Ate 30%" },
    { label: "Isolamento termico", value: "Sim" },
    { label: "Largura minima", value: "40 cm" },
    { label: "Largura maxima", value: "280 cm" },
    { label: "Altura minima", value: "50 cm" },
    { label: "Altura maxima", value: "350 cm" },
    { label: "Tubo de aluminio", value: "38 mm" },
    { label: "Sistema de acionamento", value: "Cordao/corrente ou motor" },
    { label: "Fixacao", value: "Teto ou parede" },
    { label: "Garantia", value: "12 meses" },
    { label: "Prazo de producao", value: "5 a 7 dias uteis" },
  ],

  // Beneficios / features
  features: [
    "Bloqueio total de 100% da luz solar",
    "Tecido lavavel - limpeza pratica com pano umido",
    "Produzida sob medida para o seu vao",
    "Componentes em aluminio de alta durabilidade",
    "Sistema anti-queda com freio de seguranca",
    "Compativel com motorizacao RF e Wi-Fi",
    "Reduz o ruido externo em ate 30%",
    "Melhora o isolamento termico do ambiente",
    "Ideal para quarto, home theater, sala e escritorio",
    "Instalacao simples - kit completo incluso",
  ],

  // FAQ
  faq: [
    {
      question: "Como medir corretamente para fazer o pedido?",
      answer:
        "Meça a largura e altura do vão (abertura) onde a cortina sera instalada. Para instalacao dentro do vao, subtraia 1 cm de cada lado. Para instalacao na parede ou teto acima do vao, adicione ao menos 5 cm para cada lado para melhor bloqueio de luz.",
    },
    {
      question: "A cortina bloqueia 100% da luz?",
      answer:
        "Sim. O tecido blackout de 3 camadas bloqueia 100% da luz solar. Para bloqueio total nas laterais, recomendamos instalar o rolo com Bando (saia frontal) e guias laterais opcionais.",
    },
    {
      question: "Quanto tempo demora para receber?",
      answer:
        "O prazo de producao e de 5 a 7 dias uteis apos confirmacao do pagamento. O frete e calculado separadamente com base no seu CEP.",
    },
    {
      question: "O tecido e lavavel?",
      answer:
        "Sim. Recomendamos limpeza com pano umido levemente. Para lavagem completa, retire o tecido do rolo, lave a mao com agua fria e sabao neutro e seque a sombra.",
    },
    {
      question: "Posso motorizar minha cortina depois?",
      answer:
        "Sim, mas o motor deve ser solicitado no momento do pedido, pois o tubo e o mecanismo de fixacao sao dimensionados para o peso do motor. Nao e possivel adaptar apos a entrega.",
    },
  ],

  // Tags SEO
  tags: [
    "cortina rolo blackout",
    "blackout",
    "persiana rolo blackout",
    "cortina escurecedora",
    "cortina quarto",
    "cortina blackout tecido liso",
    "cortina sob medida",
    "rolo blackout",
  ],

  // SEO
  seo_title: "Cortina Rolo Blackout Tecido Liso Sob Medida | Agil Persianas",
  seo_description:
    "Cortina Rolo Blackout Tecido Liso 100% bloqueio de luz, produzida sob medida de 40 a 280 cm. Ideal para quarto e home theater. Frete para todo o Brasil.",

  // Avaliacoes
  rating: 4.8,
  reviews_count: 0,
  position: 1,
};

console.log("Inserindo produto:", product.name);

const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
  method: "POST",
  headers,
  body: JSON.stringify(product),
});

const text = await res.text();
if (!res.ok) {
  console.error("Erro ao inserir produto:", res.status, text);
  process.exit(1);
}

const inserted = JSON.parse(text);
console.log("Produto inserido com sucesso!");
console.log("ID:", Array.isArray(inserted) ? inserted[0]?.id : inserted?.id);
console.log("Slug:", Array.isArray(inserted) ? inserted[0]?.slug : inserted?.slug);
