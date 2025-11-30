# Checklist: Verificar Backend Railway

Use este guia para garantir que seu backend Railway está configurado corretamente.

## 1. Variáveis de Ambiente no Railway

Acesse Railway → Seu Projeto → Variables

Verifique se você tem TODAS estas variáveis:

### Supabase (OBRIGATÓRIO)
- [ ] `SUPABASE_URL` - URL do seu projeto Supabase
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Service role key (NÃO a anon key)
- [ ] `SUPABASE_ANON_KEY` - Anon public key

### Configuração Node.js
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `5000` (ou qualquer porta que o Railway atribuiu)

### Puppeteer (WhatsApp)
- [ ] `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` = `true`
- [ ] `PUPPETEER_EXECUTABLE_PATH` = `/usr/bin/chromium`

### CORS
- [ ] `FRONTEND_URL` = `https://whatsapp-api-web-oi.vercel.app`

## 2. Testar Endpoints da API

Abra cada URL no navegador:

### Health Check
\`\`\`
https://whatsapp-api-web-oi-production.up.railway.app/health
\`\`\`
**Esperado:** `{"status":"ok",...}`

### API Base
\`\`\`
https://whatsapp-api-web-oi-production.up.railway.app/api
\`\`\`
**Esperado:** Qualquer resposta (não 404)

## 3. Verificar Logs do Railway

1. Acesse Railway → Seu Projeto
2. Clique em **"Deployments"**
3. Clique no deployment ativo
4. Vá em **"Deploy Logs"**

### Procure por erros:

**Erro de variável faltando:**
\`\`\`
Error: SUPABASE_URL is not defined
\`\`\`
→ Adicione a variável faltando

**Erro de porta:**
\`\`\`
Error: listen EADDRINUSE
\`\`\`
→ Altere a variável `PORT`

**Erro do Puppeteer:**
\`\`\`
Error: Failed to launch the browser
\`\`\`
→ Verifique se tem `nixpacks.toml` com Chromium

## 4. Verificar Arquivos no Repositório

Seu repositório backend deve ter:

### Arquivo `railway.json`
\`\`\`json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "nixpacksConfigPath": "nixpacks.toml"
  }
}
\`\`\`

### Arquivo `nixpacks.toml`
\`\`\`toml
[phases.setup]
nixPkgs = ["chromium"]

[start]
cmd = "node server/index.js"
\`\`\`

### Arquivo `package.json`
Deve ter o script:
\`\`\`json
{
  "scripts": {
    "start": "node server/index.js"
  }
}
\`\`\`

## 5. Se Nada Funcionar: Redeploy Manual

1. Vá em Railway → Deployments
2. Clique em **"Redeploy"**
3. Aguarde finalizar
4. Teste novamente os endpoints

## Problemas Específicos

### WhatsApp QR Code não gera

**Causa:** Chromium não está instalado

**Solução:**
1. Verifique se existe `nixpacks.toml` no repositório
2. Conteúdo deve ter `nixPkgs = ["chromium"]`
3. Faça commit e push
4. Railway vai fazer redeploy automaticamente

### CORS Error

**Sintoma:** No console aparece:
\`\`\`
Access to fetch at '...' from origin '...' has been blocked by CORS policy
\`\`\`

**Solução:**
1. Adicione `FRONTEND_URL` no Railway
2. Valor deve ser a URL exata da Vercel (sem `/` no final)
3. Redeploy

### 502 Bad Gateway

**Causa:** Backend não está rodando ou travou

**Solução:**
1. Veja os logs do Railway
2. Procure por erros de inicialização
3. Verifique se a porta está correta
4. Redeploy

## Resultado Esperado

Quando tudo estiver correto:

1. Health check retorna OK
2. Logs mostram "Server running on port 5000"
3. Sem erros nos logs
4. Frontend conecta sem "Failed to fetch"
