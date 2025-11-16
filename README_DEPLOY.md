# 🚀 Deploy Rápido - 1000 Videos

## Forma Mais Rápida

### Usando Script Automático

```bash
./deploy.sh
```

Escolha a opção desejada no menu interativo.

---

## Deploy Manual

### Estrutura do Monorepo

- `apps/landing`: Projeto principal (Vite) com Supabase/Stripe.
- `apps/storybook`: Design system em Storybook.

Para deploy, sempre execute o CLI dentro da pasta do app correspondente (`apps/landing` ou `apps/storybook`).

### Vercel (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy da landing
cd apps/landing
vercel --prod
```

**Pronto!** ✅

---

## URLs Após Deploy

### Landing Page Principal
```
https://seu-site.vercel.app
```

### Variantes PT-BR
```
https://seu-site.vercel.app?variant=neo_brutalist_ptbr
https://seu-site.vercel.app?variant=modern_ptbr
https://seu-site.vercel.app?variant=production_studio_ptbr
```

### Variantes EN-US
```
https://seu-site.vercel.app?variant=neo_brutalist
https://seu-site.vercel.app?variant=modern
https://seu-site.vercel.app?variant=premium
https://seu-site.vercel.app (Production Studio - padrão)
```

### Atalhos Configurados
```
https://seu-site.vercel.app/neo      → Neo-Brutalist PT-BR
https://seu-site.vercel.app/modern   → Modern PT-BR
https://seu-site.vercel.app/studio   → Studio PT-BR
https://seu-site.vercel.app/premium  → Premium
```

---

## Deploy do Storybook

```bash
# 1. Build
npm run build-storybook

# 2. Deploy
cd apps/storybook/storybook-static
vercel --prod
```

---

## Comandos Úteis

### Testar Build Localmente
```bash
npm run build
npm run preview
```

Acesse: `http://localhost:4173`

### Ver Logs do Deploy
```bash
vercel logs <url-do-deploy>
```

### Remover Deploy
```bash
vercel remove <deployment-url>
```

---

## Configurar Domínio Próprio

### Na Vercel

1. Vá em **Settings** → **Domains**
2. Adicione seu domínio
3. Configure DNS:
   - `A Record`: `76.76.21.21`
   - `CNAME www`: `cname.vercel-dns.com`

---

## Variáveis de Ambiente

### Modo Mock (Padrão)
Já funciona sem configurar nada! ✅

### Modo Produção (Com Backend Real)

No painel da Vercel, adicione:

```bash
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_STRIPE_PRICE_ID=price_...
```

---

## Troubleshooting

### Build Falha?
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Variáveis de Ambiente Não Funcionam?
- Todas devem começar com `VITE_`
- Re-deploy após adicionar novas variáveis

### Página em Branco?
- Verifique console do navegador
- Teste build local: `npm run preview`

---

## 📚 Documentação Completa

- **[DEPLOY_GUIDE_PT.md](DEPLOY_GUIDE_PT.md)**: Guia completo em português
- **[DEPLOYMENT.md](DEPLOYMENT.md)**: Guia técnico detalhado

---

## 🆘 Precisa de Ajuda?

- Documentação Vercel: [vercel.com/docs](https://vercel.com/docs)
- Suporte: [vercel.com/support](https://vercel.com/support)

---

**Dica**: Se é sua primeira vez, use o script `./deploy.sh` - é o jeito mais fácil!
