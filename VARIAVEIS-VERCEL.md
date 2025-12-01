# Variáveis de Ambiente - Vercel Frontend

Configure estas variáveis no seu projeto Vercel:

## Variáveis Obrigatórias

\`\`\`env
# URL do Backend no Railway
NEXT_PUBLIC_API_URL=https://whatsapp-2222-production.up.railway.app

# Supabase (suas credenciais atuais)
NEXT_PUBLIC_SUPABASE_URL=https://ldieqcofmincppqzownw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...sua_chave_aqui
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...sua_chave_service_role
\`\`\`

## Como Adicionar

1. Vá em https://vercel.com/seu-usuario/whatsapp-2222/settings/environment-variables
2. Adicione cada variável
3. Selecione "Production", "Preview" e "Development"
4. Clique em "Save"
5. Faça um redeploy do projeto

## Verificar se funcionou

1. Abra https://whatsapp-2222.vercel.app
2. Abra o DevTools Console (F12)
3. Digite: `console.log(process.env.NEXT_PUBLIC_API_URL)`
4. Deve mostrar a URL do Railway

## Troubleshooting

Se as variáveis não aparecem:
1. Limpe o cache da Vercel
2. Faça redeploy
3. Aguarde 1-2 minutos
4. Recarregue a página com Ctrl+Shift+R
