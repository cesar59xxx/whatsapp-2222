# Deploy Simples - Backend Funcional

## O QUE FOI FEITO

Criei um backend MÍNIMO e 100% FUNCIONAL que:
- ✅ Responde ao healthcheck do Railway
- ✅ Aceita requisições do frontend
- ✅ NÃO tem autenticação (por enquanto)
- ✅ NÃO usa WhatsApp ainda (por enquanto)
- ✅ Apenas prova que frontend e backend se comunicam

## VARIÁVEIS RAILWAY (MÍNIMAS)

Apenas 2 variáveis necessárias:

\`\`\`bash
PORT=5000
FRONTEND_URL=https://whatsapp-2222.vercel.app
\`\`\`

## VARIÁVEIS VERCEL (MÍNIMAS)

Apenas 1 variável necessária:

\`\`\`bash
NEXT_PUBLIC_API_URL=https://seu-projeto.up.railway.app
\`\`\`

## PASSO A PASSO

### 1. Limpar Variáveis do Railway
- Remova TODAS as variáveis antigas
- Adicione APENAS:
  - `PORT` = `5000`
  - `FRONTEND_URL` = `https://whatsapp-2222.vercel.app`

### 2. Fazer Redeploy no Railway
- Commit e push para GitHub
- Ou redeploy manual no Railway
- **DEVE FUNCIONAR AGORA**

### 3. Configurar Vercel
- Vá em Settings → Environment Variables
- Adicione: `NEXT_PUBLIC_API_URL` = `https://whatsapp-2222-production.up.railway.app`
  (substitua pela URL real do Railway)
- Redeploy na Vercel

### 4. Testar
1. Acesse: `https://whatsapp-2222-production.up.railway.app/health`
   - Deve mostrar: `{"status":"ok"}`
   
2. Acesse seu site na Vercel
   - Vá em /whatsapp
   - Tente criar uma sessão
   - Deve mostrar: "Backend respondendo - WhatsApp em desenvolvimento"

## PRÓXIMOS PASSOS (DEPOIS QUE FUNCIONAR)

1. ✅ Adicionar Supabase para armazenar sessões
2. ✅ Adicionar WhatsApp-Web.js
3. ✅ Adicionar autenticação
4. ✅ Adicionar multi-tenancy

## TROUBLESHOOTING

### Railway ainda falha no healthcheck?
- Verifique os logs: deve mostrar "✅ Servidor FUNCIONANDO!"
- Se não aparecer, o problema é na instalação de pacotes

### Frontend ainda dá erro "Failed to fetch"?
- Abra o console (F12)
- Procure por: `[v0] Backend URL:`
- Verifique se a URL está correta
- Se estiver "undefined", a variável `NEXT_PUBLIC_API_URL` não foi configurada

### Railway mostra "Cannot find package"?
- O novo Dockerfile usa `npm install` SEM `--production`
- Isso garante que TODAS as dependências são instaladas
