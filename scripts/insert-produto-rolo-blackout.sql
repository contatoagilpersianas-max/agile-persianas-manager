-- =============================================================
-- Produto: Cortina Rolo Blackout Tecido Liso
-- Execute no Supabase Dashboard > SQL Editor
-- =============================================================

INSERT INTO public.products (
  name,
  slug,
  category_id,
  product_type,
  active,
  featured,
  bestseller,

  -- Precos
  price,
  price_per_sqm,
  sale_price,
  bando_price,
  motor_manual_price,
  motor_rf_price,
  motor_wifi_price,

  -- Dimensoes (cm)
  min_width_cm,
  max_width_cm,
  min_height_cm,
  max_height_cm,
  min_area,

  -- Producao e estoque
  processing_days,
  stock,
  stock_min,
  weight_kg,
  package_width_cm,
  package_height_cm,
  package_length_cm,

  -- Imagens
  cover_image,
  gallery,

  -- Textos
  short_description,
  description,
  installation,

  -- Cores
  colors,

  -- Specs / features / faq
  specs,
  features,
  faq,

  -- Tags e SEO
  tags,
  seo_title,
  seo_description,

  -- Avaliacao
  rating,
  reviews_count,
  position
)
VALUES (
  'Cortina Rolo Blackout Tecido Liso',
  'cortina-rolo-blackout-tecido-liso',
  '946345c9-680f-4b3b-b481-7ba30ed30d2b',
  'metro_quadrado',
  true,
  true,
  false,

  -- Precos
  0,
  89.90,
  NULL,
  35.00,
  0,
  450.00,
  680.00,

  -- Dimensoes
  40,
  280,
  50,
  350,
  0.3,

  -- Producao
  7,
  9999,
  0,
  1.5,
  15,
  10,
  30,

  -- Imagens (Pexels - uso livre / licenca Pexels)
  'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
  '["https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200","https://images.pexels.com/photos/3299293/pexels-photo-3299293.jpeg?auto=compress&cs=tinysrgb&w=1200","https://images.pexels.com/photos/6580703/pexels-photo-6580703.jpeg?auto=compress&cs=tinysrgb&w=1200","https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=1200"]'::jsonb,

  -- Descricoes
  'Cortina Rolo Blackout em tecido liso de alta qualidade. Bloqueia 100% da luz solar, ideal para quartos, home theater e ambientes que exigem escurecimento total.',
  '<p>A <strong>Cortina Rolo Blackout Tecido Liso</strong> da Agil Persianas combina funcionalidade maxima com design elegante. Produzida sob medida para o seu ambiente, esta cortina bloqueia completamente a entrada de luz solar, proporcionando privacidade total e conforto termico.</p><h3>Tecido Blackout de Alta Performance</h3><p>Nosso tecido blackout de 3 camadas garante bloqueio de 100% da luz, reduz o ruido externo em ate 30% e contribui para o isolamento termico do ambiente, ajudando a economizar energia com ar-condicionado.</p><h3>Feita Sob Medida</h3><p>Cada cortina e produzida especialmente para o seu vao, com larguras de 40 a 280 cm e alturas de 50 a 350 cm.</p>',
  '<h3>Como Instalar sua Cortina Rolo Blackout</h3><ol><li><strong>Escolha o tipo de fixacao:</strong> suporte teto ou parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse no teto ou parede com bucha S6 (inclusa).</li><li><strong>Encaixe o rolo:</strong> pressione lateralmente ate ouvir o clique de travamento.</li></ol>',

  -- Cores
  '[{"name":"Branco","hex":"#FFFFFF"},{"name":"Off White","hex":"#F5F0E8"},{"name":"Marfim","hex":"#EDE0C8"},{"name":"Cinza Claro","hex":"#D0D0D0"},{"name":"Cinza Medio","hex":"#9E9E9E"},{"name":"Cinza Escuro","hex":"#616161"},{"name":"Chumbo","hex":"#37474F"},{"name":"Preto","hex":"#212121"},{"name":"Bege","hex":"#D7C4A3"},{"name":"Marrom","hex":"#795548"}]'::jsonb,

  -- Specs
  '[{"label":"Material do tecido","value":"Poliester 100% - 3 camadas"},{"label":"Bloqueio de luz","value":"100% (blackout total)"},{"label":"Gramatura","value":"280 g/m2"},{"label":"Espessura","value":"0,45 mm"},{"label":"Reducao de ruido","value":"Ate 30%"},{"label":"Isolamento termico","value":"Sim"},{"label":"Largura minima","value":"40 cm"},{"label":"Largura maxima","value":"280 cm"},{"label":"Altura minima","value":"50 cm"},{"label":"Altura maxima","value":"350 cm"},{"label":"Tubo de aluminio","value":"38 mm"},{"label":"Sistema de acionamento","value":"Cordao/corrente ou motor"},{"label":"Fixacao","value":"Teto ou parede"},{"label":"Garantia","value":"12 meses"},{"label":"Prazo de producao","value":"5 a 7 dias uteis"}]'::jsonb,

  -- Features
  '["Bloqueio total de 100% da luz solar","Tecido lavavel - limpeza pratica com pano umido","Produzida sob medida para o seu vao","Componentes em aluminio de alta durabilidade","Sistema anti-queda com freio de seguranca","Compativel com motorizacao RF e Wi-Fi","Reduz o ruido externo em ate 30%","Melhora o isolamento termico do ambiente","Ideal para quarto, home theater, sala e escritorio","Instalacao simples - kit completo incluso"]'::jsonb,

  -- FAQ
  '[{"question":"Como medir corretamente para fazer o pedido?","answer":"Meca a largura e altura do vao onde a cortina sera instalada. Para instalacao dentro do vao, subtraia 1 cm de cada lado. Para instalacao na parede ou teto acima do vao, adicione ao menos 5 cm para cada lado para melhor bloqueio de luz."},{"question":"A cortina bloqueia 100% da luz?","answer":"Sim. O tecido blackout de 3 camadas bloqueia 100% da luz solar. Para bloqueio total nas laterais, recomendamos instalar o rolo com Bando (saia frontal) e guias laterais opcionais."},{"question":"Quanto tempo demora para receber?","answer":"O prazo de producao e de 5 a 7 dias uteis apos confirmacao do pagamento. O frete e calculado separadamente com base no seu CEP."},{"question":"O tecido e lavavel?","answer":"Sim. Recomendamos limpeza com pano umido levemente. Para lavagem completa, retire o tecido do rolo, lave a mao com agua fria e sabao neutro e seque a sombra."},{"question":"Posso motorizar minha cortina depois?","answer":"Sim, mas o motor deve ser solicitado no momento do pedido, pois o tubo e o mecanismo de fixacao sao dimensionados para o peso do motor."}]'::jsonb,

  -- Tags
  ARRAY['cortina rolo blackout','blackout','persiana rolo blackout','cortina escurecedora','cortina quarto','cortina blackout tecido liso','cortina sob medida','rolo blackout'],

  -- SEO
  'Cortina Rolo Blackout Tecido Liso Sob Medida | Agil Persianas',
  'Cortina Rolo Blackout Tecido Liso 100% bloqueio de luz, produzida sob medida de 40 a 280 cm. Ideal para quarto e home theater. Frete para todo o Brasil.',

  -- Avaliacao
  4.8,
  0,
  1
)
ON CONFLICT (slug) DO NOTHING;

-- Confirmar insercao
SELECT id, name, slug, active, category_id FROM public.products WHERE slug = 'cortina-rolo-blackout-tecido-liso';
