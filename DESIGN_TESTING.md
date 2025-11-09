# Design Testing Mode 🎨

**No backend setup required!** Test all three landing page designs immediately with mock implementations.

## Quick Start (30 seconds)

```bash
cd 1kv-landing
npm install
npm run dev
```

Open http://localhost:5173 in your browser. **That's it!**

## What Works in Mock Mode

✅ **All Visual Designs**
- All three variants display perfectly
- Responsive layouts work
- Animations and interactions functional

✅ **Interactive Elements**
- ✅ Subscribe buttons (shows confirmation dialog)
- ✅ Email waitlist form (simulates submission)
- ✅ Contact widget (all links work)
- ✅ Navigation and scrolling
- ✅ Mobile menu

✅ **Simulated Backend**
- ✅ Mock Stripe checkout (confirmation dialog)
- ✅ Mock Supabase (in-memory storage)
- ✅ Analytics tracking (console logs)
- ✅ Success page after "checkout"

## View All Three Variants

**Production Studio** (Recommended - Default):
```
http://localhost:5173
```

**Neo-Brutalist**:
```
http://localhost:5173?variant=neo_brutalist
```

**Modern/Clean**:
```
http://localhost:5173?variant=modern
```

## Mock Behavior

### Subscribe Button
When you click "Subscribe Now":
1. Alert dialog appears: "Design Preview Mode"
2. Shows: Price $20/month
3. Click OK → Redirected to success page
4. Click Cancel → Stays on page

### Email Waitlist
When you submit email:
1. Console logs the submission
2. Shows success message
3. Stores email in memory (view in browser console)

### Analytics
All interactions are logged to browser console:
- Page views
- Button clicks
- Section scrolls
- Form submissions

**View tracked data:**
Open browser console (F12) and type:
```javascript
mockData()
```

## Console Messages

You'll see these in the browser console:

```
🎨 DESIGN PREVIEW MODE: Using mock implementations
📝 No backend setup required - perfect for testing designs!
💡 To use real backends, set environment variables in .env.local
```

And when you interact:

```
📊 ANALYTICS: cta_click { button_text: 'Subscribe Now', location: 'hero' }
🎨 MOCK: Inserted into waitlist: { email: 'test@example.com', ... }
```

## Testing Checklist

Use this to test each variant:

### Desktop Testing (1920x1080)
- [ ] Hero section looks good
- [ ] Features grid aligned properly
- [ ] Pricing card centered
- [ ] Footer has all links
- [ ] Contact widget positioned correctly

### Tablet Testing (768px)
- [ ] Two-column layouts work
- [ ] Images don't overflow
- [ ] Text is readable
- [ ] Buttons are accessible

### Mobile Testing (375px)
- [ ] Single column layout
- [ ] Hamburger menu works
- [ ] All content is visible
- [ ] Buttons are tappable (min 44px)
- [ ] Contact widget doesn't block content

### Interaction Testing
- [ ] All navigation links scroll smoothly
- [ ] Subscribe button shows mock dialog
- [ ] Email form accepts input
- [ ] Success message appears
- [ ] Mobile menu opens/closes
- [ ] Contact widget expands
- [ ] WhatsApp/Telegram/Email links work

### Cross-Variant Testing
- [ ] Can switch between variants via URL
- [ ] Each variant has distinct styling
- [ ] All variants are responsive
- [ ] No console errors in any variant

## Browser Testing

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Performance Testing

Open DevTools > Lighthouse and check:
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
# Or use a different port
npm run dev -- --port 3000
```

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Blank Page
1. Open browser console (F12)
2. Check for errors
3. Verify you're on Node 18+: `node --version`

### Mock Not Working
Check browser console for:
```
🎨 DESIGN PREVIEW MODE: Using mock implementations
```

If you see errors about missing Supabase/Stripe, the mock system is working correctly - those errors are expected and handled.

## Switch to Real Backend

When ready to use real Stripe/Supabase:

1. **Get Credentials**
   - Supabase: Create project at supabase.com
   - Stripe: Create product at dashboard.stripe.com

2. **Update .env.local**
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_STRIPE_PUBLIC_KEY=pk_test_your_key
   VITE_STRIPE_PRICE_ID=price_your_id
   ```

3. **Restart Dev Server**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

The app will automatically detect credentials and use real implementations!

## Design Feedback

When testing, note:

**What works well:**
- Visual hierarchy
- Color combinations
- Typography choices
- Spacing and layout
- Mobile responsiveness

**What needs improvement:**
- Unclear CTAs
- Too much/little whitespace
- Confusing navigation
- Poor color contrast
- Layout issues on certain sizes

## Next Steps

1. **Test all three variants**
2. **Pick your favorite** (or test with real users)
3. **Customize content** (edit variant files)
4. **Add your app screenshot** (public/app-screenshot.png)
5. **Deploy** (see DEPLOYMENT.md)

## Files You Can Safely Edit

While in design testing mode:

**Content/Copy:**
- `src/variants/NeoBrutalist.tsx`
- `src/variants/Modern.tsx`
- `src/variants/ProductionStudio.tsx`

**Styling:**
- `tailwind.config.ts` (colors, fonts)
- `src/styles/globals.css` (global styles)

**Images:**
- `public/app-screenshot.png`
- `public/og-image.png`
- `public/favicon.svg`

**Configuration:**
- `.env.local` (contact info)

## Mock Implementation Details

The mock system:
- Automatically activates when credentials are missing
- Stores data in memory (resets on page reload)
- Logs all actions to console
- Simulates API delays (200-500ms)
- Provides confirmation dialogs for major actions

**Location:**
- `src/lib/stripe.mock.ts` - Mock Stripe
- `src/lib/supabase.mock.ts` - Mock Supabase
- `src/lib/analytics.mock.ts` - Mock Analytics
- `src/lib/index.ts` - Auto-detection logic

## Production Ready

These mocks are **only for design testing**. When you deploy:
1. Set real environment variables
2. The app automatically uses real implementations
3. No code changes needed!

---

**Happy testing! 🎨**

Need help? Check README.md or QUICKSTART.md
