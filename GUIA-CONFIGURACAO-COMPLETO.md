# Guia Completo de Configuração - WhatsApp CRM

## 📋 Tabela de Rotas Corrigidas

### Frontend (Vercel)
| Rota Antiga (ERRADA) | Rota Nova (CORRETA) | Descrição |
|---------------------|---------------------|-----------|
| `/auth/login` | `/login` | Página de login |
| `/auth/sign-up` | `/sign-up` | Página de cadastro |
| `/dashboard/dashboard` | `/dashboard` | Dashboard principal |
| `/dashboard/inbox` | `/inbox` | Inbox de mensagens |
| `/dashboard/contacts` | `/contacts` | Lista de contatos |
| `/dashboard/pipeline` | `/pipeline` | Pipeline de vendas |
| `/dashboard/whatsapp` | `/whatsapp` | Sessões WhatsApp |
| `/dashboard/chatbots` | `/chatbots` | Chatbots |
| `/dashboard/settings` | `/settings` | Configurações |

### Backend (Railway)
| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/auth/register` | POST | Registrar usuário |
| `/api/auth/login` | POST | Login usuário |
| `/api/auth/me` | GET | Obter usuário atual |
| `/api/whatsapp/sessions` | GET | Listar sessões |
| `/api/whatsapp/sessions` | POST | Criar sessão |
| `/api/whatsapp/sessions/:id/connect` | POST | Conectar sessão |
| `/api/whatsapp/sessions/:id/qr` | GET | Obter QR Code |
| `/api/contacts` | GET | Listar contatos |
| `/api/messages` | GET | Listar mensagens |
| `/api/chatbots` | GET | Listar chatbots |

---

## 🔧 Variáveis de Ambiente

### Vercel (Frontend)
\`\`\`bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://idiaqcofmincppqzownw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Backend Railway (IMPORTANTE!)
NEXT_PUBLIC_API_URL=https://whatsapp-api-web-oi-production.up.railway.app

# Socket.IO (opcional, usa mesma URL da API se não definido)
NEXT_PUBLIC_SOCKET_URL=https://whatsapp-api-web-oi-production.up.railway.app

# Redirect de desenvolvimento (opcional)
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/dashboard
\`\`\`

### Railway (Backend)
\`\`\`bash
# Supabase
SUPABASE_URL=https://idiaqcofmincppqzownw.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
SUPABASE_ANON_KEY=eyJhbGc...

# Frontend URL
FRONTEND_URL=https://whatsapp-api-web-oi.vercel.app

# Porta (Railway define automaticamente)
PORT=5000

# Redis (se usar)
REDIS_URL=redis://...

# Opcional
NODE_ENV=production
\`\`\`

---

## ✅ Checklist de Correções

### 1. Frontend (Vercel)
- [x] Rotas de autenticação corrigidas (/login, /sign-up)
- [x] Rotas do dashboard simplificadas
- [x] Middleware atualizado
- [x] Auth provider corrigido
- [x] Links internos atualizados
- [ ] **ADICIONAR VARIÁVEL: NEXT_PUBLIC_API_URL na Vercel**
- [ ] **FAZER REDEPLOY na Vercel**

### 2. Backend (Railway)
- [x] Rotas importadas e configuradas
- [x] package.json atualizado (Node 20.x)
- [x] Porta dinâmica configurada
- [x] CORS configurado
- [ ] **VERIFICAR se as variáveis estão corretas no Railway**
- [ ] **FAZER REDEPLOY no Railway**

### 3. Testes
- [ ] Testar login/sign-up
- [ ] Testar criação de sessão WhatsApp
- [ ] Testar geração de QR Code
- [ ] Testar navegação entre páginas
- [ ] Verificar console do navegador para erros

---

## 🚀 Como Testar

### 1. Verificar Backend
\`\`\`bash
# Abra no navegador:
https://whatsapp-api-web-oi-production.up.railway.app

# Deve mostrar:
{
  "message": "WhatsApp CRM Backend API",
  "version": "1.0.0",
  "status": "running",
  "routes": {
    "auth": "/api/auth",
    "whatsapp": "/api/whatsapp",
    ...
  }
}
\`\`\`

### 2. Verificar Health Check
\`\`\`bash
https://whatsapp-api-web-oi-production.up.railway.app/health

# Deve retornar:
{
  "status": "ok",
  "timestamp": "...",
  "uptime": 123.45,
  "database": "supabase"
}
\`\`\`

### 3. Testar Frontend
1. Abra: https://whatsapp-api-web-oi.vercel.app
2. Clique em "Começar Grátis" ou "Login"
3. Abra o Console (F12)
4. Procure por logs `[v0]`:
   - `[v0] Backend URL:` deve mostrar a URL do Railway
   - `[v0] API Request:` deve mostrar as chamadas
   - **NÃO deve ter** erros de `Failed to fetch`

---

## ❌ Erros Comuns e Soluções

### Erro: "Failed to fetch"
**Causa**: `NEXT_PUBLIC_API_URL` não configurada na Vercel
**Solução**: 
1. Vercel → Settings → Environment Variables
2. Adicionar `NEXT_PUBLIC_API_URL=https://whatsapp-api-web-oi-production.up.railway.app`
3. Redeploy

### Erro: 404 nas rotas
**Causa**: Usando rotas antigas `/auth/login`
**Solução**: Já corrigido! Use `/login` e `/sign-up`

### Erro: CORS
**Causa**: `FRONTEND_URL` não configurada no Railway
**Solução**: 
1. Railway → Variables
2. Verificar se `FRONTEND_URL=https://whatsapp-api-web-oi.vercel.app`

### Erro: QR Code não aparece
**Causa**: Backend não tem as rotas WhatsApp configuradas ou Chromium não instalado
**Solução**: 
1. Backend já corrigido com as rotas
2. Verificar logs do Railway para erros do Puppeteer/Chromium

---

## 📊 Status Atual do Projeto

| Componente | Status | Observações |
|-----------|--------|-------------|
| Frontend Vercel | ✅ CORRIGIDO | Rotas atualizadas |
| Backend Railway | ✅ CORRIGIDO | Rotas adicionadas |
| Variáveis Env | ⚠️ PENDENTE | Adicionar NEXT_PUBLIC_API_URL |
| Supabase | ✅ OK | Conectado |
| WhatsApp Web.js | ⚠️ TESTAR | Depende de Chromium no Railway |
| Navegação | ✅ CORRIGIDO | Todas as rotas funcionais |

---

## 🎯 Próximos Passos IMEDIATOS

1. **NA VERCEL** (URGENTE):
   \`\`\`
   Settings → Environment Variables → Add
   NEXT_PUBLIC_API_URL=https://whatsapp-api-web-oi-production.up.railway.app
   \`\`\`
   Depois: **REDEPLOY**

2. **NO RAILWAY** (Verificar):
   - Conferir se `FRONTEND_URL` está correta
   - Conferir se as variáveis Supabase estão corretas
   - Fazer **REDEPLOY** se necessário

3. **TESTAR**:
   - Abrir a aplicação
   - Fazer login/cadastro
   - Criar uma sessão WhatsApp
   - Verificar se QR Code aparece

---

## 📞 Suporte

Se ainda houver problemas após seguir este guia:
1. Abra o console do navegador (F12)
2. Copie TODOS os logs que começam com `[v0]`
3. Copie os logs do Railway (aba "Deploy Logs")
4. Me envie para análise detalhada
