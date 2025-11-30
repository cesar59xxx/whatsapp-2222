# Guia Rápido de Correção

## 🚨 Problema: "Invalid API key"

### Solução em 3 Passos:

#### 1️⃣ Acesse a página de status
\`\`\`
https://whatsapp-api-web-oi.vercel.app/status
\`\`\`

Esta página mostra TODAS as variáveis de ambiente e identifica problemas automaticamente.

#### 2️⃣ Copie as chaves corretas do Supabase

1. Clique em "Supabase API Settings" na página de status
2. Na página do Supabase, procure por "Project API keys"
3. Copie a chave que está em **"anon" "public"** (NÃO a service_role!)
4. Deve começar com `eyJhbGc...` e ser bem longa

#### 3️⃣ Atualize na Vercel

1. Vá em: Vercel Dashboard → Settings → Environment Variables
2. Encontre `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Clique em "Edit"
4. Cole a chave que você copiou
5. Clique em "Save"
6. **IMPORTANTE:** Clique em "Redeploy" no topo da página

### ✅ Como saber se funcionou?

1. Após o redeploy terminar (2-3 minutos)
2. Acesse: https://whatsapp-api-web-oi.vercel.app/status
3. A verificação da chave Supabase deve mostrar ✅ verde
4. Tente criar uma conta em /sign-up

## 🔧 Outros Problemas Comuns

### Backend não responde

**Sintoma:** Erro "Failed to fetch" ao criar sessão WhatsApp

**Solução:**
1. Acesse Railway Dashboard
2. Verifique se o serviço está "Active"
3. Olhe os logs para erros
4. Confirme que FRONTEND_URL está configurado

### Rotas 404

**Sintoma:** "This page could not be found"

**Causa:** Links internos desatualizados

**Solução:** Use a navegação do sidebar, não digite URLs manualmente

### QR Code não aparece

**Sintoma:** Botão "Conectar" não gera QR Code

**Causa:** Chromium não instalado no Railway

**Solução:** 
1. Verifique se existe arquivo `nixpacks.toml` no projeto
2. Se não existir, me avise para criá-lo
3. Faça commit e push para Railway

## 📊 Páginas de Diagnóstico

- `/status` - Mostra configuração e variáveis
- `/diagnostics` - Testa conectividade completa
- Console (F12) - Veja logs detalhados com [v0]

## 🆘 Ainda com problemas?

1. Acesse `/status` e tire screenshot
2. Acesse `/diagnostics` e tire screenshot  
3. Abra Console (F12) e copie logs que começam com [v0]
4. Me envie tudo para análise
