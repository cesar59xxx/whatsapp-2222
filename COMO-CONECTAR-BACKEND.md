# Como Conectar o Frontend (Vercel) ao Backend (Railway)

## Problema Identificado

O frontend na Vercel está funcionando, mas **não consegue se comunicar com o backend no Railway**. Isso causa:
- Erro "Failed to fetch" ao criar sessões WhatsApp
- QR Code não é gerado
- Páginas 404 em algumas rotas

## Solução: Adicionar Variável de Ambiente na Vercel

### Passo 1: Pegar a URL do Backend no Railway

1. Acesse [Railway.app](https://railway.app)
2. Entre no seu projeto backend (`whatsapp-api-web-oi`)
3. Clique na aba **"Settings"**
4. Procure por **"Domains"** ou **"Public Networking"**
5. Copie a URL pública (algo como: `https://whatsapp-api-web-oi-production.up.railway.app`)

**Na sua screenshot, a URL deve ser:**
\`\`\`
https://whatsapp-api-web-oi-production.up.railway.app
\`\`\`

### Passo 2: Adicionar no Vercel

1. Acesse [Vercel.com](https://vercel.com)
2. Vá no seu projeto frontend
3. Clique em **"Settings"** → **"Environment Variables"**
4. Adicione estas variáveis:

| Nome da Variável | Valor |
|-----------------|-------|
| `NEXT_PUBLIC_API_URL` | `https://whatsapp-api-web-oi-production.up.railway.app` |
| `NEXT_PUBLIC_SOCKET_URL` | `https://whatsapp-api-web-oi-production.up.railway.app` |

**IMPORTANTE:** 
- **NÃO** adicione `/api` no final da URL
- As variáveis devem começar com `NEXT_PUBLIC_` para funcionarem no frontend
- Certifique-se de que estão disponíveis em **Production, Preview e Development**

### Passo 3: Redeploy na Vercel

Depois de adicionar as variáveis:
1. Vá na aba **"Deployments"**
2. Clique nos 3 pontinhos no último deployment
3. Clique em **"Redeploy"**
4. Aguarde o deploy finalizar (2-3 minutos)

### Passo 4: Testar

1. Abra seu app: `https://whatsapp-api-web-oi.vercel.app`
2. Abra o Console do navegador (F12)
3. Procure pelos logs `[v0]`:
   - `[v0] Backend URL: https://whatsapp-api-web-oi-production.up.railway.app`
   - `[v0] API Request: https://whatsapp-api-web-oi-production.up.railway.app/api/...`

Se aparecer `http://localhost:3001`, significa que a variável não foi configurada corretamente.

## Verificar se o Backend Railway está Funcionando

Teste diretamente a API do Railway:

1. Abra o navegador
2. Acesse: `https://whatsapp-api-web-oi-production.up.railway.app/health`

**Deve retornar:**
\`\`\`json
{
  "status": "ok",
  "timestamp": "2025-11-30T..."
}
\`\`\`

Se retornar erro 404 ou não carregar, o problema está no backend Railway.

## Problemas Comuns

### 1. "Failed to fetch" mesmo após configurar

**Causa:** CORS não configurado no backend

**Solução:** Verifique se no Railway você tem a variável:
\`\`\`
FRONTEND_URL=https://whatsapp-api-web-oi.vercel.app
\`\`\`

### 2. Página 404 em /dashboard/pipeline

**Causa:** Esta rota não existe no código

**Solução:** Acesse `/dashboard` ou `/whatsapp` diretamente

### 3. QR Code não aparece

**Causa 1:** Backend não está conectado (veja solução acima)

**Causa 2:** whatsapp-web.js precisa do Chromium no Railway

**Solução:** Verifique se no Railway você tem:
\`\`\`
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
\`\`\`

E no `railway.json` (na raiz do projeto backend) deve ter:
\`\`\`json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "nixpacksConfigPath": "nixpacks.toml"
  }
}
\`\`\`

E o arquivo `nixpacks.toml`:
\`\`\`toml
[phases.setup]
nixPkgs = ["chromium"]
\`\`\`

## Resumo

1. **Pegar URL do Railway backend**
2. **Adicionar `NEXT_PUBLIC_API_URL` na Vercel**
3. **Fazer redeploy na Vercel**
4. **Testar no console do navegador**

Qualquer dúvida, me envie uma screenshot dos logs do console!
