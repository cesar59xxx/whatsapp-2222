# Checklist de Variáveis - Copie e Cole

## NO SUPABASE (onde pegar as chaves)

https://supabase.com/dashboard/project/idieqcofmincppqzownw/settings/api

Você vai ver 2 chaves importantes:

### 1. anon public
\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkaWVxY29mbWluY3BwcXpvd253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzOTg0MDAsImV4cCI6MjAyMDk3NDQwMH0...
\`\`\`
**Começa com "eyJ" e tem "role":"anon" quando você decodifica**

### 2. service_role  
\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkaWVxY29mbWluY3BwcXpvd253Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNTM5ODQwMCwiZXhwIjoyMDIwOTc0NDAwfQ...
\`\`\`
**Também começa com "eyJ" mas tem "role":"service_role" quando você decodifica**

## NA VERCEL (frontend)

✅ Use a **anon** key:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://idieqcofmincppqzownw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=(cole a anon public key aqui)
NEXT_PUBLIC_API_URL=https://novo-222-production.up.railway.app
\`\`\`

## NO RAILWAY (backend)

✅ Use a **service_role** key:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://idieqcofmincppqzownw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=(cole a mesma anon public key aqui)
SUPABASE_SERVICE_ROLE_KEY=(cole a service_role key aqui)
PORT=5000
NODE_ENV=production
\`\`\`

## COMO VERIFICAR SE ESTÁ CERTO

Depois de configurar e fazer redeploy:

1. Abra: https://novo-222.vercel.app/whatsapp
2. Abra o Console (F12)
3. Procure por: `[v0] Key role:`
4. Deve mostrar: `[v0] Key role: anon` ✅
5. Se mostrar `[v0] Key role: service_role` ❌ = ERRADO!

## DECODIFICAR CHAVE (para verificar)

Copie sua chave e cole aqui: https://jwt.io

Você vai ver o JSON decodificado:

\`\`\`json
{
  "iss": "supabase",
  "ref": "idieqcofmincppqzownw",
  "role": "anon",  // <-- Isso deve ser "anon" na Vercel
  "iat": 1705398400,
  "exp": 2020974400
}
