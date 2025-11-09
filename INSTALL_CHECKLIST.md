# Installation Checklist

Use this checklist to verify your 1kvideos landing page is properly set up.

## ✅ Pre-Installation

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] Git installed (optional)
- [ ] Code editor ready (VS Code recommended)

## ✅ Project Setup

- [ ] Navigate to project folder: `cd 1kv-landing`
- [ ] Install dependencies: `npm install`
- [ ] Verify no installation errors
- [ ] Check `node_modules` folder exists

## ✅ Environment Configuration

- [ ] Copy `.env.example` to `.env.local`
- [ ] Open `.env.local` in editor
- [ ] Fill in all required variables (see below)

### Required Environment Variables

#### Supabase (Get from supabase.com)
- [ ] `VITE_SUPABASE_URL` - Your project URL
- [ ] `VITE_SUPABASE_ANON_KEY` - Public anon key

#### Stripe (Get from dashboard.stripe.com)
- [ ] `VITE_STRIPE_PUBLIC_KEY` - Publishable key
- [ ] `VITE_STRIPE_PRICE_ID` - Monthly price ID

#### Contact Info (Your own)
- [ ] `VITE_WHATSAPP_NUMBER` - WhatsApp number
- [ ] `VITE_TELEGRAM_CHANNEL` - Telegram channel name
- [ ] `VITE_SUPPORT_EMAIL` - Support email address

#### App Info (Can use defaults)
- [ ] `VITE_APP_VERSION` - App version (default: 0.1.0)
- [ ] `VITE_EARLY_ADOPTER_PRICE` - Price (default: 20)
- [ ] `VITE_REGULAR_PRICE` - Regular price (default: 49)

## ✅ Supabase Setup

### Create Project
- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Click "New Project"
- [ ] Name: "1kvideos" (or your choice)
- [ ] Set database password
- [ ] Select region
- [ ] Wait for project to initialize

### Get Credentials
- [ ] Go to Project Settings > API
- [ ] Copy Project URL → `VITE_SUPABASE_URL`
- [ ] Copy anon/public key → `VITE_SUPABASE_ANON_KEY`

### Run Migration
- [ ] Go to SQL Editor
- [ ] Click "New query"
- [ ] Copy contents of `supabase/migrations/001_initial_schema.sql`
- [ ] Paste into editor
- [ ] Click "Run"
- [ ] Verify "Success. No rows returned" message

### Verify Tables
- [ ] Go to Table Editor
- [ ] See `users` table
- [ ] See `waitlist` table
- [ ] See `analytics_events` table

## ✅ Stripe Setup

### Create Account
- [ ] Go to [stripe.com](https://stripe.com)
- [ ] Sign up or login
- [ ] Activate your account
- [ ] Switch to Test Mode (toggle in top right)

### Create Product
- [ ] Go to Products
- [ ] Click "Add product"
- [ ] Name: "1kvideos Early Adopter"
- [ ] Description: "Monthly subscription for 1kvideos desktop app"

### Add Price
- [ ] Pricing model: "Standard pricing"
- [ ] Price: $20.00 USD
- [ ] Billing period: Monthly
- [ ] Click "Save product"

### Get Keys
- [ ] Go to Developers > API keys
- [ ] Copy "Publishable key" → `VITE_STRIPE_PUBLIC_KEY`
- [ ] Copy Price ID from product page → `VITE_STRIPE_PRICE_ID`
  - (Starts with `price_`)

## ✅ Development Server

### Start Server
- [ ] Run: `npm run dev`
- [ ] See "Local: http://localhost:5173" message
- [ ] No error messages in terminal

### Test All Variants
- [ ] Open http://localhost:5173 (Production Studio)
- [ ] Page loads without errors
- [ ] Open http://localhost:5173?variant=neo_brutalist
- [ ] Page loads without errors
- [ ] Open http://localhost:5173?variant=modern
- [ ] Page loads without errors

### Browser Console
- [ ] Open browser DevTools (F12)
- [ ] Check Console tab
- [ ] No red error messages
- [ ] May see analytics tracking logs (normal)

## ✅ Functionality Tests

### Navigation
- [ ] Click "Features" link - scrolls to features section
- [ ] Click "How It Works" link - scrolls to section
- [ ] Click "Pricing" link - scrolls to section
- [ ] Mobile menu works (on small screen)

### CTAs (Call-to-Actions)
- [ ] Click "Subscribe Now" button
- [ ] Stripe checkout opens in new tab
- [ ] Checkout shows $20/month price
- [ ] Can close checkout (don't complete payment yet)

### Contact Widget
- [ ] Click floating chat button (bottom right)
- [ ] Widget expands
- [ ] See WhatsApp, Telegram, Email links
- [ ] Links have correct URLs

### Email Capture
- [ ] Enter email in waitlist form
- [ ] Click submit
- [ ] See success message
- [ ] Go to Supabase Table Editor
- [ ] See email in `waitlist` table

### Analytics
- [ ] Go to Supabase Table Editor
- [ ] Open `analytics_events` table
- [ ] See `page_view` events
- [ ] See `section_view` events
- [ ] Variant is tracked correctly

## ✅ Test Checkout Flow

### Complete Test Purchase
- [ ] Click "Subscribe Now"
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Expiry: Any future date (e.g., 12/25)
- [ ] CVC: Any 3 digits (e.g., 123)
- [ ] ZIP: Any 5 digits (e.g., 12345)
- [ ] Click "Subscribe"

### Success Page
- [ ] Redirected to `/success` page
- [ ] See "Welcome to 1000 Videos!" message
- [ ] See download links for Windows, macOS, Linux
- [ ] Session ID displayed
- [ ] "Back to homepage" link works

### Verify in Stripe
- [ ] Go to Stripe Dashboard > Payments
- [ ] See test payment
- [ ] Status: Succeeded

## ✅ Mobile Testing

### Responsive Design
- [ ] Open DevTools (F12)
- [ ] Click device toolbar icon
- [ ] Test iPhone SE (375px)
- [ ] Test iPad (768px)
- [ ] Test Desktop (1440px)

### Mobile Features
- [ ] Hamburger menu appears on mobile
- [ ] Menu opens/closes correctly
- [ ] Images don't overflow
- [ ] Text is readable
- [ ] Buttons are tappable (not too small)

## ✅ Build for Production

### Create Build
- [ ] Run: `npm run build`
- [ ] Build completes without errors
- [ ] See "dist" folder created

### Preview Build
- [ ] Run: `npm run preview`
- [ ] Open preview URL (usually http://localhost:4173)
- [ ] Test all functionality again
- [ ] No console errors

### Build Size Check
- [ ] Check `dist` folder size
- [ ] Should be < 1MB for main bundle
- [ ] Images are optimized

## ✅ SEO & Meta Tags

### View Source
- [ ] Right-click page > "View Page Source"
- [ ] See `<title>` tag
- [ ] See `<meta name="description">` tag
- [ ] See Open Graph tags (`og:title`, etc.)
- [ ] See Twitter Card tags
- [ ] See structured data (JSON-LD)

## ✅ Assets

### Add Your Screenshots
- [ ] Add `/public/app-screenshot.png` (your desktop app)
- [ ] Add `/public/og-image.png` (1200x630 for social sharing)
- [ ] Add `/public/twitter-image.png` (1200x600 for Twitter)
- [ ] Update `/public/favicon.svg` if desired

## ✅ Final Checks

### Code Quality
- [ ] Run: `npm run lint`
- [ ] No critical errors
- [ ] Fix any warnings if desired

### Documentation Review
- [ ] Read README.md
- [ ] Understand deployment process
- [ ] Know how to customize content

### Security
- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets committed to git
- [ ] Stripe is in test mode

## ✅ Ready for Deployment

Once all items are checked:

- [ ] All tests pass
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Checkout works
- [ ] Analytics tracking
- [ ] Content reviewed
- [ ] Assets added

**You're ready to deploy! 🚀**

See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions.

## 🐛 Common Issues

### "Missing Supabase environment variables"
**Fix**: Ensure `.env.local` exists and variables start with `VITE_`

### Stripe checkout opens but shows error
**Fix**: Verify `VITE_STRIPE_PRICE_ID` is correct and exists in Stripe

### Analytics not saving
**Fix**: Check Supabase RLS policies allow public insert on `analytics_events`

### Build fails with TypeScript errors
**Fix**: Run `npm install` again, ensure Node.js is 18+

### Page is blank
**Fix**: Check browser console for errors, verify all imports are correct

## 📞 Need Help?

- Review [README.md](README.md) for detailed docs
- Check [QUICKSTART.md](QUICKSTART.md) for quick setup
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment
- Check browser console for specific errors

---

**Checklist Version**: 1.0
**Last Updated**: 2024-01-XX
