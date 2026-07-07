## Objetivo

Confirmar que o backend (Lovable Cloud) está ativo e saudável, e que a conta `contatoagilpersianas@gmail.com` será promovida automaticamente a administrador ao se cadastrar em `/auth`.

## Contexto importante

Este projeto usa **Lovable Cloud** — backend gerenciado pela Lovable. Não há uma conta Supabase externa (em supabase.com) vinculada a um e-mail; o Cloud é provisionado pela Lovable e não requer login em painel de terceiros. O e-mail `contatoagilpersianas@gmail.com` não "possui" o banco — ele apenas será reconhecido como admin do painel do site quando se cadastrar.

## Verificações a executar (somente leitura, sem alterações)

1. **Status do Cloud** — rodar `supabase--cloud_status` para confirmar `ACTIVE_HEALTHY`.
2. **Trigger de admin** — confirmar via `supabase--read_query` que:
   - A função `public.auto_grant_owner_admin()` existe (já vista no contexto: promove `contatoagilpersianas@gmail.com` a `admin` no `INSERT`).
   - Existe um trigger em `auth.users` que dispara essa função em novo cadastro. Se não existir, sinalizar como próximo passo.
3. **Conta já cadastrada?** — verificar em `auth.users` se o e-mail já existe e, se sim, se já tem role `admin` em `public.user_roles`.

## Resultado esperado

Um relatório curto respondendo:
- Backend ativo? (sim/não)
- A conta `contatoagilpersianas@gmail.com` já existe? Já é admin?
- Se ainda não existe: instrução clara para acessar `/auth`, criar a conta, e confirmar que a promoção a admin acontece automaticamente.

## Fora do escopo

- Nenhuma migração, alteração de schema, política RLS ou código será modificada.
- Não haverá migração para uma conta Supabase própria (fora do Cloud).
