## Cadastrar produto: Cortina Rolô Blackout Tecido Liso Branca Sob Medida

Vou seguir o mesmo padrão usado no produto "Texturizado" (1 produto único com múltiplas cores como variantes).

### Ativos a preparar
1. **Foto de capa** — usar `user-uploads://Blackout_Tecido_Liso_branca.png` (persiana branca instalada), publicada como asset CDN.
2. **Amostras de cor** — recortar `Blackout-Liso_cores.png` em 4 faixas (Branco, Bege, Marron, Preto) e publicar cada swatch.
3. **Fotos de ambiente** — gerar 2 imagens lifestyle por cor (8 no total) com IA, seguindo o padrão do Texturizado (salas/quartos modernos com a persiana instalada).

### Cadastro no banco (via `supabase--insert`)
Inserir 1 linha em `public.products` com:
- `name`: "Cortina Rolô Blackout Tecido Liso Branca Sob Medida"
- `slug`: `cortina-rolo-blackout-tecido-liso-branca-sob-medida`
- `category_id`: `946345c9-680f-4b3b-b481-7ba30ed30d2b` (Cortina Rolô Blackout - Tecido Liso)
- `product_type`: `metro_quadrado`
- `price_per_sqm`: R$ 259,00/m² (levemente abaixo do Texturizado; confirmar preço no próximo passo se preferir outro)
- `cover_image`: foto da persiana branca
- `colors`: 4 variantes (Branco `#EDEDEB`, Bege `#C8B79A`, Marron `#6E5D50`, Preto `#1A1A1A`) — cada uma com URL da amostra
- `gallery`: capa + 8 lifestyle + 4 amostras, cada foto de ambiente marcada com a cor correspondente (mesmo formato do Texturizado, para o seletor de cor trocar a foto principal)
- `specs`, `features`, `faq`: reaproveitar o conteúdo do Texturizado adaptando a descrição para "tecido liso" (superfície uniforme, sem textura)
- Preços de motor/bandô: mesmos do Texturizado
- Faixas mín/máx de largura/altura: iguais ao Texturizado

### Ponto para confirmar antes de eu executar
- **Preço por m²**: posso usar R$ 259,00/m² ou você prefere outro valor? Se quiser igual ao Texturizado (R$ 279,00/m²), me diga.
