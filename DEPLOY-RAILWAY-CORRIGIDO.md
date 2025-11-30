# Deploy Railway - Correção Aplicada

## Problema Identificado

O deploy estava falhando com o erro:
\`\`\`
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'jsonwebtoken'
\`\`\`

## Correções Aplicadas

### 1. Pacotes Adicionados ao package.json
- `jsonwebtoken`: ^9.0.2 (necessário para autenticação JWT)
- `bcryptjs`: ^2.4.3 (necessário para hash de senhas)

### 2. Melhorias no Dockerfile
- Logging mais verboso durante npm install
- Healthcheck atualizado para usar `wget` (compatível com ES modules)
- Start period aumentado para 60s (dá mais tempo para o servidor iniciar)

## Como Fazer Deploy Agora

### Opção 1: Push para GitHub (RECOMENDADO)
\`\`\`bash
git add .
git commit -m "fix: add missing dependencies jsonwebtoken and bcryptjs"
git push origin main
\`\`\`
O Railway vai detectar automaticamente e fazer redeploy.

### Opção 2: Redeploy Manual
1. Vá para o Railway Dashboard
2. Clique no serviço "whatsapp-2222"
3. Clique em "Deployments"
4. Clique em "Redeploy"

## Verificação

Após o deploy, você pode verificar se funcionou:

1. Verifique os logs do Railway:
   - Deve mostrar "WhatsApp CRM SaaS iniciado"
   - Deve mostrar "Servidor rodando na porta 5000"
   - NÃO deve mostrar erros de ERR_MODULE_NOT_FOUND

2. Teste o healthcheck:
   \`\`\`bash
   curl https://whatsapp-2222.up.railway.app/health
   \`\`\`
   Deve retornar: `{"status":"ok"}`

3. Teste a conexão do frontend:
   - Acesse https://whatsapp-2222.vercel.app/status
   - Deve mostrar "Backend conectado" em verde

## Próximos Passos

Depois que o deploy funcionar, você poderá:
1. Fazer login no sistema
2. Criar uma sessão WhatsApp
3. Escanear o QR code
4. Começar a usar o CRM!
