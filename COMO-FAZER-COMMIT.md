# Como Fazer Commit e Deploy

## Opção 1: Usando o v0 (RECOMENDADO)

1. Clique no botão **"Publish"** no canto superior direito do v0
2. Pronto! O v0 vai automaticamente:
   - Fazer commit das mudanças
   - Fazer push para o GitHub
   - O Railway detecta e faz deploy automaticamente

## Opção 2: Usando Git Manual

Se você clonou o repositório localmente:

\`\`\`bash
# 1. Adicionar todos os arquivos modificados
git add .

# 2. Fazer commit com mensagem descritiva
git commit -m "feat: add all API endpoints for frontend"

# 3. Enviar para o GitHub
git push origin main
\`\`\`

## Opção 3: Usando GitHub Web

1. Vá para: https://github.com/seu-usuario/whatsapp-2222
2. Clique no arquivo `server/index.js`
3. Clique no botão "Edit" (lápis)
4. Cole o conteúdo novo do arquivo
5. Clique em "Commit changes"

## O que acontece depois do commit?

1. **GitHub** recebe as mudanças
2. **Railway** detecta automaticamente o novo commit
3. **Railway** faz rebuild e redeploy (leva ~2-3 minutos)
4. **Frontend Vercel** conseguirá acessar as novas rotas

## Como verificar se o deploy funcionou?

Acesse: `https://novo-222-production.up.railway.app/`

Deve retornar:
\`\`\`json
{
  "message": "WhatsApp CRM Backend API",
  "status": "running",
  "version": "2.0.0",
  "endpoints": {
    "health": "/health",
    "auth": "/api/auth/*",
    "sessions": "/api/whatsapp/sessions"
  }
}
\`\`\`

Depois teste: `https://novo-222-production.up.railway.app/api/whatsapp/sessions`

Deve retornar:
\`\`\`json
{
  "sessions": [],
  "total": 0,
  "message": "Backend funcionando - WhatsApp será implementado em breve"
}
\`\`\`

## Checklist

- [ ] Fazer commit das mudanças
- [ ] Aguardar deploy do Railway (2-3 min)
- [ ] Testar a URL do backend
- [ ] Recarregar o frontend no Vercel
- [ ] Verificar se os erros 404 sumiram

## Problemas comuns

### "Ainda dá 404 depois do deploy"
- Limpe o cache do navegador (Ctrl+Shift+R)
- Verifique se o Railway terminou o deploy
- Confira se a URL está correta na variável `NEXT_PUBLIC_API_URL`

### "Railway não está fazendo deploy"
- Vá no Railway > Deployments
- Clique em "Deploy Now" manualmente
- Veja os logs para identificar erros
