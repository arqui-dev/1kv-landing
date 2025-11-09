# Deployment Guide

Complete guide for deploying 1kvideos landing pages to production.

## Pre-Deployment Checklist

### 1. Environment Variables
- [ ] Set all production environment variables
- [ ] Use production Supabase keys
- [ ] Use production Stripe keys
- [ ] Verify all URLs are correct

### 2. Assets
- [ ] Add app screenshot to `/public/app-screenshot.png`
- [ ] Add Open Graph image to `/public/og-image.png` (1200x630)
- [ ] Add Twitter card image to `/public/twitter-image.png` (1200x600)
- [ ] Update favicon if needed

### 3. Content Review
- [ ] Review all copy for typos
- [ ] Verify pricing is correct
- [ ] Check all links work
- [ ] Test email addresses
- [ ] Verify contact numbers

### 4. Technical
- [ ] Run `npm run build` successfully
- [ ] Test production build locally with `npm run preview`
- [ ] Verify no console errors
- [ ] Check mobile responsiveness
- [ ] Test all three variants

## Deployment Options

### Option 1: Vercel (Recommended)

**Pros:**
- Zero config deployment
- Automatic HTTPS
- CDN by default
- Environment variable management
- Preview deployments for branches

**Steps:**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy to Preview**
```bash
vercel
```

4. **Set Environment Variables**
Go to your project dashboard > Settings > Environment Variables

Add all variables from `.env.example`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLIC_KEY`
- `VITE_STRIPE_PRICE_ID`
- etc.

5. **Deploy to Production**
```bash
vercel --prod
```

6. **Configure Custom Domain** (Optional)
- Go to project dashboard > Settings > Domains
- Add your custom domain
- Update DNS records as instructed

**Vercel Configuration**

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/(.*)\\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)",
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

### Option 2: Netlify

**Pros:**
- Simple deployment
- Form handling built-in
- Split testing built-in
- Good documentation

**Steps:**

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login**
```bash
netlify login
```

3. **Initialize**
```bash
netlify init
```

4. **Configure Build Settings**
```
Build command: npm run build
Publish directory: dist
```

5. **Set Environment Variables**
```bash
netlify env:set VITE_SUPABASE_URL "your_value"
netlify env:set VITE_SUPABASE_ANON_KEY "your_value"
# ... repeat for all variables
```

6. **Deploy**
```bash
netlify deploy --prod
```

**Netlify Configuration**

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

Create `public/_redirects`:
```
/*  /index.html  200
```

### Option 3: Cloudflare Pages

**Pros:**
- Fast global CDN
- Built-in analytics
- Workers for advanced functionality
- Free tier is generous

**Steps:**

1. Push code to GitHub/GitLab

2. Go to Cloudflare Dashboard > Pages

3. Click "Create a project" > "Connect to Git"

4. Select your repository

5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

6. Add environment variables in dashboard

7. Click "Save and Deploy"

**Cloudflare Configuration**

No config file needed, but you can create `_headers` in `/public`:

```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

### Option 4: AWS S3 + CloudFront

**Pros:**
- Full control
- Scalable
- Integration with other AWS services

**Steps:**

1. **Build the project**
```bash
npm run build
```

2. **Create S3 Bucket**
```bash
aws s3 mb s3://1kvideos-landing
```

3. **Upload files**
```bash
aws s3 sync dist/ s3://1kvideos-landing --delete
```

4. **Configure bucket for static hosting**
```bash
aws s3 website s3://1kvideos-landing --index-document index.html --error-document index.html
```

5. **Create CloudFront Distribution**
- Origin: Your S3 bucket
- Default root object: `index.html`
- Custom error response: 404 → /index.html (200)

6. **Configure SSL certificate** via AWS Certificate Manager

### Option 5: DigitalOcean App Platform

**Pros:**
- Simple setup
- Affordable
- Good for small-medium projects

**Steps:**

1. Push code to GitHub

2. Go to DigitalOcean Dashboard > Apps

3. Click "Create App" > Select GitHub repo

4. Configure:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`

5. Add environment variables

6. Click "Deploy"

## Post-Deployment

### 1. DNS Configuration

If using a custom domain:

**For Vercel:**
- Add A record: `76.76.21.21`
- Add CNAME record: `cname.vercel-dns.com`

**For Netlify:**
- Add A record: `75.2.60.5`
- Add CNAME record: `yoursite.netlify.app`

**For Cloudflare Pages:**
- Automatic if domain is on Cloudflare

### 2. SSL Certificate

All recommended platforms provide automatic SSL:
- Vercel: Automatic via Let's Encrypt
- Netlify: Automatic via Let's Encrypt
- Cloudflare: Automatic
- AWS: Via Certificate Manager

### 3. Verify Deployment

**Checklist:**
- [ ] Visit all three variant URLs
- [ ] Test Stripe checkout
- [ ] Verify success page loads
- [ ] Check analytics tracking works
- [ ] Test contact widget links
- [ ] Verify mobile responsiveness
- [ ] Check page load speed (< 3 seconds)
- [ ] Test on different browsers

**Tools:**
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

### 4. Monitoring

**Set up monitoring for:**
- Uptime (UptimeRobot, Pingdom)
- Error tracking (Sentry)
- Analytics (Supabase queries)
- Performance (Lighthouse CI)

### 5. Stripe Webhooks

**Production webhook setup:**

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook signing secret
5. Add to environment variables as `STRIPE_WEBHOOK_SECRET`

**Note:** You'll need to create an API route to handle webhooks. Example for Vercel:

Create `api/webhooks/stripe.ts`:

```typescript
import { buffer } from 'micro'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const sig = req.headers['stripe-signature']
  const buf = await buffer(req)

  let event

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
      // Create user in Supabase
      break
    case 'customer.subscription.updated':
      // Update subscription status
      break
    case 'customer.subscription.deleted':
      // Mark as churned
      break
  }

  res.json({ received: true })
}
```

## Rollback Procedure

If deployment fails:

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Netlify
```bash
# List deployments
netlify deploy:list

# Restore previous deploy
netlify deploy:restore [deploy-id]
```

### Manual
1. Revert to previous git commit
2. Rebuild: `npm run build`
3. Redeploy

## Performance Optimization

### 1. Image Optimization

Use modern formats:
```bash
# Convert to WebP
cwebp app-screenshot.png -o app-screenshot.webp
```

### 2. Code Splitting

Vite automatically code-splits. To improve:
```typescript
// Use dynamic imports for heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

### 3. CDN Caching

Ensure static assets are cached:
- CSS/JS: 1 year (`max-age=31536000`)
- Images: 1 month (`max-age=2592000`)
- HTML: No cache or short cache

### 4. Compression

All platforms automatically serve gzipped/brotli files.

## Security Hardening

### 1. Environment Variables

Never commit:
- `.env.local`
- `.env.production`
- Any file with secrets

### 2. Content Security Policy

Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://api.stripe.com;">
```

### 3. Rate Limiting

Implement rate limiting for:
- Waitlist signups
- Contact form submissions

Use Cloudflare or implement in API routes.

## Troubleshooting Deployment

### Build fails
- Check Node.js version (18+)
- Verify all dependencies in `package.json`
- Run `npm run build` locally first

### Environment variables not working
- Ensure they start with `VITE_`
- Rebuild after changing variables
- Check platform-specific syntax

### 404 on page refresh
- Missing SPA fallback configuration
- Check `vercel.json` or `netlify.toml`

### Stripe checkout not working
- Verify public key is correct
- Check browser console for errors
- Ensure price ID exists

## Cost Estimation

**Vercel:**
- Free tier: Generous (100GB bandwidth)
- Pro: $20/month (unlimited bandwidth)

**Netlify:**
- Free tier: 100GB bandwidth
- Pro: $19/month (unlimited bandwidth)

**Cloudflare Pages:**
- Free tier: Unlimited requests
- Paid: $20/month for advanced features

**AWS:**
- Variable based on traffic
- Estimate: $5-50/month for small-medium sites

## Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- Cloudflare: [cloudflare.com/support](https://cloudflare.com/support)
