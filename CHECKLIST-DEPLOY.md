# ✅ Checklist de Deploy

Use este checklist para garantir que tudo está configurado corretamente.

## 📋 Supabase

- [ ] Projeto criado no Supabase
- [ ] SQL executado (tabela whatsapp_sessions criada)
- [ ] SUPABASE_URL copiado
- [ ] SUPABASE_SERVICE_ROLE_KEY copiado
- [ ] SUPABASE_ANON_KEY copiado

## 📋 Railway

- [ ] Projeto conectado ao GitHub
- [ ] Variável PORT configurada
- [ ] Variável SUPABASE_URL configurada
- [ ] Variável SUPABASE_SERVICE_ROLE_KEY configurada
- [ ] Variável SESSIONS_PATH configurada
- [ ] Variável PUPPETEER_EXECUTABLE_PATH configurada
- [ ] Variável FRONTEND_URL configurada
- [ ] Variável NODE_ENV=production configurada
- [ ] Deploy concluído com sucesso
- [ ] Healthcheck passando
- [ ] Endpoint /health retorna status ok

## 📋 Vercel

- [ ] Projeto conectado ao GitHub
- [ ] Variável NEXT_PUBLIC_API_URL configurada (URL do Railway)
- [ ] Variável NEXT_PUBLIC_SUPABASE_URL configurada
- [ ] Variável NEXT_PUBLIC_SUPABASE_ANON_KEY configurada (NÃO service_role)
- [ ] Deploy concluído com sucesso
- [ ] Site acessível

## 📋 Testes

- [ ] Backend /health retorna status ok
- [ ] Backend /api/whatsapp/sessions retorna array
- [ ] Frontend carrega sem erros no console
- [ ] Possível criar nova sessão WhatsApp
- [ ] QR Code é gerado ao conectar sessão

---

## ✅ Tudo Pronto!

Se todos os itens acima estiverem marcados, seu sistema está funcionando!
