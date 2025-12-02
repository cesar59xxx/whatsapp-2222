# Como Executar os Scripts SQL no Supabase

## Passo 1: Acesse o SQL Editor do Supabase

1. Acesse: https://supabase.com/dashboard/project/_/sql/new
2. Ou vá em: **Seu Projeto > SQL Editor > New Query**

## Passo 2: Execute os Scripts na Ordem

Execute cada script abaixo **NA ORDEM**. Copie, cole e clique em RUN.

### Script 1: Criar Tenants e Users (Base do Sistema)

\`\`\`sql
-- Copie TUDO do arquivo: scripts/001_create_tenants_and_users.sql
-- Cole no SQL Editor e clique em RUN
\`\`\`

### Script 2: Criar WhatsApp Sessions

\`\`\`sql
-- Copie TUDO do arquivo: scripts/003_create_whatsapp_sessions.sql
-- Cole no SQL Editor e clique em RUN
\`\`\`

### Script 3: Criar Contacts e Messages

\`\`\`sql
-- Copie TUDO do arquivo: scripts/01-create-tables.sql
-- Cole no SQL Editor e clique em RUN
\`\`\`

## Passo 3: Verificar se Funcionou

Execute este comando para verificar:

\`\`\`sql
SELECT 
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'tenants') as tenants,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'users') as users,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'whatsapp_sessions') as sessions,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'contacts') as contacts,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'messages') as messages;
\`\`\`

Se retornar `1` em todas as colunas, está tudo certo!

## Passo 4: Configurar Variáveis no Railway

Depois de criar as tabelas, adicione estas variáveis no Railway:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://1dieqcofmincppqzownw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=(sua chave anon)
SUPABASE_SERVICE_ROLE_KEY=(sua chave service_role)
NODE_ENV=production
PORT=5000
FRONTEND_URL=novo-222.vercel.app
SESSIONS_PATH=/app/whatsapp-sessions
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
\`\`\`

## Passo 5: Fazer Deploy

Clique em "Publish" no v0 e aguarde o Railway fazer deploy (2-3 minutos).

Depois acesse: https://novo-222.vercel.app/whatsapp e crie uma sessão!
