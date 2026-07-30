-- =====================================================================
-- CATALOGO COMPLETO - Agil Persianas
-- Gerado automaticamente a partir das fotos em public/produtos.
--
-- COMO USAR:
--   1. Abra o Supabase Dashboard > SQL Editor
--   2. Cole este arquivo inteiro e execute (RUN)
--   3. Confira os precos no /admin/catalogo e ATIVE os produtos
--
-- ATENCAO SOBRE PRECO:
--   Todos os produtos entram com active = false de proposito.
--   O price_per_sqm preenchido e REFERENCIA DE MERCADO (coletada da
--   concorrencia), NAO o preco da Agil. Conferir cada um antes de ativar.
--
-- 18 produtos | 18 blocos
-- =====================================================================

-- ---------------------------------------------------------------
-- Cortina Rolô Blackout Texturizado
-- Preco/m2: 371.11  (referencia de mercado - CONFERIR)
-- 18 fotos em 4 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Cortina Rolô Blackout Texturizado',
  'cortina-rolo-blackout-texturizado',
  (SELECT id FROM public.categories WHERE slug = 'cortina-rolo-blackout-texturizado' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 371.11, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/rolo-blackout-texturizado/bege/rolo-blackout-texturizado-bege-1.jpg',
  '[{"url": "/produtos/rolo-blackout-texturizado/bege/rolo-blackout-texturizado-bege-1.jpg", "color": "Bege", "caption": "Cortina Rolô Blackout Texturizado — Bege"}, {"url": "/produtos/rolo-blackout-texturizado/bege/rolo-blackout-texturizado-bege-2.jpg", "color": "Bege", "caption": "Cortina Rolô Blackout Texturizado — Bege"}, {"url": "/produtos/rolo-blackout-texturizado/bege/rolo-blackout-texturizado-bege-3.jpg", "color": "Bege", "caption": "Cortina Rolô Blackout Texturizado — Bege"}, {"url": "/produtos/rolo-blackout-texturizado/bege/rolo-blackout-texturizado-bege-4.jpg", "color": "Bege", "caption": "Cortina Rolô Blackout Texturizado — Bege"}, {"url": "/produtos/rolo-blackout-texturizado/bege/rolo-blackout-texturizado-bege-5.jpg", "color": "Bege", "caption": "Cortina Rolô Blackout Texturizado — Bege"}, {"url": "/produtos/rolo-blackout-texturizado/bege/rolo-blackout-texturizado-bege-6.jpg", "color": "Bege", "caption": "Cortina Rolô Blackout Texturizado — Bege"}, {"url": "/produtos/rolo-blackout-texturizado/bege/rolo-blackout-texturizado-bege-7.jpg", "color": "Bege", "caption": "Cortina Rolô Blackout Texturizado — Bege"}, {"url": "/produtos/rolo-blackout-texturizado/bege/rolo-blackout-texturizado-bege-8.jpg", "color": "Bege", "caption": "Cortina Rolô Blackout Texturizado — Bege"}, {"url": "/produtos/rolo-blackout-texturizado/branco/rolo-blackout-texturizado-branco-1.jpg", "color": "Branco", "caption": "Cortina Rolô Blackout Texturizado — Branco"}, {"url": "/produtos/rolo-blackout-texturizado/branco/rolo-blackout-texturizado-branco-2.jpg", "color": "Branco", "caption": "Cortina Rolô Blackout Texturizado — Branco"}, {"url": "/produtos/rolo-blackout-texturizado/branco/rolo-blackout-texturizado-branco-3.jpg", "color": "Branco", "caption": "Cortina Rolô Blackout Texturizado — Branco"}, {"url": "/produtos/rolo-blackout-texturizado/branco/rolo-blackout-texturizado-branco-4.jpg", "color": "Branco", "caption": "Cortina Rolô Blackout Texturizado — Branco"}, {"url": "/produtos/rolo-blackout-texturizado/branco/rolo-blackout-texturizado-branco-5.jpg", "color": "Branco", "caption": "Cortina Rolô Blackout Texturizado — Branco"}, {"url": "/produtos/rolo-blackout-texturizado/cinza/rolo-blackout-texturizado-cinza-1.jpg", "color": "Cinza", "caption": "Cortina Rolô Blackout Texturizado — Cinza"}, {"url": "/produtos/rolo-blackout-texturizado/light-green/rolo-blackout-texturizado-light-green-1.jpg", "color": "Light Green", "caption": "Cortina Rolô Blackout Texturizado — Light Green"}, {"url": "/produtos/rolo-blackout-texturizado/light-green/rolo-blackout-texturizado-light-green-2.jpg", "color": "Light Green", "caption": "Cortina Rolô Blackout Texturizado — Light Green"}, {"url": "/produtos/rolo-blackout-texturizado/light-green/rolo-blackout-texturizado-light-green-3.jpg", "color": "Light Green", "caption": "Cortina Rolô Blackout Texturizado — Light Green"}, {"url": "/produtos/rolo-blackout-texturizado/light-green/rolo-blackout-texturizado-light-green-4.jpg", "color": "Light Green", "caption": "Cortina Rolô Blackout Texturizado — Light Green"}]'::jsonb,
  'Bloqueio de 100% da luz, conforto térmico e acabamento sob medida ao centímetro.',
  '<p>Bloqueio de 100% da luz, conforto térmico e acabamento sob medida ao centímetro.</p><ul><li>Bloqueio total da luz (blackout)</li><li>Tecido com proteção UV</li><li>Produzida sob medida para o seu vão</li><li>Acionamento manual, motor RF ou Wi-Fi</li><li>Ideal para quarto, home theater e sala com TV</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Bege", "hex": "#D9D7CB"}, {"name": "Branco", "hex": "#F1F1F3"}, {"name": "Cinza", "hex": "#D1D2D4"}, {"name": "Light Green", "hex": "#E6E7E3"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Bloqueio total da luz (blackout)", "Tecido com proteção UV", "Produzida sob medida para o seu vão", "Acionamento manual, motor RF ou Wi-Fi", "Ideal para quarto, home theater e sala com TV"]'::jsonb,
  '[]'::jsonb,
  ARRAY['cortina rolô blackout texturizado','blackout','sob medida','ágil persianas'],
  'Cortina Rolô Blackout Texturizado Sob Medida | Ágil Persianas',
  'Bloqueio de 100% da luz, conforto térmico e acabamento sob medida ao centímetro. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Cortina Rolô Blackout Tecido Liso
-- Preco/m2: 163.55  (referencia de mercado - CONFERIR)
-- 14 fotos em 4 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Cortina Rolô Blackout Tecido Liso',
  'cortina-rolo-blackout-tecido-liso-sob-medida',
  (SELECT id FROM public.categories WHERE slug = 'cortina-rolo-blackout-tecido-liso' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 163.55, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/rolo-blackout-tecido-liso/bege/rolo-blackout-tecido-liso-bege-1.jpg',
  '[{"url": "/produtos/rolo-blackout-tecido-liso/bege/rolo-blackout-tecido-liso-bege-1.jpg", "color": "Bege", "caption": "Cortina Rolô Blackout Tecido Liso — Bege"}, {"url": "/produtos/rolo-blackout-tecido-liso/bege/rolo-blackout-tecido-liso-bege-2.jpg", "color": "Bege", "caption": "Cortina Rolô Blackout Tecido Liso — Bege"}, {"url": "/produtos/rolo-blackout-tecido-liso/bege/rolo-blackout-tecido-liso-bege-3.jpg", "color": "Bege", "caption": "Cortina Rolô Blackout Tecido Liso — Bege"}, {"url": "/produtos/rolo-blackout-tecido-liso/branco/rolo-blackout-tecido-liso-branco-1.jpg", "color": "Branco", "caption": "Cortina Rolô Blackout Tecido Liso — Branco"}, {"url": "/produtos/rolo-blackout-tecido-liso/branco/rolo-blackout-tecido-liso-branco-2.jpg", "color": "Branco", "caption": "Cortina Rolô Blackout Tecido Liso — Branco"}, {"url": "/produtos/rolo-blackout-tecido-liso/branco/rolo-blackout-tecido-liso-branco-3.jpg", "color": "Branco", "caption": "Cortina Rolô Blackout Tecido Liso — Branco"}, {"url": "/produtos/rolo-blackout-tecido-liso/branco/rolo-blackout-tecido-liso-branco-4.jpg", "color": "Branco", "caption": "Cortina Rolô Blackout Tecido Liso — Branco"}, {"url": "/produtos/rolo-blackout-tecido-liso/branco/rolo-blackout-tecido-liso-branco-5.jpg", "color": "Branco", "caption": "Cortina Rolô Blackout Tecido Liso — Branco"}, {"url": "/produtos/rolo-blackout-tecido-liso/marron/rolo-blackout-tecido-liso-marron-1.jpg", "color": "Marron", "caption": "Cortina Rolô Blackout Tecido Liso — Marron"}, {"url": "/produtos/rolo-blackout-tecido-liso/marron/rolo-blackout-tecido-liso-marron-2.jpg", "color": "Marron", "caption": "Cortina Rolô Blackout Tecido Liso — Marron"}, {"url": "/produtos/rolo-blackout-tecido-liso/marron/rolo-blackout-tecido-liso-marron-3.jpg", "color": "Marron", "caption": "Cortina Rolô Blackout Tecido Liso — Marron"}, {"url": "/produtos/rolo-blackout-tecido-liso/preto/rolo-blackout-tecido-liso-preto-1.jpg", "color": "Preto", "caption": "Cortina Rolô Blackout Tecido Liso — Preto"}, {"url": "/produtos/rolo-blackout-tecido-liso/preto/rolo-blackout-tecido-liso-preto-2.jpg", "color": "Preto", "caption": "Cortina Rolô Blackout Tecido Liso — Preto"}, {"url": "/produtos/rolo-blackout-tecido-liso/preto/rolo-blackout-tecido-liso-preto-3.jpg", "color": "Preto", "caption": "Cortina Rolô Blackout Tecido Liso — Preto"}]'::jsonb,
  'Bloqueio de 100% da luz, conforto térmico e acabamento sob medida ao centímetro.',
  '<p>Bloqueio de 100% da luz, conforto térmico e acabamento sob medida ao centímetro.</p><ul><li>Bloqueio total da luz (blackout)</li><li>Tecido com proteção UV</li><li>Produzida sob medida para o seu vão</li><li>Acionamento manual, motor RF ou Wi-Fi</li><li>Ideal para quarto, home theater e sala com TV</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Bege", "hex": "#BCB6AA"}, {"name": "Branco", "hex": "#D1D0CC"}, {"name": "Marron", "hex": "#969289"}, {"name": "Preto", "hex": "#1B1C1D"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Bloqueio total da luz (blackout)", "Tecido com proteção UV", "Produzida sob medida para o seu vão", "Acionamento manual, motor RF ou Wi-Fi", "Ideal para quarto, home theater e sala com TV"]'::jsonb,
  '[]'::jsonb,
  ARRAY['cortina rolô blackout tecido liso','blackout','sob medida','ágil persianas'],
  'Cortina Rolô Blackout Tecido Liso Sob Medida | Ágil Persianas',
  'Bloqueio de 100% da luz, conforto térmico e acabamento sob medida ao centímetro. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Cortina Romana Blackout Tecido Liso
-- Preco/m2: 279.0  (referencia de mercado - CONFERIR)
-- 8 fotos em 4 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Cortina Romana Blackout Tecido Liso',
  'cortina-romana-blackout-tecido-liso',
  (SELECT id FROM public.categories WHERE slug = 'romana-blackout-tecido-liso' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 279.0, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/romana-blackout-tecido-liso/bege/romana-blackout-tecido-liso-bege-1.jpg',
  '[{"url": "/produtos/romana-blackout-tecido-liso/bege/romana-blackout-tecido-liso-bege-1.jpg", "color": "Bege", "caption": "Cortina Romana Blackout Tecido Liso — Bege"}, {"url": "/produtos/romana-blackout-tecido-liso/bege/romana-blackout-tecido-liso-bege-2.jpg", "color": "Bege", "caption": "Cortina Romana Blackout Tecido Liso — Bege"}, {"url": "/produtos/romana-blackout-tecido-liso/branco/romana-blackout-tecido-liso-branco-1.jpg", "color": "Branco", "caption": "Cortina Romana Blackout Tecido Liso — Branco"}, {"url": "/produtos/romana-blackout-tecido-liso/branco/romana-blackout-tecido-liso-branco-2.jpg", "color": "Branco", "caption": "Cortina Romana Blackout Tecido Liso — Branco"}, {"url": "/produtos/romana-blackout-tecido-liso/cinza/romana-blackout-tecido-liso-cinza-1.jpg", "color": "Cinza", "caption": "Cortina Romana Blackout Tecido Liso — Cinza"}, {"url": "/produtos/romana-blackout-tecido-liso/cinza/romana-blackout-tecido-liso-cinza-2.jpg", "color": "Cinza", "caption": "Cortina Romana Blackout Tecido Liso — Cinza"}, {"url": "/produtos/romana-blackout-tecido-liso/preto/romana-blackout-tecido-liso-preto-1.jpg", "color": "Preto", "caption": "Cortina Romana Blackout Tecido Liso — Preto"}, {"url": "/produtos/romana-blackout-tecido-liso/preto/romana-blackout-tecido-liso-preto-2.jpg", "color": "Preto", "caption": "Cortina Romana Blackout Tecido Liso — Preto"}]'::jsonb,
  'Bloqueio de 100% da luz, conforto térmico e acabamento sob medida ao centímetro.',
  '<p>Bloqueio de 100% da luz, conforto térmico e acabamento sob medida ao centímetro.</p><ul><li>Bloqueio total da luz (blackout)</li><li>Tecido com proteção UV</li><li>Produzida sob medida para o seu vão</li><li>Acionamento manual, motor RF ou Wi-Fi</li><li>Ideal para quarto, home theater e sala com TV</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Bege", "hex": "#BCB6AA"}, {"name": "Branco", "hex": "#D1D0CC"}, {"name": "Cinza", "hex": "#D1D2D4"}, {"name": "Preto", "hex": "#1B1C1D"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Bloqueio total da luz (blackout)", "Tecido com proteção UV", "Produzida sob medida para o seu vão", "Acionamento manual, motor RF ou Wi-Fi", "Ideal para quarto, home theater e sala com TV"]'::jsonb,
  '[]'::jsonb,
  ARRAY['cortina romana blackout tecido liso','blackout','sob medida','ágil persianas'],
  'Cortina Romana Blackout Tecido Liso Sob Medida | Ágil Persianas',
  'Bloqueio de 100% da luz, conforto térmico e acabamento sob medida ao centímetro. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Cortina Romana Tela Solar 1%
-- Preco/m2: 446.12  (referencia de mercado - CONFERIR)
-- 8 fotos em 4 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Cortina Romana Tela Solar 1%',
  'cortina-romana-tela-solar-1',
  (SELECT id FROM public.categories WHERE slug = 'cortina-romana-tela-solar-1' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 446.12, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/romana-tela-solar-1/bege/romana-tela-solar-1-bege-1.jpg',
  '[{"url": "/produtos/romana-tela-solar-1/bege/romana-tela-solar-1-bege-1.jpg", "color": "Bege", "caption": "Cortina Romana Tela Solar 1% — Bege"}, {"url": "/produtos/romana-tela-solar-1/bege/romana-tela-solar-1-bege-2.jpg", "color": "Bege", "caption": "Cortina Romana Tela Solar 1% — Bege"}, {"url": "/produtos/romana-tela-solar-1/branco/romana-tela-solar-1-branco-1.jpg", "color": "Branco", "caption": "Cortina Romana Tela Solar 1% — Branco"}, {"url": "/produtos/romana-tela-solar-1/branco/romana-tela-solar-1-branco-2.jpg", "color": "Branco", "caption": "Cortina Romana Tela Solar 1% — Branco"}, {"url": "/produtos/romana-tela-solar-1/cinza/romana-tela-solar-1-cinza-1.jpg", "color": "Cinza", "caption": "Cortina Romana Tela Solar 1% — Cinza"}, {"url": "/produtos/romana-tela-solar-1/cinza/romana-tela-solar-1-cinza-2.jpg", "color": "Cinza", "caption": "Cortina Romana Tela Solar 1% — Cinza"}, {"url": "/produtos/romana-tela-solar-1/preto/romana-tela-solar-1-preto-1.jpg", "color": "Preto", "caption": "Cortina Romana Tela Solar 1% — Preto"}, {"url": "/produtos/romana-tela-solar-1/preto/romana-tela-solar-1-preto-2.jpg", "color": "Preto", "caption": "Cortina Romana Tela Solar 1% — Preto"}]'::jsonb,
  'Tela solar 1%: máxima proteção solar e privacidade de dia, mantendo a ventilação.',
  '<p>Tela solar 1%: máxima proteção solar e privacidade de dia, mantendo a ventilação.</p><ul><li>Abertura de 1% — a mais fechada da linha</li><li>Bloqueia grande parte do calor e dos raios UV</li><li>Preserva a visão para fora durante o dia</li><li>Produzida sob medida</li><li>Ideal para fachadas com sol forte</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Bege", "hex": "#C2AE84"}, {"name": "Branco", "hex": "#E8E4D6"}, {"name": "Cinza", "hex": "#8C8C88"}, {"name": "Preto", "hex": "#2A2D30"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Abertura de 1% — a mais fechada da linha", "Bloqueia grande parte do calor e dos raios UV", "Preserva a visão para fora durante o dia", "Produzida sob medida", "Ideal para fachadas com sol forte"]'::jsonb,
  '[]'::jsonb,
  ARRAY['cortina romana tela solar 1%','solar1','sob medida','ágil persianas'],
  'Cortina Romana Tela Solar 1% Sob Medida | Ágil Persianas',
  'Tela solar 1%: máxima proteção solar e privacidade de dia, mantendo a ventilação. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Cortina Romana Tela Solar 3%
-- Preco/m2: 446.12  (referencia de mercado - CONFERIR)
-- 8 fotos em 4 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Cortina Romana Tela Solar 3%',
  'cortina-romana-tela-solar-3',
  (SELECT id FROM public.categories WHERE slug = 'cortina-romana-tela-solar-3' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 446.12, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/romana-tela-solar-3/bege/romana-tela-solar-3-bege-1.jpg',
  '[{"url": "/produtos/romana-tela-solar-3/bege/romana-tela-solar-3-bege-1.jpg", "color": "Bege", "caption": "Cortina Romana Tela Solar 3% — Bege"}, {"url": "/produtos/romana-tela-solar-3/bege/romana-tela-solar-3-bege-2.jpg", "color": "Bege", "caption": "Cortina Romana Tela Solar 3% — Bege"}, {"url": "/produtos/romana-tela-solar-3/branco/romana-tela-solar-3-branco-1.jpg", "color": "Branco", "caption": "Cortina Romana Tela Solar 3% — Branco"}, {"url": "/produtos/romana-tela-solar-3/branco/romana-tela-solar-3-branco-2.jpg", "color": "Branco", "caption": "Cortina Romana Tela Solar 3% — Branco"}, {"url": "/produtos/romana-tela-solar-3/cinza/romana-tela-solar-3-cinza-1.jpg", "color": "Cinza", "caption": "Cortina Romana Tela Solar 3% — Cinza"}, {"url": "/produtos/romana-tela-solar-3/cinza/romana-tela-solar-3-cinza-2.jpg", "color": "Cinza", "caption": "Cortina Romana Tela Solar 3% — Cinza"}, {"url": "/produtos/romana-tela-solar-3/preto/romana-tela-solar-3-preto-1.jpg", "color": "Preto", "caption": "Cortina Romana Tela Solar 3% — Preto"}, {"url": "/produtos/romana-tela-solar-3/preto/romana-tela-solar-3-preto-2.jpg", "color": "Preto", "caption": "Cortina Romana Tela Solar 3% — Preto"}]'::jsonb,
  'Tela solar 3%: o equilíbrio entre luz natural, vista externa e proteção solar.',
  '<p>Tela solar 3%: o equilíbrio entre luz natural, vista externa e proteção solar.</p><ul><li>Abertura de 3% — a escolha mais procurada</li><li>Filtra o calor sem escurecer o ambiente</li><li>Mantém a vista para fora durante o dia</li><li>Produzida sob medida</li><li>Ideal para sala, varanda e escritório</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Bege", "hex": "#C2AE84"}, {"name": "Branco", "hex": "#E8E4D6"}, {"name": "Cinza", "hex": "#8C8C88"}, {"name": "Preto", "hex": "#2A2D30"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Abertura de 3% — a escolha mais procurada", "Filtra o calor sem escurecer o ambiente", "Mantém a vista para fora durante o dia", "Produzida sob medida", "Ideal para sala, varanda e escritório"]'::jsonb,
  '[]'::jsonb,
  ARRAY['cortina romana tela solar 3%','solar3','sob medida','ágil persianas'],
  'Cortina Romana Tela Solar 3% Sob Medida | Ágil Persianas',
  'Tela solar 3%: o equilíbrio entre luz natural, vista externa e proteção solar. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Cortina Romana Tela Solar 5%
-- Preco/m2: 266.31  (referencia de mercado - CONFERIR)
-- 8 fotos em 4 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Cortina Romana Tela Solar 5%',
  'cortina-romana-tela-solar-5',
  (SELECT id FROM public.categories WHERE slug = 'cortina-romana-tela-solar-5' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 266.31, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/romana-tela-solar-5/bege/romana-tela-solar-5-bege-1.jpg',
  '[{"url": "/produtos/romana-tela-solar-5/bege/romana-tela-solar-5-bege-1.jpg", "color": "Bege", "caption": "Cortina Romana Tela Solar 5% — Bege"}, {"url": "/produtos/romana-tela-solar-5/bege/romana-tela-solar-5-bege-2.jpg", "color": "Bege", "caption": "Cortina Romana Tela Solar 5% — Bege"}, {"url": "/produtos/romana-tela-solar-5/branco/romana-tela-solar-5-branco-1.jpg", "color": "Branco", "caption": "Cortina Romana Tela Solar 5% — Branco"}, {"url": "/produtos/romana-tela-solar-5/branco/romana-tela-solar-5-branco-2.jpg", "color": "Branco", "caption": "Cortina Romana Tela Solar 5% — Branco"}, {"url": "/produtos/romana-tela-solar-5/cinza/romana-tela-solar-5-cinza-1.jpg", "color": "Cinza", "caption": "Cortina Romana Tela Solar 5% — Cinza"}, {"url": "/produtos/romana-tela-solar-5/cinza/romana-tela-solar-5-cinza-2.jpg", "color": "Cinza", "caption": "Cortina Romana Tela Solar 5% — Cinza"}, {"url": "/produtos/romana-tela-solar-5/preto/romana-tela-solar-5-preto-1.jpg", "color": "Preto", "caption": "Cortina Romana Tela Solar 5% — Preto"}, {"url": "/produtos/romana-tela-solar-5/preto/romana-tela-solar-5-preto-2.jpg", "color": "Preto", "caption": "Cortina Romana Tela Solar 5% — Preto"}]'::jsonb,
  'Tela solar 5%: mais luminosidade e vista externa, com filtro solar.',
  '<p>Tela solar 5%: mais luminosidade e vista externa, com filtro solar.</p><ul><li>Abertura de 5% — a mais clara da linha</li><li>Entrada generosa de luz natural</li><li>Melhor visão para fora entre as telas solares</li><li>Produzida sob medida</li><li>Ideal para ambientes que pedem claridade</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Bege", "hex": "#C2AE84"}, {"name": "Branco", "hex": "#E8E4D6"}, {"name": "Cinza", "hex": "#8C8C88"}, {"name": "Preto", "hex": "#2A2D30"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Abertura de 5% — a mais clara da linha", "Entrada generosa de luz natural", "Melhor visão para fora entre as telas solares", "Produzida sob medida", "Ideal para ambientes que pedem claridade"]'::jsonb,
  '[]'::jsonb,
  ARRAY['cortina romana tela solar 5%','solar5','sob medida','ágil persianas'],
  'Cortina Romana Tela Solar 5% Sob Medida | Ágil Persianas',
  'Tela solar 5%: mais luminosidade e vista externa, com filtro solar. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Painel Blackout Tecido Liso
-- Preco/m2: 837.0  (referencia de mercado - CONFERIR)
-- 6 fotos em 3 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Painel Blackout Tecido Liso',
  'painel-blackout-tecido-liso',
  (SELECT id FROM public.categories WHERE slug = 'painel-blackout-tecido-liso' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 837.0, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/painel-blackout-tecido-liso/bege/painel-blackout-tecido-liso-bege-1.jpg',
  '[{"url": "/produtos/painel-blackout-tecido-liso/bege/painel-blackout-tecido-liso-bege-1.jpg", "color": "Bege", "caption": "Painel Blackout Tecido Liso — Bege"}, {"url": "/produtos/painel-blackout-tecido-liso/bege/painel-blackout-tecido-liso-bege-2.jpg", "color": "Bege", "caption": "Painel Blackout Tecido Liso — Bege"}, {"url": "/produtos/painel-blackout-tecido-liso/cinza/painel-blackout-tecido-liso-cinza-1.jpg", "color": "Cinza", "caption": "Painel Blackout Tecido Liso — Cinza"}, {"url": "/produtos/painel-blackout-tecido-liso/cinza/painel-blackout-tecido-liso-cinza-2.jpg", "color": "Cinza", "caption": "Painel Blackout Tecido Liso — Cinza"}, {"url": "/produtos/painel-blackout-tecido-liso/preto/painel-blackout-tecido-liso-preto-1.jpg", "color": "Preto", "caption": "Painel Blackout Tecido Liso — Preto"}, {"url": "/produtos/painel-blackout-tecido-liso/preto/painel-blackout-tecido-liso-preto-2.jpg", "color": "Preto", "caption": "Painel Blackout Tecido Liso — Preto"}]'::jsonb,
  'Painel deslizante blackout para grandes vãos e portas de vidro.',
  '<p>Painel deslizante blackout para grandes vãos e portas de vidro.</p><ul><li>Sistema de painéis deslizantes em trilho</li><li>Bloqueio de 100% da luz</li><li>Solução própria para vãos largos</li><li>Produzido sob medida</li><li>Visual clean e contemporâneo</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Bege", "hex": "#BCB6AA"}, {"name": "Cinza", "hex": "#D1D2D4"}, {"name": "Preto", "hex": "#1B1C1D"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Sistema de painéis deslizantes em trilho", "Bloqueio de 100% da luz", "Solução própria para vãos largos", "Produzido sob medida", "Visual clean e contemporâneo"]'::jsonb,
  '[]'::jsonb,
  ARRAY['painel blackout tecido liso','painel-blackout','sob medida','ágil persianas'],
  'Painel Blackout Tecido Liso Sob Medida | Ágil Persianas',
  'Painel deslizante blackout para grandes vãos e portas de vidro. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Painel Blackout Texturizado
-- Preco/m2: 837.0  (referencia de mercado - CONFERIR)
-- 4 fotos em 2 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Painel Blackout Texturizado',
  'painel-blackout-texturizado',
  (SELECT id FROM public.categories WHERE slug = 'painel-blackout-texturizado' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 837.0, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/painel-blackout-texturizado/branco/painel-blackout-texturizado-branco-1.jpg',
  '[{"url": "/produtos/painel-blackout-texturizado/branco/painel-blackout-texturizado-branco-1.jpg", "color": "Branco", "caption": "Painel Blackout Texturizado — Branco"}, {"url": "/produtos/painel-blackout-texturizado/branco/painel-blackout-texturizado-branco-2.jpg", "color": "Branco", "caption": "Painel Blackout Texturizado — Branco"}, {"url": "/produtos/painel-blackout-texturizado/light-green/painel-blackout-texturizado-light-green-1.jpg", "color": "Light Green", "caption": "Painel Blackout Texturizado — Light Green"}, {"url": "/produtos/painel-blackout-texturizado/light-green/painel-blackout-texturizado-light-green-2.jpg", "color": "Light Green", "caption": "Painel Blackout Texturizado — Light Green"}]'::jsonb,
  'Painel deslizante blackout para grandes vãos e portas de vidro.',
  '<p>Painel deslizante blackout para grandes vãos e portas de vidro.</p><ul><li>Sistema de painéis deslizantes em trilho</li><li>Bloqueio de 100% da luz</li><li>Solução própria para vãos largos</li><li>Produzido sob medida</li><li>Visual clean e contemporâneo</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Branco", "hex": "#F1F1F3"}, {"name": "Light Green", "hex": "#E6E7E3"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Sistema de painéis deslizantes em trilho", "Bloqueio de 100% da luz", "Solução própria para vãos largos", "Produzido sob medida", "Visual clean e contemporâneo"]'::jsonb,
  '[]'::jsonb,
  ARRAY['painel blackout texturizado','painel-blackout','sob medida','ágil persianas'],
  'Painel Blackout Texturizado Sob Medida | Ágil Persianas',
  'Painel deslizante blackout para grandes vãos e portas de vidro. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Painel Tela Solar 1%
-- Preco/m2: 774.72  (referencia de mercado - CONFERIR)
-- 11 fotos em 5 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Painel Tela Solar 1%',
  'painel-tela-solar-1',
  (SELECT id FROM public.categories WHERE slug = 'painel-tela-solar-1' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 774.72, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/painel-tela-solar-1/bege/painel-tela-solar-1-bege-1.jpg',
  '[{"url": "/produtos/painel-tela-solar-1/bege/painel-tela-solar-1-bege-1.jpg", "color": "Bege", "caption": "Painel Tela Solar 1% — Bege"}, {"url": "/produtos/painel-tela-solar-1/bege/painel-tela-solar-1-bege-2.jpg", "color": "Bege", "caption": "Painel Tela Solar 1% — Bege"}, {"url": "/produtos/painel-tela-solar-1/branco/painel-tela-solar-1-branco-1.jpg", "color": "Branco", "caption": "Painel Tela Solar 1% — Branco"}, {"url": "/produtos/painel-tela-solar-1/branco/painel-tela-solar-1-branco-2.jpg", "color": "Branco", "caption": "Painel Tela Solar 1% — Branco"}, {"url": "/produtos/painel-tela-solar-1/cinza/painel-tela-solar-1-cinza-1.jpg", "color": "Cinza", "caption": "Painel Tela Solar 1% — Cinza"}, {"url": "/produtos/painel-tela-solar-1/cinza/painel-tela-solar-1-cinza-2.jpg", "color": "Cinza", "caption": "Painel Tela Solar 1% — Cinza"}, {"url": "/produtos/painel-tela-solar-1/cinza/painel-tela-solar-1-cinza-3.jpg", "color": "Cinza", "caption": "Painel Tela Solar 1% — Cinza"}, {"url": "/produtos/painel-tela-solar-1/light-green/painel-tela-solar-1-light-green-1.jpg", "color": "Light Green", "caption": "Painel Tela Solar 1% — Light Green"}, {"url": "/produtos/painel-tela-solar-1/light-green/painel-tela-solar-1-light-green-2.jpg", "color": "Light Green", "caption": "Painel Tela Solar 1% — Light Green"}, {"url": "/produtos/painel-tela-solar-1/preto/painel-tela-solar-1-preto-1.jpg", "color": "Preto", "caption": "Painel Tela Solar 1% — Preto"}, {"url": "/produtos/painel-tela-solar-1/preto/painel-tela-solar-1-preto-2.jpg", "color": "Preto", "caption": "Painel Tela Solar 1% — Preto"}]'::jsonb,
  'Painel deslizante em tela solar 1% para grandes vãos.',
  '<p>Painel deslizante em tela solar 1% para grandes vãos.</p><ul><li>Painéis deslizantes em trilho</li><li>Abertura de 1% — máxima proteção solar</li><li>Indicado para vãos largos e portas de vidro</li><li>Produzido sob medida</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Bege", "hex": "#C2AE84"}, {"name": "Branco", "hex": "#E8E4D6"}, {"name": "Cinza", "hex": "#8C8C88"}, {"name": "Light Green", "hex": "#DDE0D8"}, {"name": "Preto", "hex": "#2A2D30"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Painéis deslizantes em trilho", "Abertura de 1% — máxima proteção solar", "Indicado para vãos largos e portas de vidro", "Produzido sob medida"]'::jsonb,
  '[]'::jsonb,
  ARRAY['painel tela solar 1%','painel-solar1','sob medida','ágil persianas'],
  'Painel Tela Solar 1% Sob Medida | Ágil Persianas',
  'Painel deslizante em tela solar 1% para grandes vãos. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Painel Tela Solar 3%
-- Preco/m2: 774.72  (referencia de mercado - CONFERIR)
-- 10 fotos em 5 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Painel Tela Solar 3%',
  'painel-tela-solar-3',
  (SELECT id FROM public.categories WHERE slug = 'painel-tela-solar-3' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 774.72, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/painel-tela-solar-3/bege/painel-tela-solar-3-bege-1.jpg',
  '[{"url": "/produtos/painel-tela-solar-3/bege/painel-tela-solar-3-bege-1.jpg", "color": "Bege", "caption": "Painel Tela Solar 3% — Bege"}, {"url": "/produtos/painel-tela-solar-3/bege/painel-tela-solar-3-bege-2.jpg", "color": "Bege", "caption": "Painel Tela Solar 3% — Bege"}, {"url": "/produtos/painel-tela-solar-3/branco/painel-tela-solar-3-branco-1.jpg", "color": "Branco", "caption": "Painel Tela Solar 3% — Branco"}, {"url": "/produtos/painel-tela-solar-3/branco/painel-tela-solar-3-branco-2.jpg", "color": "Branco", "caption": "Painel Tela Solar 3% — Branco"}, {"url": "/produtos/painel-tela-solar-3/cinza/painel-tela-solar-3-cinza-1.jpg", "color": "Cinza", "caption": "Painel Tela Solar 3% — Cinza"}, {"url": "/produtos/painel-tela-solar-3/cinza/painel-tela-solar-3-cinza-2.jpg", "color": "Cinza", "caption": "Painel Tela Solar 3% — Cinza"}, {"url": "/produtos/painel-tela-solar-3/light-green/painel-tela-solar-3-light-green-1.jpg", "color": "Light Green", "caption": "Painel Tela Solar 3% — Light Green"}, {"url": "/produtos/painel-tela-solar-3/light-green/painel-tela-solar-3-light-green-2.jpg", "color": "Light Green", "caption": "Painel Tela Solar 3% — Light Green"}, {"url": "/produtos/painel-tela-solar-3/preto/painel-tela-solar-3-preto-1.jpg", "color": "Preto", "caption": "Painel Tela Solar 3% — Preto"}, {"url": "/produtos/painel-tela-solar-3/preto/painel-tela-solar-3-preto-2.jpg", "color": "Preto", "caption": "Painel Tela Solar 3% — Preto"}]'::jsonb,
  'Painel deslizante em tela solar 3% para grandes vãos.',
  '<p>Painel deslizante em tela solar 3% para grandes vãos.</p><ul><li>Painéis deslizantes em trilho</li><li>Abertura de 3% — equilíbrio entre luz e proteção</li><li>Indicado para vãos largos e portas de vidro</li><li>Produzido sob medida</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Bege", "hex": "#C2AE84"}, {"name": "Branco", "hex": "#E8E4D6"}, {"name": "Cinza", "hex": "#8C8C88"}, {"name": "Light Green", "hex": "#DDE0D8"}, {"name": "Preto", "hex": "#2A2D30"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Painéis deslizantes em trilho", "Abertura de 3% — equilíbrio entre luz e proteção", "Indicado para vãos largos e portas de vidro", "Produzido sob medida"]'::jsonb,
  '[]'::jsonb,
  ARRAY['painel tela solar 3%','painel-solar3','sob medida','ágil persianas'],
  'Painel Tela Solar 3% Sob Medida | Ágil Persianas',
  'Painel deslizante em tela solar 3% para grandes vãos. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Painel Tela Solar 5%
-- Preco/m2: 774.72  (referencia de mercado - CONFERIR)
-- 10 fotos em 5 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Painel Tela Solar 5%',
  'painel-tela-solar-5',
  (SELECT id FROM public.categories WHERE slug = 'painel-tela-solar-5' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 774.72, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/painel-tela-solar-5/bege/painel-tela-solar-5-bege-1.jpg',
  '[{"url": "/produtos/painel-tela-solar-5/bege/painel-tela-solar-5-bege-1.jpg", "color": "Bege", "caption": "Painel Tela Solar 5% — Bege"}, {"url": "/produtos/painel-tela-solar-5/bege/painel-tela-solar-5-bege-2.jpg", "color": "Bege", "caption": "Painel Tela Solar 5% — Bege"}, {"url": "/produtos/painel-tela-solar-5/branco/painel-tela-solar-5-branco-1.jpg", "color": "Branco", "caption": "Painel Tela Solar 5% — Branco"}, {"url": "/produtos/painel-tela-solar-5/branco/painel-tela-solar-5-branco-2.jpg", "color": "Branco", "caption": "Painel Tela Solar 5% — Branco"}, {"url": "/produtos/painel-tela-solar-5/cinza/painel-tela-solar-5-cinza-1.jpg", "color": "Cinza", "caption": "Painel Tela Solar 5% — Cinza"}, {"url": "/produtos/painel-tela-solar-5/cinza/painel-tela-solar-5-cinza-2.jpg", "color": "Cinza", "caption": "Painel Tela Solar 5% — Cinza"}, {"url": "/produtos/painel-tela-solar-5/light-green/painel-tela-solar-5-light-green-1.jpg", "color": "Light Green", "caption": "Painel Tela Solar 5% — Light Green"}, {"url": "/produtos/painel-tela-solar-5/light-green/painel-tela-solar-5-light-green-2.jpg", "color": "Light Green", "caption": "Painel Tela Solar 5% — Light Green"}, {"url": "/produtos/painel-tela-solar-5/preto/painel-tela-solar-5-preto-1.jpg", "color": "Preto", "caption": "Painel Tela Solar 5% — Preto"}, {"url": "/produtos/painel-tela-solar-5/preto/painel-tela-solar-5-preto-2.jpg", "color": "Preto", "caption": "Painel Tela Solar 5% — Preto"}]'::jsonb,
  'Painel deslizante em tela solar 5% para grandes vãos.',
  '<p>Painel deslizante em tela solar 5% para grandes vãos.</p><ul><li>Painéis deslizantes em trilho</li><li>Abertura de 5% — mais luz natural</li><li>Indicado para vãos largos e portas de vidro</li><li>Produzido sob medida</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Bege", "hex": "#C2AE84"}, {"name": "Branco", "hex": "#E8E4D6"}, {"name": "Cinza", "hex": "#8C8C88"}, {"name": "Light Green", "hex": "#DDE0D8"}, {"name": "Preto", "hex": "#2A2D30"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Painéis deslizantes em trilho", "Abertura de 5% — mais luz natural", "Indicado para vãos largos e portas de vidro", "Produzido sob medida"]'::jsonb,
  '[]'::jsonb,
  ARRAY['painel tela solar 5%','painel-solar5','sob medida','ágil persianas'],
  'Painel Tela Solar 5% Sob Medida | Ágil Persianas',
  'Painel deslizante em tela solar 5% para grandes vãos. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Painel Translúcido
-- Preco/m2: 774.72  (referencia de mercado - CONFERIR)
-- 9 fotos em 4 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Painel Translúcido',
  'painel-translucido',
  (SELECT id FROM public.categories WHERE slug = 'painel-translucido' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 774.72, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/painel-translucido/bege/painel-translucido-bege-1.jpg',
  '[{"url": "/produtos/painel-translucido/bege/painel-translucido-bege-1.jpg", "color": "Bege", "caption": "Painel Translúcido — Bege"}, {"url": "/produtos/painel-translucido/bege/painel-translucido-bege-2.jpg", "color": "Bege", "caption": "Painel Translúcido — Bege"}, {"url": "/produtos/painel-translucido/branco/painel-translucido-branco-1.jpg", "color": "Branco", "caption": "Painel Translúcido — Branco"}, {"url": "/produtos/painel-translucido/branco/painel-translucido-branco-2.jpg", "color": "Branco", "caption": "Painel Translúcido — Branco"}, {"url": "/produtos/painel-translucido/cinza/painel-translucido-cinza-1.jpg", "color": "Cinza", "caption": "Painel Translúcido — Cinza"}, {"url": "/produtos/painel-translucido/cinza/painel-translucido-cinza-2.jpg", "color": "Cinza", "caption": "Painel Translúcido — Cinza"}, {"url": "/produtos/painel-translucido/cinza/painel-translucido-cinza-3.jpg", "color": "Cinza", "caption": "Painel Translúcido — Cinza"}, {"url": "/produtos/painel-translucido/light-green/painel-translucido-light-green-1.jpg", "color": "Light Green", "caption": "Painel Translúcido — Light Green"}, {"url": "/produtos/painel-translucido/light-green/painel-translucido-light-green-2.jpg", "color": "Light Green", "caption": "Painel Translúcido — Light Green"}]'::jsonb,
  'Painel deslizante translúcido: luz difusa e privacidade em grandes vãos.',
  '<p>Painel deslizante translúcido: luz difusa e privacidade em grandes vãos.</p><ul><li>Painéis deslizantes em trilho</li><li>Luz natural suavizada, sem escurecer</li><li>Privacidade durante o dia</li><li>Produzido sob medida</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Bege", "hex": "#D9D7CB"}, {"name": "Branco", "hex": "#F1F1F3"}, {"name": "Cinza", "hex": "#D1D2D4"}, {"name": "Light Green", "hex": "#E6E7E3"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Painéis deslizantes em trilho", "Luz natural suavizada, sem escurecer", "Privacidade durante o dia", "Produzido sob medida"]'::jsonb,
  '[]'::jsonb,
  ARRAY['painel translúcido','painel-translucido','sob medida','ágil persianas'],
  'Painel Translúcido Sob Medida | Ágil Persianas',
  'Painel deslizante translúcido: luz difusa e privacidade em grandes vãos. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Persiana Horizontal Alumínio 16mm
-- Preco/m2: 198.29  (referencia de mercado - CONFERIR)
-- 11 fotos em 4 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Persiana Horizontal Alumínio 16mm',
  'persiana-horizontal-aluminio-16mm',
  (SELECT id FROM public.categories WHERE slug = 'persiana-horizontal-aluminio-16mm' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 198.29, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/horizontal-aluminio-16mm/aluminio/horizontal-aluminio-16mm-aluminio-1.jpg',
  '[{"url": "/produtos/horizontal-aluminio-16mm/aluminio/horizontal-aluminio-16mm-aluminio-1.jpg", "color": "Aluminio", "caption": "Persiana Horizontal Alumínio 16mm — Aluminio"}, {"url": "/produtos/horizontal-aluminio-16mm/aluminio/horizontal-aluminio-16mm-aluminio-2.jpg", "color": "Aluminio", "caption": "Persiana Horizontal Alumínio 16mm — Aluminio"}, {"url": "/produtos/horizontal-aluminio-16mm/bege/horizontal-aluminio-16mm-bege-1.jpg", "color": "Bege", "caption": "Persiana Horizontal Alumínio 16mm — Bege"}, {"url": "/produtos/horizontal-aluminio-16mm/bege/horizontal-aluminio-16mm-bege-2.jpg", "color": "Bege", "caption": "Persiana Horizontal Alumínio 16mm — Bege"}, {"url": "/produtos/horizontal-aluminio-16mm/branco/horizontal-aluminio-16mm-branco-1.jpg", "color": "Branco", "caption": "Persiana Horizontal Alumínio 16mm — Branco"}, {"url": "/produtos/horizontal-aluminio-16mm/branco/horizontal-aluminio-16mm-branco-2.jpg", "color": "Branco", "caption": "Persiana Horizontal Alumínio 16mm — Branco"}, {"url": "/produtos/horizontal-aluminio-16mm/branco/horizontal-aluminio-16mm-branco-3.jpg", "color": "Branco", "caption": "Persiana Horizontal Alumínio 16mm — Branco"}, {"url": "/produtos/horizontal-aluminio-16mm/branco/horizontal-aluminio-16mm-branco-4.jpg", "color": "Branco", "caption": "Persiana Horizontal Alumínio 16mm — Branco"}, {"url": "/produtos/horizontal-aluminio-16mm/branco/horizontal-aluminio-16mm-branco-5.jpg", "color": "Branco", "caption": "Persiana Horizontal Alumínio 16mm — Branco"}, {"url": "/produtos/horizontal-aluminio-16mm/preto/horizontal-aluminio-16mm-preto-1.jpg", "color": "Preto", "caption": "Persiana Horizontal Alumínio 16mm — Preto"}, {"url": "/produtos/horizontal-aluminio-16mm/preto/horizontal-aluminio-16mm-preto-2.jpg", "color": "Preto", "caption": "Persiana Horizontal Alumínio 16mm — Preto"}]'::jsonb,
  'Lâminas de alumínio com ajuste preciso de luz e ventilação.',
  '<p>Lâminas de alumínio com ajuste preciso de luz e ventilação.</p><ul><li>Lâminas de alumínio com pintura eletrostática</li><li>Ajuste fino do ângulo das lâminas</li><li>Resistente a umidade — indicada para cozinha e banheiro</li><li>Fácil de limpar</li><li>Produzida sob medida</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Aluminio", "hex": "#CCCCCC"}, {"name": "Bege", "hex": "#D8CDBA"}, {"name": "Branco", "hex": "#EDEDEB"}, {"name": "Preto", "hex": "#232426"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Lâminas de alumínio com pintura eletrostática", "Ajuste fino do ângulo das lâminas", "Resistente a umidade — indicada para cozinha e banheiro", "Fácil de limpar", "Produzida sob medida"]'::jsonb,
  '[]'::jsonb,
  ARRAY['persiana horizontal alumínio 16mm','aluminio','sob medida','ágil persianas'],
  'Persiana Horizontal Alumínio 16mm Sob Medida | Ágil Persianas',
  'Lâminas de alumínio com ajuste preciso de luz e ventilação. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Persiana Horizontal Alumínio 25mm
-- Preco/m2: 198.29  (referencia de mercado - CONFERIR)
-- 8 fotos em 4 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Persiana Horizontal Alumínio 25mm',
  'persiana-horizontal-aluminio-25mm',
  (SELECT id FROM public.categories WHERE slug = 'persiana-horizontal-aluminio-25mm' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 198.29, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/horizontal-aluminio-25mm/aluminio/horizontal-aluminio-25mm-aluminio-1.jpg',
  '[{"url": "/produtos/horizontal-aluminio-25mm/aluminio/horizontal-aluminio-25mm-aluminio-1.jpg", "color": "Aluminio", "caption": "Persiana Horizontal Alumínio 25mm — Aluminio"}, {"url": "/produtos/horizontal-aluminio-25mm/aluminio/horizontal-aluminio-25mm-aluminio-2.jpg", "color": "Aluminio", "caption": "Persiana Horizontal Alumínio 25mm — Aluminio"}, {"url": "/produtos/horizontal-aluminio-25mm/bege/horizontal-aluminio-25mm-bege-1.jpg", "color": "Bege", "caption": "Persiana Horizontal Alumínio 25mm — Bege"}, {"url": "/produtos/horizontal-aluminio-25mm/bege/horizontal-aluminio-25mm-bege-2.jpg", "color": "Bege", "caption": "Persiana Horizontal Alumínio 25mm — Bege"}, {"url": "/produtos/horizontal-aluminio-25mm/branco/horizontal-aluminio-25mm-branco-1.jpg", "color": "Branco", "caption": "Persiana Horizontal Alumínio 25mm — Branco"}, {"url": "/produtos/horizontal-aluminio-25mm/branco/horizontal-aluminio-25mm-branco-2.jpg", "color": "Branco", "caption": "Persiana Horizontal Alumínio 25mm — Branco"}, {"url": "/produtos/horizontal-aluminio-25mm/preto/horizontal-aluminio-25mm-preto-1.jpg", "color": "Preto", "caption": "Persiana Horizontal Alumínio 25mm — Preto"}, {"url": "/produtos/horizontal-aluminio-25mm/preto/horizontal-aluminio-25mm-preto-2.jpg", "color": "Preto", "caption": "Persiana Horizontal Alumínio 25mm — Preto"}]'::jsonb,
  'Lâminas de alumínio com ajuste preciso de luz e ventilação.',
  '<p>Lâminas de alumínio com ajuste preciso de luz e ventilação.</p><ul><li>Lâminas de alumínio com pintura eletrostática</li><li>Ajuste fino do ângulo das lâminas</li><li>Resistente a umidade — indicada para cozinha e banheiro</li><li>Fácil de limpar</li><li>Produzida sob medida</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Aluminio", "hex": "#CCCCCC"}, {"name": "Bege", "hex": "#D8CDBA"}, {"name": "Branco", "hex": "#EDEDEB"}, {"name": "Preto", "hex": "#232426"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Lâminas de alumínio com pintura eletrostática", "Ajuste fino do ângulo das lâminas", "Resistente a umidade — indicada para cozinha e banheiro", "Fácil de limpar", "Produzida sob medida"]'::jsonb,
  '[]'::jsonb,
  ARRAY['persiana horizontal alumínio 25mm','aluminio','sob medida','ágil persianas'],
  'Persiana Horizontal Alumínio 25mm Sob Medida | Ágil Persianas',
  'Lâminas de alumínio com ajuste preciso de luz e ventilação. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Persiana Horizontal Alumínio 50mm
-- Preco/m2: 540.32  (referencia de mercado - CONFERIR)
-- 8 fotos em 4 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Persiana Horizontal Alumínio 50mm',
  'persiana-horizontal-aluminio-50mm',
  (SELECT id FROM public.categories WHERE slug = 'persiana-horizontal-aluminio-50mm' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 540.32, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/horizontal-aluminio-50mm/aluminio/horizontal-aluminio-50mm-aluminio-1.jpg',
  '[{"url": "/produtos/horizontal-aluminio-50mm/aluminio/horizontal-aluminio-50mm-aluminio-1.jpg", "color": "Aluminio", "caption": "Persiana Horizontal Alumínio 50mm — Aluminio"}, {"url": "/produtos/horizontal-aluminio-50mm/aluminio/horizontal-aluminio-50mm-aluminio-2.jpg", "color": "Aluminio", "caption": "Persiana Horizontal Alumínio 50mm — Aluminio"}, {"url": "/produtos/horizontal-aluminio-50mm/bege/horizontal-aluminio-50mm-bege-1.jpg", "color": "Bege", "caption": "Persiana Horizontal Alumínio 50mm — Bege"}, {"url": "/produtos/horizontal-aluminio-50mm/bege/horizontal-aluminio-50mm-bege-2.jpg", "color": "Bege", "caption": "Persiana Horizontal Alumínio 50mm — Bege"}, {"url": "/produtos/horizontal-aluminio-50mm/branco/horizontal-aluminio-50mm-branco-1.jpg", "color": "Branco", "caption": "Persiana Horizontal Alumínio 50mm — Branco"}, {"url": "/produtos/horizontal-aluminio-50mm/branco/horizontal-aluminio-50mm-branco-2.jpg", "color": "Branco", "caption": "Persiana Horizontal Alumínio 50mm — Branco"}, {"url": "/produtos/horizontal-aluminio-50mm/preto/horizontal-aluminio-50mm-preto-1.jpg", "color": "Preto", "caption": "Persiana Horizontal Alumínio 50mm — Preto"}, {"url": "/produtos/horizontal-aluminio-50mm/preto/horizontal-aluminio-50mm-preto-2.jpg", "color": "Preto", "caption": "Persiana Horizontal Alumínio 50mm — Preto"}]'::jsonb,
  'Lâminas de alumínio com ajuste preciso de luz e ventilação.',
  '<p>Lâminas de alumínio com ajuste preciso de luz e ventilação.</p><ul><li>Lâminas de alumínio com pintura eletrostática</li><li>Ajuste fino do ângulo das lâminas</li><li>Resistente a umidade — indicada para cozinha e banheiro</li><li>Fácil de limpar</li><li>Produzida sob medida</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Aluminio", "hex": "#CCCCCC"}, {"name": "Bege", "hex": "#D8CDBA"}, {"name": "Branco", "hex": "#EDEDEB"}, {"name": "Preto", "hex": "#232426"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Lâminas de alumínio com pintura eletrostática", "Ajuste fino do ângulo das lâminas", "Resistente a umidade — indicada para cozinha e banheiro", "Fácil de limpar", "Produzida sob medida"]'::jsonb,
  '[]'::jsonb,
  ARRAY['persiana horizontal alumínio 50mm','aluminio','sob medida','ágil persianas'],
  'Persiana Horizontal Alumínio 50mm Sob Medida | Ágil Persianas',
  'Lâminas de alumínio com ajuste preciso de luz e ventilação. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Persiana Horizontal PVC 50mm
-- Preco/m2: 0  (SEM referencia de mercado - DEFINIR)
-- 9 fotos em 4 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Persiana Horizontal PVC 50mm',
  'persiana-horizontal-pvc-50mm',
  (SELECT id FROM public.categories WHERE slug = 'persiana-horizontal-pvc-50mm' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 0, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/horizontal-pvc-50mm/bege/horizontal-pvc-50mm-bege-1.jpg',
  '[{"url": "/produtos/horizontal-pvc-50mm/bege/horizontal-pvc-50mm-bege-1.jpg", "color": "Bege", "caption": "Persiana Horizontal PVC 50mm — Bege"}, {"url": "/produtos/horizontal-pvc-50mm/bege/horizontal-pvc-50mm-bege-2.jpg", "color": "Bege", "caption": "Persiana Horizontal PVC 50mm — Bege"}, {"url": "/produtos/horizontal-pvc-50mm/branco/horizontal-pvc-50mm-branco-1.jpg", "color": "Branco", "caption": "Persiana Horizontal PVC 50mm — Branco"}, {"url": "/produtos/horizontal-pvc-50mm/branco/horizontal-pvc-50mm-branco-2.jpg", "color": "Branco", "caption": "Persiana Horizontal PVC 50mm — Branco"}, {"url": "/produtos/horizontal-pvc-50mm/branco/horizontal-pvc-50mm-branco-3.jpg", "color": "Branco", "caption": "Persiana Horizontal PVC 50mm — Branco"}, {"url": "/produtos/horizontal-pvc-50mm/branco/horizontal-pvc-50mm-branco-4.jpg", "color": "Branco", "caption": "Persiana Horizontal PVC 50mm — Branco"}, {"url": "/produtos/horizontal-pvc-50mm/cinza/horizontal-pvc-50mm-cinza-1.jpg", "color": "Cinza", "caption": "Persiana Horizontal PVC 50mm — Cinza"}, {"url": "/produtos/horizontal-pvc-50mm/preto/horizontal-pvc-50mm-preto-1.jpg", "color": "Preto", "caption": "Persiana Horizontal PVC 50mm — Preto"}, {"url": "/produtos/horizontal-pvc-50mm/preto/horizontal-pvc-50mm-preto-2.jpg", "color": "Preto", "caption": "Persiana Horizontal PVC 50mm — Preto"}]'::jsonb,
  'Lâminas de PVC de 50mm: resistente à umidade e fácil de limpar.',
  '<p>Lâminas de PVC de 50mm: resistente à umidade e fácil de limpar.</p><ul><li>Lâminas de PVC 50mm</li><li>Alta resistência à umidade e à gordura</li><li>Indicada para cozinha, banheiro e área de serviço</li><li>Limpeza com pano úmido</li><li>Produzida sob medida</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Bege", "hex": "#DCD2BF"}, {"name": "Branco", "hex": "#EFEFED"}, {"name": "Cinza", "hex": "#B4B7BA"}, {"name": "Preto", "hex": "#232426"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Lâminas de PVC 50mm", "Alta resistência à umidade e à gordura", "Indicada para cozinha, banheiro e área de serviço", "Limpeza com pano úmido", "Produzida sob medida"]'::jsonb,
  '[]'::jsonb,
  ARRAY['persiana horizontal pvc 50mm','pvc','sob medida','ágil persianas'],
  'Persiana Horizontal PVC 50mm Sob Medida | Ágil Persianas',
  'Lâminas de PVC de 50mm: resistente à umidade e fácil de limpar. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Persiana Horizontal Madeira Sintética 50mm
-- Preco/m2: 973.51  (referencia de mercado - CONFERIR)
-- 2 fotos em 1 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Persiana Horizontal Madeira Sintética 50mm',
  'persiana-horizontal-madeira-sintetica-50mm',
  (SELECT id FROM public.categories WHERE slug = 'persiana-horizontal-madeira-sintetica-50mm' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 973.51, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/horizontal-madeira-sintetica-50mm/madeira/horizontal-madeira-sintetica-50mm-madeira-1.jpg',
  '[{"url": "/produtos/horizontal-madeira-sintetica-50mm/madeira/horizontal-madeira-sintetica-50mm-madeira-1.jpg", "color": "Madeira", "caption": "Persiana Horizontal Madeira Sintética 50mm — Madeira"}, {"url": "/produtos/horizontal-madeira-sintetica-50mm/madeira/horizontal-madeira-sintetica-50mm-madeira-2.jpg", "color": "Madeira", "caption": "Persiana Horizontal Madeira Sintética 50mm — Madeira"}]'::jsonb,
  'Madeira sintética 50mm: o visual da madeira com resistência à umidade.',
  '<p>Madeira sintética 50mm: o visual da madeira com resistência à umidade.</p><ul><li>Lâminas de 50mm em madeira sintética</li><li>Visual da madeira sem risco de empenar</li><li>Resistente à umidade</li><li>Indicada para sala, escritório e quarto</li><li>Produzida sob medida</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Madeira", "hex": "#9A6B43"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Lâminas de 50mm em madeira sintética", "Visual da madeira sem risco de empenar", "Resistente à umidade", "Indicada para sala, escritório e quarto", "Produzida sob medida"]'::jsonb,
  '[]'::jsonb,
  ARRAY['persiana horizontal madeira sintética 50mm','madeira','sob medida','ágil persianas'],
  'Persiana Horizontal Madeira Sintética 50mm Sob Medida | Ágil Persianas',
  'Madeira sintética 50mm: o visual da madeira com resistência à umidade. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------
-- Tela Mosquiteira Retrátil
-- Preco/m2: 345.94  (referencia de mercado - CONFERIR)
-- 20 fotos em 3 cores
-- ---------------------------------------------------------------
INSERT INTO public.products (
  name, slug, category_id, product_type, active, featured, bestseller,
  price, price_per_sqm, bando_price, motor_manual_price, motor_rf_price, motor_wifi_price,
  min_width_cm, max_width_cm, min_height_cm, max_height_cm, min_area,
  processing_days, stock, stock_min,
  weight_kg, package_width_cm, package_height_cm, package_length_cm,
  cover_image, gallery,
  short_description, description, installation,
  colors, specs, features, faq, tags,
  seo_title, seo_description,
  rating, reviews_count
) VALUES (
  'Tela Mosquiteira Retrátil',
  'tela-mosquiteira-retratil',
  (SELECT id FROM public.categories WHERE slug = 'tela-mosquiteira-retratil' LIMIT 1),
  'metro_quadrado',
  false,   -- INATIVO: ativar so depois de conferir o preco
  false,
  false,
  0, 345.94, 120.00, 0, 450.00, 690.00,
  40, 300, 40, 300, 1.8,
  12, 9999, 0,
  1.5, 15, 10, 30,
  '/produtos/tela-mosquiteira/branco/tela-mosquiteira-branco-1.jpg',
  '[{"url": "/produtos/tela-mosquiteira/branco/tela-mosquiteira-branco-1.jpg", "color": "Branco", "caption": "Tela Mosquiteira Retrátil — Branco"}, {"url": "/produtos/tela-mosquiteira/branco/tela-mosquiteira-branco-2.jpg", "color": "Branco", "caption": "Tela Mosquiteira Retrátil — Branco"}, {"url": "/produtos/tela-mosquiteira/branco/tela-mosquiteira-branco-3.jpg", "color": "Branco", "caption": "Tela Mosquiteira Retrátil — Branco"}, {"url": "/produtos/tela-mosquiteira/cinza/tela-mosquiteira-cinza-1.jpg", "color": "Cinza", "caption": "Tela Mosquiteira Retrátil — Cinza"}, {"url": "/produtos/tela-mosquiteira/cinza/tela-mosquiteira-cinza-2.jpg", "color": "Cinza", "caption": "Tela Mosquiteira Retrátil — Cinza"}, {"url": "/produtos/tela-mosquiteira/cinza/tela-mosquiteira-cinza-3.jpg", "color": "Cinza", "caption": "Tela Mosquiteira Retrátil — Cinza"}, {"url": "/produtos/tela-mosquiteira/cinza/tela-mosquiteira-cinza-4.jpg", "color": "Cinza", "caption": "Tela Mosquiteira Retrátil — Cinza"}, {"url": "/produtos/tela-mosquiteira/cinza/tela-mosquiteira-cinza-5.jpg", "color": "Cinza", "caption": "Tela Mosquiteira Retrátil — Cinza"}, {"url": "/produtos/tela-mosquiteira/cinza/tela-mosquiteira-cinza-6.jpg", "color": "Cinza", "caption": "Tela Mosquiteira Retrátil — Cinza"}, {"url": "/produtos/tela-mosquiteira/cinza/tela-mosquiteira-cinza-7.jpg", "color": "Cinza", "caption": "Tela Mosquiteira Retrátil — Cinza"}, {"url": "/produtos/tela-mosquiteira/preto/tela-mosquiteira-preto-1.jpg", "color": "Preto", "caption": "Tela Mosquiteira Retrátil — Preto"}, {"url": "/produtos/tela-mosquiteira/preto/tela-mosquiteira-preto-10.jpg", "color": "Preto", "caption": "Tela Mosquiteira Retrátil — Preto"}, {"url": "/produtos/tela-mosquiteira/preto/tela-mosquiteira-preto-2.jpg", "color": "Preto", "caption": "Tela Mosquiteira Retrátil — Preto"}, {"url": "/produtos/tela-mosquiteira/preto/tela-mosquiteira-preto-3.jpg", "color": "Preto", "caption": "Tela Mosquiteira Retrátil — Preto"}, {"url": "/produtos/tela-mosquiteira/preto/tela-mosquiteira-preto-4.jpg", "color": "Preto", "caption": "Tela Mosquiteira Retrátil — Preto"}, {"url": "/produtos/tela-mosquiteira/preto/tela-mosquiteira-preto-5.jpg", "color": "Preto", "caption": "Tela Mosquiteira Retrátil — Preto"}, {"url": "/produtos/tela-mosquiteira/preto/tela-mosquiteira-preto-6.jpg", "color": "Preto", "caption": "Tela Mosquiteira Retrátil — Preto"}, {"url": "/produtos/tela-mosquiteira/preto/tela-mosquiteira-preto-7.jpg", "color": "Preto", "caption": "Tela Mosquiteira Retrátil — Preto"}, {"url": "/produtos/tela-mosquiteira/preto/tela-mosquiteira-preto-8.jpg", "color": "Preto", "caption": "Tela Mosquiteira Retrátil — Preto"}, {"url": "/produtos/tela-mosquiteira/preto/tela-mosquiteira-preto-9.jpg", "color": "Preto", "caption": "Tela Mosquiteira Retrátil — Preto"}]'::jsonb,
  'Tela mosquiteira retrátil: proteção contra insetos sem abrir mão da ventilação.',
  '<p>Tela mosquiteira retrátil: proteção contra insetos sem abrir mão da ventilação.</p><ul><li>Recolhe quando não está em uso</li><li>Barreira contra mosquitos e insetos</li><li>Mantém a ventilação natural</li><li>Indicada para janelas e portas</li><li>Produzida sob medida</li></ul>',
  '<h3>Como instalar</h3><ol><li><strong>Escolha a fixação:</strong> suporte no teto ou na parede, incluso no kit.</li><li><strong>Marque os furos:</strong> use o gabarito incluso para alinhar os suportes.</li><li><strong>Fixe os suportes:</strong> parafuse com bucha (inclusa).</li><li><strong>Encaixe a peça:</strong> pressione lateralmente até travar.</li></ol>',
  '[{"name": "Branco", "hex": "#EFEFEF"}, {"name": "Cinza", "hex": "#9A9C9E"}, {"name": "Preto", "hex": "#26282A"}]'::jsonb,
  '[{"label": "Largura", "value": "40 cm a 300 cm"}, {"label": "Altura", "value": "40 cm a 300 cm"}, {"label": "Área mínima cobrada", "value": "1,8 m²"}, {"label": "Acionamento", "value": "Manual, motor RF ou Wi-Fi"}, {"label": "Prazo de fabricação", "value": "7 a 12 dias úteis"}, {"label": "Garantia", "value": "12 meses contra defeito de fabricação"}]'::jsonb,
  '["Recolhe quando não está em uso", "Barreira contra mosquitos e insetos", "Mantém a ventilação natural", "Indicada para janelas e portas", "Produzida sob medida"]'::jsonb,
  '[]'::jsonb,
  ARRAY['tela mosquiteira retrátil','tela','sob medida','ágil persianas'],
  'Tela Mosquiteira Retrátil Sob Medida | Ágil Persianas',
  'Tela mosquiteira retrátil: proteção contra insetos sem abrir mão da ventilação. Produção própria e envio para todo o Brasil.',
  4.8, 0
)
ON CONFLICT (slug) DO NOTHING;

-- Conferir o que entrou:
SELECT p.name, p.slug, p.active, p.price_per_sqm,
       jsonb_array_length(p.gallery) AS fotos,
       jsonb_array_length(p.colors)  AS cores,
       c.name AS categoria
FROM public.products p
LEFT JOIN public.categories c ON c.id = p.category_id
ORDER BY p.active, p.name;
