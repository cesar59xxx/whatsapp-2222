# Diagnóstico Completo do Sistema

## Problema Identificado

O sistema tem **DUAS arquiteturas de autenticação diferentes** que NÃO estão integradas:

### 1. Frontend (Vercel) - Usa SOMENTE Supabase Auth
- Localização: `app/(auth)/sign-up/page.tsx`, `app/(auth)/login/page.tsx`
- Método: `supabase.auth.signUp()` e `supabase.auth.signIn()`
- Tokens: Gerenciados pelo Supabase
- Banco: Tabela `auth.users` do Supabase

### 2. Backend (Railway) - Sistema JWT próprio
- Localização: `server/controllers/auth.controller.js`
- Rotas: `/api/auth/register`, `/api/auth/login`
- Método: JWT com refresh tokens no Redis
- Banco: Precisa de MongoDB/Supabase para armazenar `users` e `tenants`

## O Erro "Invalid API key"

O erro vem do **Supabase**, não do Railway. Possíveis causas:

1. **NEXT_PUBLIC_SUPABASE_ANON_KEY está incorreta**
   - Verifique se copiou a chave "anon public" correta
   - NÃO use a "service_role" key no frontend

2. **Supabase URL incorreta**
   - Formato: `https://xxxxx.supabase.co`
   - Verifique NEXT_PUBLIC_SUPABASE_URL

3. **Projeto Supabase pausado/inativo**
   - Acesse dashboard.supabase.com
   - Verifique se o projeto está ativo

## Soluções

### Opção 1: Usar APENAS Supabase (Recomendado para MVP)
1. Remover todo código do backend Railway relacionado a auth
2. Usar Supabase Auth + Supabase Database
3. Manter backend Railway apenas para WhatsApp Web.js

### Opção 2: Integrar os dois sistemas
1. Supabase Auth para login/registro
2. Após login bem-sucedido, criar/sincronizar usuário no backend Railway
3. Usar JWT do Railway para todas as chamadas de API

### Opção 3: Migrar tudo para Backend Railway
1. Remover Supabase Auth do frontend
2. Usar API do Railway para registro/login
3. Criar formulário que chama `/api/auth/register` do Railway

## Checklist de Correção

- [ ] Verificar NEXT_PUBLIC_SUPABASE_ANON_KEY na Vercel
- [ ] Verificar NEXT_PUBLIC_SUPABASE_URL na Vercel  
- [ ] Confirmar que projeto Supabase está ativo
- [ ] Testar página `/diagnostics` para ver logs
- [ ] Abrir Console (F12) e procurar erros [v0]
- [ ] Verificar Railway logs se backend está respondendo
- [ ] Decidir qual arquitetura de auth usar

## Teste Rápido

1. Acesse: https://whatsapp-api-web-oi.vercel.app/diagnostics
2. Veja quais testes passam/falham
3. Abra Console (F12) e copie todos os logs [v0]
4. Me envie os resultados

## Variáveis de Ambiente Necessárias

### Vercel (Frontend)
\`\`\`bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...  # Chave ANON, não service_role
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...      # Para uso em Server Actions

# Backend
NEXT_PUBLIC_API_URL=https://whatsapp-api-web-oi-production.up.railway.app
\`\`\`

### Railway (Backend)
\`\`\`bash
# Supabase (se usar integração)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# JWT
JWT_SECRET=sua-chave-secreta-muito-segura
JWT_REFRESH_SECRET=outra-chave-secreta-diferente
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Porta
PORT=5000

# Frontend URL (para CORS)
FRONTEND_URL=https://whatsapp-api-web-oi.vercel.app
