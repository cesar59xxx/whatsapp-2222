# CORRIGIR TUDO AGORA - Guia Definitivo

## PROBLEMA PRINCIPAL

Você está usando a chave ERRADA no frontend. A variável `NEXT_PUBLIC_SUPABASE_ANON_KEY` na Vercel está com o valor da `service_role` key, quando deveria ter a `anon` key.

## SOLUÇÃO EM 3 PASSOS

### 1. CORRIGIR VARIÁVEIS NA VERCEL

Acesse: https://vercel.com/cesarmediotec-9518s-projects/novo-222/settings/environment-variables

**Encontre essas chaves no Supabase:**
- Vá para: https://supabase.com/dashboard/project/SEUPROJETO/settings/api
- Copie as chaves corretas:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://idieqcofmincppqzownw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=(copie a chave "anon public" - ela começa com eyJhbG... e tem "role":"anon" quando decodificada)
\`\`\`

**IMPORTANTE**: NÃO use a "service_role" key no frontend! É um risco de segurança!

### 2. VARIÁVEIS NO RAILWAY

Acesse: https://railway.app → seu projeto → Variables

Adicione APENAS estas 3 variáveis:

\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=https://idieqcofmincppqzownw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=(a mesma anon key da Vercel)
SUPABASE_SERVICE_ROLE_KEY=(agora sim, copie a "service_role" key do Supabase)
\`\`\`

### 3. REDEPLOY

**Vercel:**
1. Vá para: https://vercel.com/cesarmediotec-9518s-projects/novo-222/deployments
2. Clique nos 3 pontinhos do último deploy
3. Selecione "Redeploy"

**Railway:**
- O Railway vai fazer redeploy automaticamente quando você salvar as variáveis

## TESTANDO

Depois dos deploys (aguarde 3-5 minutos):

1. Acesse: https://novo-222.vercel.app/whatsapp
2. Abra o Console (F12)
3. Procure por: `[v0] Key role: anon` (deve ser "anon", NÃO "service_role")
4. Clique em "Nova Sessão"
5. Digite um nome e clique em "Criar Sessão"
6. O QR code deve aparecer em 1-2 segundos

## DIFERENÇA ENTRE AS CHAVES

| Chave | Onde usar | Por quê |
|-------|-----------|---------|
| **anon** key | Frontend (Vercel) | Segura para navegador, respeita RLS |
| **service_role** key | Backend (Railway) | Acesso total ao banco, NUNCA expor ao navegador |

## SE AINDA NÃO FUNCIONAR

Verifique os logs do Railway:

1. Vá para Railway → seu projeto → Deployments
2. Clique no último deploy
3. Vá para "View Logs"
4. Procure por erros relacionados ao WhatsApp ou Chromium
5. Tire um print e me mostre

## PRÓXIMOS PASSOS (DEPOIS DE FUNCIONAR)

- [ ] Testar scan do QR code com seu celular
- [ ] Enviar mensagem teste
- [ ] Implementar o chatbot com IA
- [ ] Configurar webhooks do WhatsApp
