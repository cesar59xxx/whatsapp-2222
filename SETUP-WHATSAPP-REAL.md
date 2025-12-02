# 🚀 Setup WhatsApp Real - Guia Completo

## 1️⃣ Criar Tabelas no Supabase

1. Acesse o Supabase: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Execute o script: `scripts/01-create-tables.sql`
5. Clique em **Run** para criar as tabelas

## 2️⃣ Adicionar Variáveis no Railway

Acesse: Railway → seu projeto → Variables

Adicione estas variáveis:

\`\`\`bash
# Supabase (obrigatório)
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key

# Frontend (obrigatório)
FRONTEND_URL=https://novo-222.vercel.app

# Puppeteer (já configurado no Dockerfile)
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Opcional
NODE_ENV=production
PORT=5000
SESSIONS_PATH=/app/whatsapp-sessions
\`\`\`

### Como pegar as credenciais do Supabase:

1. No Supabase Dashboard
2. Vá em **Project Settings** → **API**
3. Copie:
   - **URL**: Seu `SUPABASE_URL`
   - **service_role key**: Seu `SUPABASE_SERVICE_ROLE_KEY` (NÃO use a anon key!)

## 3️⃣ Fazer Deploy

\`\`\`bash
git add .
git commit -m "feat: implement real WhatsApp integration with chromium"
git push
\`\`\`

Ou clique em **Publish** no v0.

## 4️⃣ Testar WhatsApp

1. Acesse: https://novo-222.vercel.app/whatsapp
2. Clique em **Nova Sessão**
3. Dê um nome (ex: "Atendimento")
4. Clique em **Criar Sessão**
5. Clique em **Conectar**
6. Aguarde 10-30 segundos
7. O QR code vai aparecer
8. Escaneie com seu WhatsApp (Configurações → Aparelhos conectados)
9. Pronto! WhatsApp conectado

## 5️⃣ O que vai funcionar:

✅ Gerar QR code real
✅ Conectar WhatsApp Web
✅ Receber mensagens
✅ Enviar mensagens
✅ Múltiplas sessões
✅ Persistência de sessões
✅ Status de mensagens (enviada, entregue, lida)
✅ Suporte a mídia (imagens, vídeos, áudios)

## ⚠️ Troubleshooting

**QR code não aparece:**
- Verifique os logs do Railway
- Confirme que o Chromium foi instalado (deve aparecer nos logs)
- Aguarde 30 segundos após clicar em "Conectar"

**Erro 500 ao criar sessão:**
- Verifique se as tabelas foram criadas no Supabase
- Confirme que `SUPABASE_SERVICE_ROLE_KEY` está correta

**Sessão desconecta sozinha:**
- Normal em deploys do Railway (reinicia o container)
- Basta reconectar clicando no botão "Conectar"
