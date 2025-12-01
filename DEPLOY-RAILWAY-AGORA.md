# Deploy Railway - Passo a Passo GARANTIDO

## Situação Atual
Backend simplificado SEM WhatsApp ainda - apenas para testar se o Railway funciona.

## Passo 1: Variáveis no Railway

Configure APENAS estas variáveis no Railway:

\`\`\`
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://whatsapp-2222.vercel.app
\`\`\`

## Passo 2: Deploy

1. Faça commit das mudanças:
\`\`\`bash
git add .
git commit -m "Backend minimo para testar Railway"
git push
\`\`\`

2. Railway vai detectar automaticamente e fazer deploy

## Passo 3: Testar

Quando o deploy terminar, teste:

\`\`\`bash
# Substitua pela sua URL do Railway
curl https://whatsapp-2222-production.up.railway.app/health
\`\`\`

Deve retornar:
\`\`\`json
{
  "status": "ok",
  "timestamp": "...",
  "uptime": 123
}
\`\`\`

## Passo 4: Teste no Frontend

Abra https://whatsapp-2222.vercel.app/whatsapp

Você deve ver "Backend funcionando" quando tentar criar uma sessão.

## O que fizemos

1. ✅ Removemos WhatsApp temporariamente
2. ✅ Removemos Supabase temporariamente  
3. ✅ Removemos autenticação
4. ✅ Deixamos APENAS Express + endpoints básicos
5. ✅ Dockerfile simples sem Chromium

## Próximos passos (DEPOIS que funcionar)

1. Adicionar Chromium no Dockerfile
2. Reativar WhatsApp Manager
3. Reativar Supabase
4. Adicionar autenticação

## Troubleshooting

### Se ainda falhar:

1. Verifique os logs no Railway
2. Confirme que as variáveis estão corretas
3. Teste localmente primeiro:
\`\`\`bash
cd server
npm install
PORT=5000 node index.js
\`\`\`

### Logs para verificar:

No Railway, você deve ver:
\`\`\`
🚀 WhatsApp CRM Backend iniciando...
📦 Node.js: v20.x.x
🌍 Ambiente: production
✅ SERVIDOR FUNCIONANDO!
\`\`\`

Se ver isso, o backend ESTÁ RODANDO!
