# Teste Manual do Backend Railway

## 1. Teste Básico (Navegador)

Abra estas URLs no navegador e veja se retorna JSON:

### Root Endpoint
\`\`\`
https://whatsapp-2222-production.up.railway.app/
\`\`\`

Deve retornar:
\`\`\`json
{
  "message": "WhatsApp CRM Backend API",
  "status": "running",
  "version": "2.0.0",
  "endpoints": {
    "health": "/health",
    "sessions": "/api/whatsapp/sessions"
  }
}
\`\`\`

### Health Endpoint
\`\`\`
https://whatsapp-2222-production.up.railway.app/health
\`\`\`

Deve retornar:
\`\`\`json
{
  "status": "ok",
  "timestamp": "2025-11-30T...",
  "uptime": 123.45
}
\`\`\`

### API Health
\`\`\`
https://whatsapp-2222-production.up.railway.app/api/health
\`\`\`

Deve retornar:
\`\`\`json
{
  "status": "ok",
  "timestamp": "2025-11-30T..."
}
\`\`\`

### Sessions (Mock)
\`\`\`
https://whatsapp-2222-production.up.railway.app/api/whatsapp/sessions
\`\`\`

Deve retornar:
\`\`\`json
{
  "sessions": [],
  "total": 0,
  "message": "Backend funcionando - WhatsApp será implementado em breve"
}
\`\`\`

## 2. Teste via cURL (Terminal)

Se você tiver acesso a um terminal:

\`\`\`bash
# Teste básico
curl https://whatsapp-2222-production.up.railway.app/health

# Teste com headers
curl -H "Accept: application/json" https://whatsapp-2222-production.up.railway.app/health

# Teste POST (criar sessão)
curl -X POST https://whatsapp-2222-production.up.railway.app/api/whatsapp/sessions \
  -H "Content-Type: application/json" \
  -d '{"name":"teste"}'
\`\`\`

## 3. O Que Fazer Se Retornar Erro

### Erro 404 (Not Found)
- Railway não está rodando o servidor
- Verifique logs do Railway
- Confirme que o Dockerfile.backend está correto

### Erro 502 (Bad Gateway)
- Servidor crashou durante inicialização
- Veja logs para encontrar o erro
- Provavelmente falta alguma dependência

### Erro 503 (Service Unavailable)
- Railway ainda está fazendo deploy
- Aguarde mais alguns minutos
- Recarregue a página

### Timeout / Não carrega
- Problema de rede ou firewall
- Tente de outro dispositivo/rede
- Verifique se o Railway está online

## 4. Verificar Logs do Railway

1. Vá para https://railway.app
2. Selecione o projeto
3. Clique em **Deployments**
4. Clique no deploy mais recente
5. Role até o final dos logs

Procure por:
\`\`\`
╔═══════════════════════════════════╗
║   ✅ SERVIDOR FUNCIONANDO!        ║
╠═══════════════════════════════════╣
║ 🔗 Porta: 5000                    ║
║ 🌐 Health: /health                ║
║ 📱 Frontend: https://...          ║
╚═══════════════════════════════════╝
\`\`\`

Se não ver isso, o servidor não iniciou corretamente.
