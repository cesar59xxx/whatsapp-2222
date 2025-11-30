# Solução Definitiva - WhatsApp CRM

## Resumo dos Problemas Encontrados

1. ✅ **Backend Railway está FUNCIONANDO** (logs mostram servidor rodando na porta 5000)
2. ❌ **Frontend não consegue se comunicar com backend** (nenhuma requisição chega)
3. ❌ **Erro "Invalid API key"** vem do Supabase (chave anon incorreta)
4. ❌ **Rotas 404** (páginas não existem ou links errados)
5. ❌ **WhatsApp Web.js não funciona** (precisa de Chromium no Railway)

## Solução Passo a Passo

### PASSO 1: Corrigir Variáveis de Ambiente da Vercel

Acesse: **Vercel Dashboard → Seu Projeto → Settings → Environment Variables**

Verifique se estas variáveis estão EXATAMENTE assim:

\`\`\`bash
# Supabase - COPIE NOVAMENTE do Supabase Dashboard
NEXT_PUBLIC_SUPABASE_URL=https://1dieqcofmincppqzownw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IjFkaWVxY29mbWluY3BwcXpvd253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5OTc5NjMsImV4cCI6MjA0ODU3Mzk2M30.lYJNXZwH5-9WG4HHLZohWQMQNF7EVABzj7zKWMpqR9Q

# Backend Railway
NEXT_PUBLIC_API_URL=https://whatsapp-api-web-oi-production.up.railway.app

# Supabase Service Role (para Server Actions)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IjFkaWVxY29mbWluY3BwcXpvd253Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjk5Nzk2MywiZXhwIjoyMDQ4NTczOTYzfQ.yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9CM4TakEhpZbgBef5_Hg
\`\`\`

**IMPORTANTE:** 
- Vá em https://supabase.com/dashboard/project/1dieqcofmincppqzownw/settings/api
- Copie a chave "anon public" (NÃO a service_role)
- Cole em NEXT_PUBLIC_SUPABASE_ANON_KEY
- Após alterar, faça REDEPLOY

### PASSO 2: Verificar Supabase Dashboard

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto: "1dieqcofmincppqzownw"
3. Verifique se o projeto está ATIVO (não pausado)
4. Vá em Settings → API
5. Confirme que a chave ANON começa com "eyJhbGc" e tem "role":"anon"

### PASSO 3: Adicionar Variável no Railway

Acesse: **Railway Dashboard → whatsapp-api-web-oi → Variables**

Adicione esta variável se não existir:

\`\`\`bash
FRONTEND_URL=https://whatsapp-api-web-oi.vercel.app
\`\`\`

Isso permite que o Railway aceite requisições da Vercel (CORS).

### PASSO 4: Instalar Chromium no Railway

O WhatsApp Web.js precisa do Chromium para funcionar. Crie este arquivo:

**Arquivo: `nixpacks.toml`** (já existe no projeto)

\`\`\`toml
[phases.setup]
nixPkgs = ['nodejs-18_x', 'chromium']

[phases.install]
cmds = ['npm ci --production']

[phases.build]
cmds = ['echo "Build completed"']

[start]
cmd = 'node server/index.js'
\`\`\`

Depois faça commit e push para o Railway redescarregar.

### PASSO 5: Testar Conectividade

1. Acesse: https://whatsapp-api-web-oi.vercel.app/diagnostics
2. Abra o Console (F12 ou Cmd+Option+I)
3. Veja os logs que começam com **[v0]**
4. Todos os testes devem estar em VERDE

Se algum teste falhar:
- ❌ **Backend não responde**: Railway pode estar offline, verifique logs
- ❌ **CORS error**: Adicione FRONTEND_URL no Railway
- ❌ **Invalid API key**: Chave Supabase está errada, refaça PASSO 1

### PASSO 6: Criar Conta de Teste

1. Acesse: https://whatsapp-api-web-oi.vercel.app/sign-up
2. Preencha o formulário
3. Abra Console (F12) e veja logs [v0]
4. Se der erro, copie TODA a mensagem de erro e me envie

### PASSO 7: Verificar Autenticação

Após criar conta:
- Você deve ser redirecionado para `/sign-up-success`
- Verifique seu email (pode estar no spam)
- Confirme o email clicando no link
- Faça login em `/login`

## Arquitetura do Sistema

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Vercel)                        │
│  - Next.js App Router                                       │
│  - Autenticação: Supabase Auth                              │
│  - UI: React + shadcn/ui                                    │
│  - Deploy: Automático via GitHub                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTPS
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                 BACKEND API (Railway)                       │
│  - Express.js + Socket.io                                   │
│  - WhatsApp Web.js (com Chromium)                           │
│  - Autenticação: JWT + Redis                                │
│  - Porta: 5000                                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   DATABASE (Supabase)                       │
│  - PostgreSQL                                               │
│  - Auth integrado                                           │
│  - Realtime subscriptions                                   │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Fluxo de Autenticação CORRETO

1. **Usuário cria conta** → Supabase Auth cria usuário
2. **Email de confirmação** → Usuário confirma
3. **Login** → Supabase retorna token JWT
4. **Token é salvo** → localStorage.setItem('token')
5. **Requisições ao backend** → Headers: { Authorization: Bearer <token> }
6. **Backend valida** → Verifica token e libera acesso

## Problemas Conhecidos e Soluções

### "Invalid API key"
**Causa:** Chave ANON do Supabase incorreta
**Solução:** Refazer PASSO 1 e 2

### "Failed to fetch"
**Causa:** Backend offline ou URL incorreta
**Solução:** Verificar Railway logs e NEXT_PUBLIC_API_URL

### QR Code não aparece
**Causa:** Chromium não instalado no Railway
**Solução:** Adicionar nixpacks.toml (PASSO 4)

### Rotas 404
**Causa:** Links quebrados ou páginas não criadas
**Solução:** Use diagnóstico para identificar quais rotas estão faltando

## Próximos Passos Após Correção

1. ✅ Criar conta e confirmar email
2. ✅ Fazer login
3. ✅ Acessar dashboard
4. ✅ Criar sessão WhatsApp
5. ✅ Escanear QR Code
6. ✅ Conectar WhatsApp
7. ✅ Enviar primeira mensagem

## Comandos Úteis

### Ver logs do Railway
\`\`\`bash
railway logs
\`\`\`

### Redeploy forçado na Vercel
\`\`\`bash
vercel --prod --force
\`\`\`

### Testar backend localmente
\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

## Checklist Final

- [ ] Variáveis de ambiente corretas na Vercel
- [ ] Projeto Supabase ativo
- [ ] Railway rodando sem erros
- [ ] CORS configurado (FRONTEND_URL)
- [ ] Chromium instalado (nixpacks.toml)
- [ ] Página /diagnostics mostra tudo verde
- [ ] Consegue criar conta
- [ ] Consegue fazer login
- [ ] Dashboard carrega
- [ ] WhatsApp funciona

## Suporte

Se mesmo após seguir todos os passos ainda houver erros:

1. Acesse /diagnostics
2. Abra Console (F12)
3. Copie TODOS os logs que começam com [v0]
4. Tire screenshot da página
5. Me envie para análise detalhada
\`\`\`

```typescript file="" isHidden
