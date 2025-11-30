# Configuração do Chromium no Railway

## Status Atual

O Chromium já está configurado e instalado! Aqui está o que foi feito:

### 1. Dockerfile.backend

O Dockerfile já instala o Chromium e todas as dependências necessárias:

\`\`\`dockerfile
RUN apt-get update && apt-get install -y \
    chromium \
    # ... outras dependências
\`\`\`

E configura as variáveis de ambiente:

\`\`\`dockerfile
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
\`\`\`

### 2. WhatsApp Manager Service

O serviço `whatsapp-manager.service.js` está configurado para:

- Usar as flags corretas do Puppeteer para ambientes containerizados
- Detectar automaticamente o caminho do Chromium via `PUPPETEER_EXECUTABLE_PATH`
- Usar `webVersionCache` remoto para garantir compatibilidade

### 3. Variáveis de Ambiente no Railway

Certifique-se de que estas variáveis estão configuradas no Railway:

\`\`\`env
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
SESSIONS_PATH=/app/whatsapp-sessions
FRONTEND_URL=https://whatsapp-api-web-oi.vercel.app
PORT=5000
\`\`\`

## Como Verificar se Está Funcionando

### 1. Logs do Railway

Acesse os logs do Railway e procure por:

\`\`\`
[session-id] Inicializando sessão WhatsApp...
[session-id] QR Code gerado
\`\`\`

### 2. Teste de Health Check

\`\`\`bash
curl https://whatsapp-api-web-oi-production.up.railway.app/health
\`\`\`

Deve retornar:
\`\`\`json
{
  "status": "ok",
  "timestamp": "...",
  "uptime": 123.45,
  "database": "supabase"
}
\`\`\`

### 3. Criar Sessão WhatsApp

No frontend, ao clicar em "Nova Sessão", você deve ver:

1. Loading state
2. QR Code aparecer (se tudo estiver correto)
3. Após escanear: status muda para "ready"

## Troubleshooting

### Problema: "Failed to launch the browser process"

**Solução**: Verifique se todas as dependências estão instaladas no Dockerfile

### Problema: "No usable sandbox!"

**Solução**: As flags `--no-sandbox` e `--disable-setuid-sandbox` já estão configuradas

### Problema: QR Code não aparece

**Causas possíveis**:
1. Backend não está recebendo requisições (verificar CORS)
2. Variável `NEXT_PUBLIC_API_URL` não está configurada na Vercel
3. Usuário não está autenticado no Supabase

**Verificar**:
- Console do navegador (F12) para ver erros
- Logs do Railway para ver se a requisição chegou
- Network tab para ver se a requisição foi feita

### Problema: CORS error

**Solução**: Adicione a variável `FRONTEND_URL` no Railway com o valor exato da URL da Vercel:
\`\`\`
FRONTEND_URL=https://whatsapp-api-web-oi.vercel.app
\`\`\`

## Arquitetura

\`\`\`
Frontend (Vercel)
    ↓ NEXT_PUBLIC_API_URL
Backend (Railway)
    ↓ usa
Chromium (/usr/bin/chromium)
    ↓ controla
WhatsApp Web
\`\`\`

## Próximos Passos

1. Faça redeploy do backend no Railway (para aplicar as mudanças no código)
2. Certifique-se de que `NEXT_PUBLIC_API_URL` está configurada na Vercel
3. Teste criando uma nova sessão WhatsApp
4. Monitore os logs do Railway em tempo real

## Comandos Úteis

### Ver logs em tempo real no Railway

\`\`\`bash
railway logs --service whatsapp-api-web-oi
\`\`\`

### Verificar se Chromium está instalado (via Railway CLI)

\`\`\`bash
railway run which chromium
\`\`\`

### Testar localmente com Docker

\`\`\`bash
docker build -t whatsapp-backend -f Dockerfile.backend .
docker run -p 5000:5000 --env-file server/.env whatsapp-backend
