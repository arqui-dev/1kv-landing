# Quick Start Guide

Get your 1kvideos landing page running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)
- Stripe account (test mode is fine)

## Step 1: Install Dependencies

```bash
cd 1kv-landing
npm install
```

## Step 2: Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Get these from supabase.com
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...

# Get these from dashboard.stripe.com
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx...
VITE_STRIPE_PRICE_ID=price_xxx...

# Your contact info
VITE_WHATSAPP_NUMBER=1234567890
VITE_TELEGRAM_CHANNEL=your_channel
VITE_SUPPORT_EMAIL=support@1kvideos.com
```

## Step 3: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a project
2. Go to SQL Editor
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Click "Run"

## Step 4: Set Up Stripe

1. Go to [dashboard.stripe.com/test/products](https://dashboard.stripe.com/test/products)
2. Click "Add product"
3. Name: "1kvideos Early Adopter"
4. Add price: $20/month recurring
5. Copy the Price ID (starts with `price_`)
6. Paste into `.env.local`

## Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## View All Variants

- **Production Studio** (default): http://localhost:5173
- **Neo-Brutalist**: http://localhost:5173?variant=neo_brutalist
- **Modern**: http://localhost:5173?variant=modern

## Test the Checkout Flow

1. Click any "Subscribe" button
2. Use Stripe test card: `4242 4242 4242 4242`
3. Any future expiry date
4. Any CVC code
5. Complete checkout
6. You'll be redirected to the success page

## Next Steps

### Add Your App Screenshot

Replace `/public/app-screenshot.png` with your actual desktop app screenshot.

### Customize Content

Edit the variant files to change text:
- `src/variants/NeoBrutalist.tsx`
- `src/variants/Modern.tsx`
- `src/variants/ProductionStudio.tsx`

### Deploy to Production

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

Quick deploy to Vercel:
```bash
npm install -g vercel
vercel
```

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists
- Check variable names start with `VITE_`
- Restart dev server after changes

### Stripe checkout doesn't open
- Verify `VITE_STRIPE_PUBLIC_KEY` is set
- Check browser console for errors
- Make sure price ID is correct

### Build fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality

# Deployment
vercel               # Deploy to Vercel
netlify deploy       # Deploy to Netlify
```

## File Structure Overview

```
1kv-landing/
├── src/
│   ├── variants/          # 3 landing page designs
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities (Stripe, Supabase, Analytics)
│   ├── pages/            # Success page
│   └── styles/           # Global styles
├── public/               # Static assets
├── supabase/            # Database migrations
└── [config files]       # Various config files
```

## Getting Help

- **Documentation**: See [README.md](README.md)
- **Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Issues**: Check browser console for errors

## What's Included?

✅ 3 professionally designed landing pages
✅ Full Stripe subscription integration
✅ Supabase backend for users and analytics
✅ Email waitlist capture
✅ Contact widget (WhatsApp, Telegram, Email)
✅ Success page with download links
✅ Mobile responsive
✅ SEO optimized
✅ Analytics tracking
✅ Production ready

## Tips for Success

1. **Test on mobile** - Most visitors will be on mobile
2. **A/B test variants** - See which converts best
3. **Monitor analytics** - Check what users click
4. **Update content** - Iterate based on feedback
5. **Add social proof** - Add testimonials when available

---

**You're all set! 🚀**

Start customizing and deploying your landing pages.
