# Deploy Railway - CORRIGIDO

## O Problema que foi Corrigido

O erro `Cannot find package 'jsonwebtoken'` acontecia porque:
1. O Dockerfile copiava TODOS os arquivos da pasta `server/`
2. Alguns arquivos antigos (controllers, middleware, routes) tentavam importar `jsonwebtoken`
3. Mesmo que o `index.js` não usasse esses arquivos, o Node.js tentava resolver os imports

## A Solução

O novo Dockerfile copia APENAS o `index.js`, evitando que arquivos antigos sejam copiados para o container.

## Próximos Passos

### 1. Faça commit e push

\`\`\`bash
git add .
git commit -m "fix: copy only index.js to avoid broken imports"
git push
\`\`\`

### 2. O Railway vai fazer deploy automaticamente

Aguarde 2-3 minutos. O deploy deve completar com sucesso agora.

### 3. Teste o backend

Abra no navegador:
\`\`\`
https://whatsapp-2222-production.up.railway.app/health
\`\`\`

Você deve ver:
\`\`\`json
{
  "status": "ok",
  "timestamp": "2025-11-30T...",
  "uptime": 123.45
}
\`\`\`

### 4. Configure a variável na Vercel

Na Vercel, adicione:
\`\`\`
NEXT_PUBLIC_API_URL=https://whatsapp-2222-production.up.railway.app
\`\`\`

### 5. Faça redeploy na Vercel

\`\`\`bash
git push
\`\`\`

## Verificação Final

1. Backend rodando: ✅ `https://whatsapp-2222-production.up.railway.app/health`
2. Frontend funcionando: ✅ `https://whatsapp-2222.vercel.app`
3. Frontend conectando ao backend: ✅ Abra o console e veja os logs `[v0]`

## Próxima Fase

Depois que o backend estiver rodando, vamos adicionar:
1. Integração com WhatsApp Web.js (Chromium + Puppeteer)
2. Conexão com Supabase para armazenar sessões
3. Autenticação JWT
4. Socket.io para QR code em tempo real
