# Solução para Erro 404 no Frontend

## Problema
O frontend está dando 404 ao acessar `/api/whatsapp/sessions` porque o Railway está rodando código antigo.

## Causa
As mudanças no `server/index.js` não foram commitadas e enviadas ao Railway.

## Solução Rápida

### Opção 1: Botão Publish no v0 (MAIS FÁCIL)
1. Clique no botão **"Publish"** no canto superior direito do v0
2. Aguarde 2-3 minutos
3. Recarregue o site `novo-222.vercel.app`
4. Pronto!

### Opção 2: Git Manual
Execute no terminal:
\`\`\`bash
git add server/index.js
git commit -m "fix: add all API endpoints"
git push origin main
\`\`\`

### Opção 3: Usar o script
\`\`\`bash
chmod +x deploy.sh
./deploy.sh
\`\`\`

## Como Verificar se Deu Certo

1. **Verifique o Railway:**
   - Acesse https://railway.app
   - Entre no projeto "novo-222"
   - Vá em "Deployments"
   - Aguarde o deploy ficar verde ✅

2. **Teste o backend diretamente:**
   - Acesse: `https://novo-222-production.up.railway.app/api/whatsapp/sessions`
   - Deve retornar: `{"sessions":[],"total":0,"message":"Backend funcionando..."}`
   - Se retornar 404, o deploy não foi feito ainda

3. **Teste o frontend:**
   - Acesse: `https://novo-222.vercel.app/whatsapp`
   - Abra o DevTools (F12)
   - Clique em "Nova Sessão"
   - NÃO DEVE aparecer erro 404 no console

## Status Atual dos Endpoints

✅ Backend tem estes endpoints no código:
- GET  `/` - Health check
- GET  `/health` - Status
- GET  `/api/whatsapp/sessions` - Listar sessões
- POST `/api/whatsapp/sessions/:id/qr` - Gerar QR code
- POST `/api/whatsapp/sessions/:id/disconnect` - Desconectar
- POST `/api/whatsapp/connect` - Conectar
- POST `/api/whatsapp/send` - Enviar mensagem
- GET  `/api/auth/me` - User info
- POST `/api/auth/login` - Login
- POST `/api/auth/register` - Registro
- POST `/api/auth/logout` - Logout
- POST `/api/auth/refresh` - Refresh token

❌ Railway está rodando código ANTIGO sem esses endpoints

## Próximos Passos Após Deploy

Depois que o Railway fizer deploy (2-3 minutos):

1. ✅ Frontend vai carregar sem erros 404
2. ✅ Você vai poder criar sessões
3. ⚠️ QR code ainda será mock (imagem fake)
4. ⚠️ WhatsApp real precisa de mais implementação

Para implementar WhatsApp REAL depois:
- Instalar `whatsapp-web.js` 
- Adicionar Puppeteer/Chromium
- Configurar armazenamento de sessões
- Adicionar webhooks

Mas PRIMEIRO: faça o commit!
