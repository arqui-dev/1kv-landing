# 🚀 Guia Completo de Deploy - 1000 Videos

Guia passo a passo para fazer deploy da landing page e do Storybook.

---

## 📋 Antes de Começar

### Checklist Pré-Deploy

- [ ] Build local funciona: `npm run build`
- [ ] Todas as 7 variantes testadas
- [ ] Responsivo em mobile/tablet/desktop
- [ ] Vídeo do YouTube carrega corretamente
- [ ] Links de contato (WhatsApp/Telegram) funcionam
- [ ] Analytics configurado (se necessário)

---

## 🎯 Opção 1: Vercel (RECOMENDADO)

A forma mais rápida e fácil para projetos Vite + React.

### Método A: Deploy via GitHub (Automático)

**1. Faça push do código para o GitHub**

```bash
git add .
git commit -m "feat: ready for production deployment"
git push origin main
```

**2. Conecte ao Vercel**

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em **"Add New Project"**
4. Selecione seu repositório `1kv-landing`

**3. Configure o Projeto**

- **Root Directory**: `apps/landing`
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**4. Variáveis de Ambiente (Opcional)**

Se quiser usar Stripe/Supabase reais, adicione:

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_STRIPE_PRICE_ID=price_...
VITE_WHATSAPP_NUMBER=5511999999999
VITE_TELEGRAM_CHANNEL=1kvideos
VITE_SUPPORT_EMAIL=support@1kvideos.com
```

**5. Deploy!**

Clique em **"Deploy"** e aguarde ~2 minutos.

✅ **Pronto!** Seu site estará em: `https://seu-projeto.vercel.app`

### Método B: Deploy via CLI

```bash
# 1. Instale o Vercel CLI
npm install -g vercel

# 2. Entre na pasta do projeto e na landing
cd 1kv-landing/apps/landing

# 3. Faça login
vercel login

# 4. Deploy!
vercel --prod
```

### 🔗 Acessar as Variantes

Depois do deploy, acesse cada variante assim:

**Português (PT-BR):**
- Neo-Brutalist: `https://seu-site.vercel.app?variant=neo_brutalist_ptbr`
- Modern: `https://seu-site.vercel.app?variant=modern_ptbr`
- Production Studio: `https://seu-site.vercel.app?variant=production_studio_ptbr`

**Inglês (EN-US):**
- Neo-Brutalist: `https://seu-site.vercel.app?variant=neo_brutalist`
- Modern: `https://seu-site.vercel.app?variant=modern`
- Premium: `https://seu-site.vercel.app?variant=premium`
- Production Studio (padrão): `https://seu-site.vercel.app`

---

## 📚 Deploy do Storybook (Design System)

### Na Vercel

**1. Crie um projeto separado**

1. No painel da Vercel, clique em **"Add New Project"**
2. Selecione o mesmo repositório
3. Configure:
   - **Project Name**: `1kvideos-storybook`
   - **Root Directory**: `apps/storybook`
   - **Build Command**: `npm run build-storybook`
   - **Output Directory**: `storybook-static`

**2. Deploy**

```bash
npm run build-storybook
cd apps/storybook/storybook-static
vercel --prod
cd ../../..
```

✅ Design system estará em: `https://1kvideos-storybook.vercel.app`

---

## 🌐 Opção 2: Netlify

### Landing Page

**1. Via Interface Web**

1. Acesse [netlify.com](https://netlify.com)
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Conecte ao GitHub
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: `apps/landing`
5. Adicione variáveis de ambiente (se necessário)
6. Clique em **"Deploy"**

**2. Via CLI**

```bash
# Instalar CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd 1kv-landing/apps/landing
npm run build
netlify deploy --prod
```

### Configurar SPA Routing

Crie arquivo `netlify.toml` na raiz:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

---

## 📦 Opção 3: GitHub Pages (Grátis)

**1. Instalar gh-pages**

```bash
npm install --save-dev gh-pages
```

**2. Adicionar scripts no `package.json`**

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**3. Configurar base URL no `vite.config.ts`**

```typescript
export default defineConfig({
  base: '/1kv-landing/', // Nome do seu repositório
  plugins: [react()],
})
```

**4. Deploy**

```bash
npm run deploy
```

✅ Site estará em: `https://seu-usuario.github.io/1kv-landing/`

---

## 🔐 Configurar Variáveis de Ambiente

### Modo Desenvolvimento (já funciona)

O projeto já está configurado para funcionar sem backend:
- Usa implementações mock
- Não precisa de Stripe/Supabase
- Perfeito para testar designs

### Modo Produção (com backend real)

**No painel da Vercel/Netlify**, adicione:

```bash
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_live_...
VITE_STRIPE_PRICE_ID=price_...

# Contato
VITE_WHATSAPP_NUMBER=5511999999999
VITE_TELEGRAM_CHANNEL=1kvideos
VITE_SUPPORT_EMAIL=support@1kvideos.com

# App Config
VITE_APP_VERSION=0.1.0
VITE_EARLY_ADOPTER_PRICE=89.90
VITE_REGULAR_PRICE=197
VITE_CURRENCY=BRL
VITE_EARLY_ADOPTER_DURATION=3 meses
```

**⚠️ IMPORTANTE**: Todas as variáveis devem começar com `VITE_`

---

## 🌍 Adicionar Domínio Próprio

### Vercel

1. Vá em **Settings** → **Domains**
2. Adicione seu domínio (ex: `1kvideos.com`)
3. Configure DNS no seu registrador:

**Método A: A Records**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Método B: CNAME (se disponível)**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### Netlify

1. Vá em **Domain settings**
2. Adicione domínio customizado
3. Siga instruções para configurar DNS

---

## 🎨 Deploy de Variantes Separadas (Avançado)

Se quiser cada variante em um subdomínio:

### Opção A: Múltiplos Projetos Vercel

1. **Crie 7 projetos no Vercel** (um para cada variante)
2. Configure cada um com uma variável de ambiente diferente

```bash
# Para cada projeto, defina:
VITE_DEFAULT_VARIANT=neo_brutalist_ptbr
```

3. Configure subdomínios:
   - `neo.1kvideos.com` → Projeto Neo-Brutalist
   - `modern.1kvideos.com` → Projeto Modern
   - `premium.1kvideos.com` → Projeto Premium
   - etc.

### Opção B: Redirects (Mais Simples)

Configure no `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/neo",
      "destination": "/?variant=neo_brutalist_ptbr"
    },
    {
      "source": "/modern",
      "destination": "/?variant=modern_ptbr"
    },
    {
      "source": "/premium",
      "destination": "/?variant=premium"
    }
  ]
}
```

---

## 📊 Analytics & Monitoramento

### Google Analytics

Adicione no `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Vercel Analytics

Já está incluído automaticamente em projetos Vercel.

---

## ⚡ Otimizações de Performance

### Cache Headers (Vercel)

Crie `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Compressão

Vercel e Netlify já fazem compressão automática (gzip/brotli).

---

## 🐛 Troubleshooting

### "Build failed"

```bash
# Limpe e reinstale
rm -rf node_modules package-lock.json
npm install
npm run build
```

### "Page not found" nas variantes

- Certifique-se que está usando `?variant=nome` na URL
- Verifique se o `vercel.json` ou `netlify.toml` está configurado para SPA

### Vídeo não carrega

- Verifique se a URL do YouTube está correta
- Teste em modo anônimo (pode ser bloqueador)

### Variáveis de ambiente não funcionam

- Todas devem começar com `VITE_`
- Re-deploy após adicionar novas variáveis
- Limpe cache do build

---

## 📈 Próximos Passos

Após o deploy:

1. ✅ Teste todas as variantes
2. ✅ Configure Google Analytics
3. ✅ Adicione domínio próprio
4. ✅ Configure SSL (automático na Vercel/Netlify)
5. ✅ Teste performance com Lighthouse
6. ✅ Configure Stripe webhooks (se usar Stripe real)
7. ✅ Teste formulários de contato

---

## 📞 Precisa de Ajuda?

- **Documentação Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Documentação Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Documentação Vite**: [vitejs.dev](https://vitejs.dev)
- **Suporte Vercel**: [vercel.com/support](https://vercel.com/support)

---

## 🎉 Pronto!

Recomendação: **Use Vercel** - é a forma mais rápida e com melhor integração para Vite + React.

Boa sorte com seu lançamento! 🚀
