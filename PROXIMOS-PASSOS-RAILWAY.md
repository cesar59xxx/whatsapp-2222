# Próximos Passos - Configuração Railway

## Situação Atual

O Chromium está INSTALADO e CONFIGURADO no Dockerfile. Agora você precisa garantir que as variáveis de ambiente estejam corretas.

## Passo a Passo

### 1. Configurar Variáveis no Railway

Acesse o Railway e vá em Settings → Variables. Adicione/verifique:

\`\`\`env
FRONTEND_URL=https://whatsapp-api-web-oi.vercel.app
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
SESSIONS_PATH=/app/whatsapp-sessions
PORT=5000
NODE_ENV=production
\`\`\`

Também adicione as variáveis do Supabase (copie da Vercel):

\`\`\`env
SUPABASE_URL=https://idieqcofmincppqzownw.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
SUPABASE_ANON_KEY=eyJhbGc...
\`\`\`

### 2. Fazer Redeploy no Railway

Após adicionar as variáveis:

1. Vá em Deployments
2. Clique nos 3 pontinhos no último deployment
3. Clique em "Redeploy"

OU faça um commit no GitHub para trigger automático.

### 3. Configurar na Vercel

Certifique-se de que esta variável está configurada:

\`\`\`env
NEXT_PUBLIC_API_URL=https://whatsapp-api-web-oi-production.up.railway.app
\`\`\`

### 4. Fazer Redeploy na Vercel

Após confirmar a variável:

1. Vá em Deployments
2. Clique nos 3 pontinhos no último deployment
3. Clique em "Redeploy"

### 5. Testar

1. Acesse: `https://whatsapp-api-web-oi.vercel.app`
2. Faça login com suas credenciais Supabase
3. Vá em "WhatsApp" no menu lateral
4. Clique em "Nova Sessão"
5. Digite um nome (ex: "teste")
6. Clique em "Criar Sessão"

**Resultado esperado**:
- Loading spinner
- QR Code aparece em 5-15 segundos
- Escaneie com WhatsApp no celular
- Status muda para "Conectado"

### 6. Monitorar Logs

**Railway**:
\`\`\`
Nov 30 2025 17:33:37 | 🚀 Servidor rodando na porta 5000
Nov 30 2025 17:33:38 | 📨 POST /api/whatsapp/sessions
Nov 30 2025 17:33:40 | [teste] Inicializando sessão WhatsApp...
Nov 30 2025 17:33:45 | [teste] QR Code gerado
\`\`\`

**Vercel** (Console do navegador):
\`\`\`
[v0] Backend URL: https://whatsapp-api-web-oi-production.up.railway.app
[v0] Creating session: teste
[v0] Response: { sessionId: 'xxx', status: 'qr', qrCode: 'data:image/png...' }
\`\`\`

## Checklist Completo

- [ ] Variáveis configuradas no Railway
- [ ] Redeploy feito no Railway
- [ ] Variável `NEXT_PUBLIC_API_URL` configurada na Vercel
- [ ] Redeploy feito na Vercel
- [ ] Login no app funciona
- [ ] Página /whatsapp carrega sem erro 404
- [ ] Botão "Nova Sessão" abre o modal
- [ ] QR Code aparece após criar sessão
- [ ] WhatsApp conecta após escanear QR

## Troubleshooting Rápido

### QR Code não aparece

1. Abra Console (F12) e procure por erros
2. Verifique Network tab se a requisição foi feita
3. Verifique se `NEXT_PUBLIC_API_URL` está correta
4. Verifique logs do Railway

### Erro "Failed to fetch"

- Backend não está rodando
- URL incorreta em `NEXT_PUBLIC_API_URL`
- CORS não configurado (verifique `FRONTEND_URL` no Railway)

### Erro "Invalid API key"

- Problema no Supabase, não no Railway
- Verifique se está usando ANON key, não SERVICE_ROLE key
- Vá em `/status` para diagnóstico

### Página 404

- Rotas do Next.js não estão corretas
- Faça redeploy na Vercel
