# 1kvideos Landing Pages

Three professionally designed landing page variants for **1000 Videos (1kvideos)** - a desktop application for creating faceless videos at scale.

## 🎨 Variants

All three variants are production-ready with full Stripe integration, Supabase backend, and analytics tracking:

### 1. Neo-Brutalist (`?variant=neo_brutalist`)
- **Design:** Bold, anti-corporate aesthetic with hard edges and high contrast
- **Target:** Gen-Z creators and the creator economy
- **Colors:** Bright yellow accents, pure black borders, white background
- **Typography:** Space Grotesk (headings), Inter (body), JetBrains Mono (stats)
- **Vibe:** Chaotic energy, maximum impact

### 2. Modern/Clean (`?variant=modern`)
- **Design:** Premium SaaS aesthetic with soft gradients and glass-morphism
- **Target:** Professional content creators
- **Colors:** Blue-to-coral gradients, soft shadows, subtle animations
- **Typography:** Plus Jakarta Sans (headings), Inter (body)
- **Vibe:** Polished, conversion-optimized

### 3. Production Studio (`?variant=production_studio`) ⭐ **Recommended**
- **Design:** Monochrome elegance with strategic blue accent pops
- **Target:** Serious video creators and professionals
- **Colors:** Dark theme with minimal color (Netflix-esque)
- **Typography:** Inter Display (headings), Inter (body), Monospace (stats)
- **Vibe:** Professional, sophisticated, focused

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (20.19+ or 22.12+ recommended for Vite 7)
- npm or yarn
- Supabase account
- Stripe account

### Installation

```bash
# Clone the repository
cd 1kv-landing

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your credentials
nano .env.local
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key_here
VITE_STRIPE_PRICE_ID=price_your_price_id_here

# Communication Channels
VITE_WHATSAPP_NUMBER=1234567890
VITE_TELEGRAM_CHANNEL=your_channel_name
VITE_SUPPORT_EMAIL=support@1kvideos.com

# App Configuration
VITE_APP_VERSION=0.1.0
VITE_EARLY_ADOPTER_PRICE=20
VITE_REGULAR_PRICE=49
```

## 🧱 Monorepo Layout

This repository is now a frontend monorepo with two workspaces:

- `apps/landing`: Vite-powered marketing site and Supabase/Stripe integrations.
- `apps/storybook`: Storybook instance that consumes the shared landing components.

Run all commands from the repo root so the npm workspace tooling can target the correct app (for example, `npm run dev:landing` or `npm run dev:storybook`). Any documentation references to `src/...` now map to `apps/landing/src/...` unless otherwise noted.

### Development

```bash
# Start landing page (http://localhost:5173)
npm run dev

# Start Storybook (http://localhost:6006)
npm run storybook

# Open in browser
# Default: http://localhost:5173
# Neo-Brutalist: http://localhost:5173?variant=neo_brutalist
# Modern: http://localhost:5173?variant=modern
# Production Studio: http://localhost:5173?variant=production_studio
```

### Build

```bash
# Type check and build the landing page
npm run build

# Preview production build
npm run preview

# Build the Storybook design system
npm run build-storybook
```

## 📊 Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the project URL and anon key

### 2. Run Migrations

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

Alternatively, run the SQL in `supabase/migrations/001_initial_schema.sql` directly in the Supabase SQL editor.

### 3. Database Schema

The migration creates three tables:

- **`users`**: Subscription and account information
- **`waitlist`**: Email signups before conversion
- **`analytics_events`**: User interaction tracking

## 💳 Stripe Setup

### 1. Create a Product

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/products)
2. Create a new product: "1kvideos Early Adopter"
3. Add a recurring price: $20/month
4. Copy the Price ID (starts with `price_`)

### 2. Configure Webhooks (Production)

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the webhook signing secret

### 3. Test Mode

For development, use Stripe test mode:
- Use test API keys (starting with `pk_test_` and `sk_test_`)
- Use test price IDs
- Use [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhooks locally

## 🎯 A/B Testing

To A/B test variants:

### Option 1: URL Parameters
Direct users to different URLs:
- `https://yourdomain.com?variant=neo_brutalist`
- `https://yourdomain.com?variant=modern`
- `https://yourdomain.com?variant=production_studio`
- New modern/brutalist info-flow variants:
  - `https://yourdomain.com?variant=modern_dark`
  - `https://yourdomain.com?variant=modern_studio`

### Option 2: Client-Side Split
Modify `apps/landing/src/App.tsx` to randomly assign variants:

```typescript
const variants = ['neo_brutalist', 'modern', 'production_studio']
const randomVariant = variants[Math.floor(Math.random() * variants.length)]
setVariant(randomVariant as Variant)
```

For tests that should include the modern/brutalist information flow, extend the pool:

```typescript
const variants = [
  'modern',
  'modern_dark',
  'modern_studio',
]
```

### Option 3: Server-Side (Recommended for Production)
Use a service like:
- Vercel Edge Config
- Cloudflare Workers
- Custom middleware

## 📈 Analytics

Analytics are tracked automatically via `apps/landing/src/lib/analytics.ts`:

### Tracked Events
- `page_view`: Initial page load
- `section_view`: When 50%+ of a section is visible
- `cta_click`: Any CTA button click
- `contact_widget_open`: Contact widget opened
- `contact_channel_click`: WhatsApp/Telegram/Email clicked
- `waitlist_signup`: Email submitted to waitlist
- `checkout_initiated`: Stripe checkout opened
- `checkout_completed`: Subscription successful
- `checkout_cancelled`: User returned without subscribing

### View Analytics

Query your Supabase database:

```sql
-- Most clicked CTAs
SELECT
  metadata->>'button_text' as button,
  metadata->>'location' as location,
  COUNT(*) as clicks
FROM analytics_events
WHERE event_name = 'cta_click'
GROUP BY button, location
ORDER BY clicks DESC;

-- Variant performance
SELECT
  variant,
  COUNT(DISTINCT metadata->>'session_id') as unique_visitors,
  SUM(CASE WHEN event_name = 'checkout_initiated' THEN 1 ELSE 0 END) as checkouts,
  SUM(CASE WHEN event_name = 'checkout_completed' THEN 1 ELSE 0 END) as conversions
FROM analytics_events
GROUP BY variant;
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Deploy to production
vercel --prod
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Manual Deployment

```bash
# Build the project
npm run build

# Upload the `dist` folder to your hosting provider
# Configure server to serve index.html for all routes (SPA fallback)
```

### SPA Fallback Configuration

For Vercel, create `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

For Netlify, create `public/_redirects`:

```
/*  /index.html  200
```

## 📱 Communication Setup

### WhatsApp Business

1. Get WhatsApp Business account
2. Set `VITE_WHATSAPP_NUMBER` to your number (format: `1234567890`)
3. Link format: `https://wa.me/NUMBER?text=MESSAGE`

### Telegram

1. Create a Telegram channel or group
2. Set `VITE_TELEGRAM_CHANNEL` to your channel username
3. Link format: `https://t.me/CHANNEL`

### Email

Uses `mailto:` links by default. For automated emails:

1. Sign up for [SendGrid](https://sendgrid.com/) or [Resend](https://resend.com/)
2. Create welcome email template
3. Trigger via webhook on `customer.subscription.created`

## 🎨 Customization

### Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: 'hsl(214, 84%, 56%)', // Your brand color
    light: 'hsl(214, 100%, 66%)',
    dark: 'hsl(214, 84%, 40%)',
  },
}
```

### Typography

Add custom fonts in `apps/landing/src/styles/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

### Content

Edit content directly in variant files:
- `apps/landing/src/variants/NeoBrutalist.tsx`
- `apps/landing/src/variants/Modern.tsx`
- `apps/landing/src/variants/ProductionStudio.tsx`

## 🔒 Security

### Environment Variables
- Never commit `.env.local` to version control
- Use different keys for development and production
- Rotate keys regularly

### Supabase RLS
Row-Level Security is enabled by default. Only service role can access user data.

### Stripe
- Use webhook signatures to verify events
- Never expose secret keys in client-side code

## 🧪 Testing

### Manual Testing Checklist

- [ ] All three variants load correctly
- [ ] Mobile responsive on iOS and Android
- [ ] Stripe checkout opens successfully
- [ ] Success page shows after checkout
- [ ] Email capture submits to Supabase
- [ ] Contact widget links work
- [ ] Analytics events track correctly
- [ ] No console errors in production build

### Browser Compatibility

Tested on:
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+
- Mobile Safari (iOS 16+)
- Chrome Mobile (Android 12+)

## 📊 Success Metrics

Track these KPIs to measure variant performance:

1. **Conversion Rate**: Visitors → Subscribers
2. **CTA Click Rate**: Button clicks / Page views
3. **Bounce Rate**: Single-page sessions / Total sessions
4. **Avg. Time on Page**: Engagement indicator
5. **Contact Widget Usage**: Communication channel preference
6. **Mobile vs Desktop**: Device optimization needs

## 🐛 Troubleshooting

### Vite build fails
- Ensure Node.js version is 18+
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Stripe checkout doesn't open
- Check `VITE_STRIPE_PUBLIC_KEY` is set correctly
- Verify price ID exists in Stripe dashboard
- Check browser console for errors

### Analytics not tracking
- Verify Supabase RLS policies allow public insert
- Check network tab for failed requests
- Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct

### Contact widget links not working
- Verify environment variables are set
- Check that WhatsApp number has no spaces or special characters
- Ensure Telegram channel is public

## 📝 License

This project is proprietary. All rights reserved.

## 🤝 Support

- **Email**: support@1kvideos.com
- **Telegram**: Join our community channel
- **Documentation**: This README

## 🎯 Roadmap

Future enhancements:
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Video testimonials integration
- [ ] Live chat widget
- [ ] Referral program
- [ ] Affiliate system

---

**Built with ❤️ for content creators worldwide**
