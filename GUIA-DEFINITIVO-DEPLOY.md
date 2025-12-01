# Guia Definitivo de Deploy - WhatsApp CRM SaaS

## Problema Resolvido

O deploy estava falhando porque:
1. ❌ Código usava Mongoose Models que não existiam
2. ❌ Autenticação obrigatória bloqueava todas as rotas
3. ❌ Dependências faltando no package.json
4. ❌ Dockerfile com configuração incorreta do Chrome

## Solução Implementada

✅ **Backend COMPLETAMENTE RECONSTRUÍDO**
- Removido Mongoose, usando apenas Supabase
- Removida autenticação obrigatória (MVP funcional)
- Todas as dependências adicionadas corretamente
- Dockerfile otimizado com Google Chrome

---

## Passo 1: Configurar Supabase

### 1.1 Executar SQL no Supabase

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Cole e execute o SQL de `scripts/001-create-whatsapp-sessions-table.sql`

### 1.2 Obter credenciais

No Supabase Dashboard → Settings → API:
- `SUPABASE_URL`: sua URL do projeto
- `SUPABASE_SERVICE_ROLE_KEY`: a chave **service_role** (NÃO a anon)

---

## Passo 2: Configurar Railway

### 2.1 Variáveis de Ambiente no Railway

Vá em Settings → Variables e adicione:

\`\`\`bash
# Porta (Railway define automaticamente)
PORT=5000

# Supabase
SUPABASE_URL=https://SEU_PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui

# Sessões WhatsApp
SESSIONS_PATH=/app/whatsapp-sessions

# Puppeteer/Chrome
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Frontend URL (sua URL da Vercel)
FRONTEND_URL=https://whatsapp-2222.vercel.app

# Node Environment
NODE_ENV=production
\`\`\`

### 2.2 Fazer Deploy

1. Conecte o repositório GitHub no Railway
2. Railway detectará o `railway.json` e `Dockerfile.backend`
3. Deploy iniciará automaticamente

### 2.3 Verificar Deploy

Após o deploy, teste:
\`\`\`bash
curl https://SEU_APP.up.railway.app/health
\`\`\`

Deve retornar:
\`\`\`json
{
  "status": "ok",
  "timestamp": "...",
  "uptime": 123
}
\`\`\`

---

## Passo 3: Configurar Vercel

### 3.1 Variáveis de Ambiente na Vercel

Settings → Environment Variables:

\`\`\`bash
# URL do Backend Railway
NEXT_PUBLIC_API_URL=https://SEU_APP.up.railway.app

# Supabase (para autenticação frontend)
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
\`\`\`

**IMPORTANTE:** Use a **ANON KEY** (não service_role) no frontend!

### 3.2 Redeploy

Após adicionar variáveis, faça redeploy na Vercel.

---

## Passo 4: Testar a Integração

### 4.1 Teste o Backend

\`\`\`bash
# Verificar saúde
curl https://SEU_APP.up.railway.app/health

# Listar sessões
curl https://SEU_APP.up.railway.app/api/whatsapp/sessions

# Criar sessão de teste
curl -X POST https://SEU_APP.up.railway.app/api/whatsapp/sessions \
  -H "Content-Type: application/json" \
  -d '{"name": "Teste"}'
\`\`\`

### 4.2 Teste o Frontend

1. Acesse: `https://whatsapp-2222.vercel.app/whatsapp`
2. Clique em "Nova Sessão"
3. Dê um nome e crie
4. Clique em "Conectar" para gerar QR Code

---

## Estrutura de Tabelas Supabase

### whatsapp_sessions
\`\`\`sql
- id: UUID (PK)
- session_id: TEXT (UNIQUE)
- name: TEXT
- status: TEXT (disconnected | qr | authenticated | ready | error)
- phone_number: TEXT
- qr_code: TEXT (base64)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
\`\`\`

---

## Troubleshooting

### Erro: "Cannot find package 'jsonwebtoken'"
✅ **RESOLVIDO** - package.json atualizado com todas as dependências

### Erro: "Healthcheck failure"
✅ **RESOLVIDO** - Dockerfile otimizado com start-period de 120s

### Erro: "Invalid API key"
- Verifique se está usando ANON KEY no frontend (NEXT_PUBLIC_SUPABASE_ANON_KEY)
- SERVICE_ROLE_KEY apenas no backend

### QR Code não aparece
1. Verifique logs do Railway
2. Confirme que PUPPETEER_EXECUTABLE_PATH está configurado
3. Aguarde até 2 minutos na primeira conexão

---

## Próximos Passos (Após Funcionar)

Depois que o MVP estiver funcionando, você pode adicionar:

1. ✨ Sistema de autenticação (JWT)
2. ✨ Multi-tenancy (vários usuários)
3. ✨ Chatbots com IA
4. ✨ Analytics e relatórios
5. ✨ Integração com CRM

---

## Comandos Úteis

### Ver logs do Railway
\`\`\`bash
railway logs
\`\`\`

### Ver logs da Vercel
Vá em Deployments → Selecione deployment → Runtime Logs

### Limpar sessões WhatsApp
\`\`\`bash
# No Railway, acesse o terminal e execute:
rm -rf /app/whatsapp-sessions/*
\`\`\`

---

## Suporte

Se ainda houver problemas:
1. Verifique os logs do Railway
2. Verifique os logs do console do navegador (F12)
3. Confirme que TODAS as variáveis estão configuradas
4. Teste o endpoint /health do backend

---

**Feito com ❤️ para funcionar!**
