# Popular o menu com as categorias do site de referência

A tabela `categories` está vazia, por isso o mega menu (CategoryNav) e a grid de categorias da home aparecem sem itens. Vou inserir toda a árvore de categorias baseada no menu de https://agilcortinasepersianas.com.br/loja/, mantendo os slugs iguais aos do site original (facilita SEO e redirects futuros).

## Árvore que será inserida

Todas as raízes ficam com `show_in_menu = true`, `active = true` e `position` sequencial na ordem abaixo. Subcategorias também ficam visíveis no menu (o CategoryNav agrupa por raiz automaticamente).

1. **Rolô** (`rolo`)
   - Cortina Rolô Blackout (`cortina-rolo-blackout`)
   - Cortina Rolô Blackout Tecido Liso (`cortina-rolo-blackout-tecido-liso`)
   - Cortina Rolô Blackout Texturizado (`cortina-rolo-blackout-texturizado`)
   - Cortina Rolô Blackout Vedação Total (`cortina-rolo-blackout-vedacao-total`)
   - Cortina Rolô Tela Solar (`cortina-rolo-tela-solar`)
   - Cortina Rolô Tela Solar 1% (`cortina-rolo-tela-solar-1`)
   - Cortina Rolô Tela Solar 3% (`cortina-rolo-tela-solar-3`)
   - Cortina Rolô Tela Solar 5% (`cortina-rolo-tela-solar-5`)
   - Cortina Rolô Translúcida (`cortina-rolo-translucida`)

2. **Romana** (`romana`)
   - Cortina Romana Blackout (`cortina-romana-blackout`)
   - Romana Blackout Tecido Liso (`romana-blackout-tecido-liso`)
   - Romana Blackout Texturizado (`romana-blackout-texturizado`)
   - Romana Tela Solar (`romana-tela-solar`)
   - Cortina Romana Tela Solar 1% (`cortina-romana-tela-solar-1`)
   - Cortina Romana Tela Solar 3% (`cortina-romana-tela-solar-3`)
   - Cortina Romana Tela Solar 5% (`cortina-romana-tela-solar-5`)
   - Cortina Romana Translúcida (`cortina-romana-translucida-1`)

3. **Double Vision** (`double-vision`)
   - Cortina Double Vision Semi Blackout (`cortina-double-vision-semi-blackout`)
   - Cortina Double Vision Translúcida (`cortina-double-vision-translucida`)

4. **Painel** (`painel`)
   - Painel Blackout (`painel-blackout`)
   - Painel Blackout Tecido Liso (`painel-blackout-tecido-liso`)
   - Painel Blackout Texturizado (`painel-blackout-texturizado`)
   - Painel Tela Solar (`painel-tela-solar`)
   - Painel Tela Solar 1% (`painel-tela-solar-1`)
   - Painel Tela Solar 3% (`painel-tela-solar-3`)
   - Painel Tela Solar 5% (`painel-tela-solar-5`)
   - Painel Translúcido (`painel-translucido`)

5. **Horizontal** (`horizontal`)
   - Persiana Horizontal Alumínio (`persiana-horizontal-aluminio`)
   - Persiana Horizontal Alumínio 16mm (`persiana-horizontal-aluminio-16mm`)
   - Persiana Horizontal Alumínio 25mm (`persiana-horizontal-aluminio-25mm`)
   - Persiana Horizontal Alumínio 50mm (`persiana-horizontal-aluminio-50mm`)
   - Persiana Horizontal Madeira Sintética 50mm (`persiana-horizontal-madeira-sintetica-50mm`)
   - Persiana Horizontal PVC 50mm (`persiana-horizontal-pvc-50mm`)

6. **Tela Mosquiteira** (`tela-mosquiteira`)
   - Tela Mosquiteira Fixa (`tela-mosquiteira-fixa`)
   - Tela Mosquiteira Fixa Perfil U (`tela-mosquiteira-fixa-perfil-u`)
   - Tela Mosquiteira Fixa Tramela Trava (`tela-mosquiteira-fixa-tramela-trava`)
   - Tela Mosquiteira Retrátil (`tela-mosquiteira-retratil`)

7. **Toldos** (`toldos`)
   - Toldo Retrátil Articulado (`toldo-retratil-articulados`)
   - Toldo Vertical (`toldo-vertical`)

8. **Ambientes** (`ambientes`)
   - Quarto (`quarto`)
   - Sala (`sala`)
   - Escritório (`escritorio`)
   - Cozinha (`cozinha`)
   - Banheiro (`banheiro`)
   - Área Externa (`area-externa`)

9. **Ofertas** (`ofertas`) — raiz sem subcategorias (aparece como link direto no menu)

## Como será feito

- Uma única migração SQL insere as 9 raízes e todas as subcategorias, usando `INSERT ... ON CONFLICT (slug) DO UPDATE` para ser idempotente (não duplica se você rodar de novo).
- `position` é atribuído na ordem listada acima, para as raízes e para cada grupo de filhos.
- Nenhum ícone é definido (o menu não exibe ícones nas raízes atualmente); podem ser adicionados depois pelo admin `/admin/categorias`.
- Não mexo nos componentes (`CategoryNav`, `Categories`, `RoomsSection`): eles já leem `categories` do banco e aparecerão automaticamente após o seed.
- Nota: o card estático da home "Automação" continua exibido só no componente `Categories.tsx` (não é categoria de menu no site de referência), então segue como está.

## Detalhes técnicos

- Migração via ferramenta de migrations do Lovable Cloud.
- Cada linha: `(id gen_random_uuid(), name, slug, parent_id, position, show_in_menu=true, active=true)`.
- Subcategorias referenciam `parent_id` via subquery `(SELECT id FROM categories WHERE slug = 'rolo')` etc., executadas depois das raízes na mesma transação.
- `ON CONFLICT (slug)` protege re-execuções: atualiza `name`, `parent_id`, `position`, `show_in_menu`, `active`.
