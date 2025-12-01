# Teste Rápido - Verifique se Funciona

## 1. Teste o Backend no Railway

Após o deploy, abra no navegador:

\`\`\`
https://whatsapp-2222-production.up.railway.app/health
\`\`\`

**Deve mostrar:**
\`\`\`json
{"status":"ok","timestamp":"2025-11-30T..."}
\`\`\`

## 2. Teste a Conexão Frontend → Backend

1. Acesse seu site: `https://whatsapp-2222.vercel.app`
2. Abra o Console (F12 → Console)
3. Vá para `/whatsapp`
4. Clique em "Nova Sessão"
5. Preencha um nome e clique "Criar Sessão"

**No Console deve aparecer:**
\`\`\`
[v0] Backend URL: https://whatsapp-2222-production.up.railway.app
[v0] Criando sessão: test
\`\`\`

**E deve mostrar uma mensagem:**
\`\`\`
Backend respondendo - WhatsApp em desenvolvimento
\`\`\`

## 3. Se Funcionar

Parabéns! O sistema básico está funcionando. Agora podemos adicionar:
- WhatsApp-Web.js
- QR Code
- Mensagens
- Etc

## 4. Se NÃO Funcionar

Me envie prints de:
1. Logs do Railway (aba "Logs")
2. Console do navegador (F12)
3. Variáveis configuradas no Railway e Vercel
