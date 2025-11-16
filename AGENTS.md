# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Cursor, GitHub Copilot, etc.) when working with code in this repository.

---

## Documentation Structure

This repository uses a structured documentation approach to serve both AI agents and human developers:

### Documentation Hierarchy

```
/
├── AGENTS.md (this file)          # Quick reference for AI agents
├── README.md                       # Project overview and setup
└── docs/                          # Comprehensive documentation
    ├── ai/                        # AI agent-specific guides
    │   ├── workflows/             # Common development workflows
    │   ├── architecture/          # Deep-dive architecture docs
    │   └── context/               # Additional context files
    └── dev/                       # Human developer documentation
        ├── guides/                # Step-by-step guides
        ├── api/                   # API references
        └── troubleshooting/       # Common issues and solutions
```

### How to Use Documentation

**For AI Agents:**
- Start with this file (AGENTS.md) for quick reference
- Consult `/docs/ai/` for detailed workflows and architecture
- Use `/docs/ai/context/` for additional project context

**For Human Developers:**
- Start with README.md for setup instructions
- Refer to `/docs/dev/guides/` for comprehensive tutorials
- Check `/docs/dev/troubleshooting/` when encountering issues

---

## Project Overview

1000 Videos (1kvideos) landing page variants - a React + TypeScript + Vite application showcasing multiple professionally designed landing page variants for a desktop application that creates faceless videos at scale.

**Product:** 1000 Videos (1kvideos)
**Version:** v0.1.0 (Early Adopter Phase)
**Target Audience:** Content creators making faceless videos (news commentary, educational content, AI voiceover channels)

### Pricing by Region

**PT-BR (Brazil):**
- Early Bird: R$ 89,90 for 3 months
- Regular: R$ 197/month

**EN-US (International):**
- Early Adopter: $20/month
- Regular: $49/month

---

## Technical Stack

### Core Technologies
- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (with custom design tokens)
- **Backend:** Supabase
  - Authentication (OAuth + email)
  - PostgreSQL database (user data, waitlist, analytics events)
  - Storage (for uploaded assets)
- **Payments:** Stripe
  - Subscription checkout
  - Billing portal link
  - Webhook handlers for subscription events
- **Communication:**
  - WhatsApp Business API (contact button)
  - Telegram (community link)
  - Email (SendGrid or Resend for notifications)
- **Design System:** Storybook (runs on port 6006)

### Project Structure
```
1kv-landing/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ContactWidget.tsx (widget flutuante)
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CTA.tsx
│   │   └── ui/ (componentes shadcn)
│   ├── lib/
│   │   ├── supabase.ts (configuração do client)
│   │   ├── supabase.mock.ts (implementação mock)
│   │   ├── stripe.ts (helpers de checkout)
│   │   ├── stripe.mock.ts (implementação mock)
│   │   ├── analytics.ts (rastreamento de eventos)
│   │   ├── analytics.mock.ts (implementação mock)
│   │   └── index.ts (sistema de auto-detecção)
│   ├── styles/
│   │   └── globals.css
│   ├── variants/
│   │   ├── NeoBrutalist.tsx (EN-US, cores teal & purple)
│   │   ├── Modern.tsx (EN-US, cores orange & purple)
│   │   ├── ProductionStudio.tsx (EN-US, tema dark)
│   │   └── pt-br/
│   │       ├── NeoBrutalistPTBR.tsx (PT-BR, cores teal & purple)
│   │       ├── ModernPTBR.tsx (PT-BR, cores orange & purple)
│   │       └── ProductionStudioPTBR.tsx (PT-BR, tema dark)
│   └── App.tsx
├── supabase/
│   └── migrations/ (definições de schema)
└── tailwind.config.ts (tokens de design)
```

---

## Design Variants

### 4 Design Styles × 2 Languages = 8+ Landing Pages

The application uses a URL-parameter-based variant system. Access variants via `?variant=variant_name`.

#### Variant 1: Neo-Brutalist (Teal & Purple)
- **Design:** Bold, anti-corporate aesthetic with hard edges and high contrast
- **Target:** Gen-Z creators and creator economy
- **Colors:** Vibrant Teal (`hsl(174, 72%, 56%)`) and Purple (`hsl(271, 76%, 53%)`)
- **Typography:** Space Grotesk (headings), Inter (body), JetBrains Mono (stats)
- **Features:**
  - Black borders (3-4px) on all cards, buttons, inputs
  - Hard offset shadows (no blur)
  - Slight rotation on badges and callout boxes (-2deg to 2deg)
  - Minimal corner rounding

#### Variant 2: Modern/Clean (Coral & Amber)
- **Design:** Premium SaaS aesthetic with soft gradients and glass-morphism
- **Target:** Professional content creators
- **Colors:** Coral (`hsl(11, 93%, 64%)`) and Amber (`hsl(38, 92%, 50%)`)
- **Typography:** Plus Jakarta Sans (headings), Inter (body)
- **Features:**
  - Subtle 1px borders or no borders
  - Soft layered shadows with glow
  - Generously rounded corners (rounded-2xl)
  - Glass-morphism with backdrop-blur
  - Smooth animations (hover scale 1.02-1.05)

#### Variant 3: Production Studio (Dark Theme) ⭐ **Default**
- **Design:** Monochrome elegance with strategic blue accents
- **Target:** Serious video creators and professionals
- **Colors:** Dark theme with blue accent (`hsl(214, 84%, 56%)`) only for CTAs
- **Typography:** Inter Display (headings), Inter (body), Monospace (stats)
- **Features:**
  - Very dark background (`hsl(220, 13%, 12%)`)
  - Minimal color usage (blue for CTAs only)
  - 1px borders with low opacity
  - Minimal shadows
  - Netflix-esque sophistication

#### Variant 4: Premium (Indigo & Cyan)
- **Design:** Premium gradients with glass-morphism
- **Target:** Enterprise customers
- **Colors:** Indigo (`hsl(239, 84%, 67%)`) and Cyan (`hsl(189, 94%, 43%)`)
- **Typography:** Plus Jakarta Sans (headings), Inter (body)
- **Features:**
  - Premium shadows with backdrop blur
  - Gradient backgrounds
  - Sophisticated color palette

### Language Support

**Accessing variants:**
- English: `?variant=neo_brutalist`, `?variant=modern`, `?variant=production_studio`, `?variant=premium`
- Portuguese: `?variant=neo_brutalist_ptbr`, `?variant=modern_ptbr`, `?variant=production_studio_ptbr`

---

## Mock System Architecture

### Auto-Detection
The app automatically detects if backend credentials are available:
- **No credentials?** → Uses mock implementations (perfect for testing designs)
- **With credentials?** → Uses real Stripe/Supabase

**File:** `src/lib/index.ts`

### Mock Implementations
All mocks simulate real behavior:
- **Stripe Mock** (`stripe.mock.ts`): Confirmation dialog + redirection
- **Supabase Mock** (`supabase.mock.ts`): In-memory storage + validation
- **Analytics Mock** (`analytics.mock.ts`): Console logging + tracking

**Mock Mode Active:**
```
🎨 DESIGN PREVIEW MODE: Using mock implementations
📝 No backend setup required - perfect for testing designs!
```

This allows rapid design iteration without backend setup.

---

## Common Development Commands

### Development
```bash
# Setup
npm install

# Start development server (http://localhost:5173)
npm run dev

# Type check
tsc --noEmit

# Lint code
npm run lint

# Run Storybook design system (http://localhost:6006)
npm run storybook
```

### Building
```bash
# Type check and build for production
npm run build

# Preview production build locally
npm run preview

# Build Storybook
npm run build-storybook
```

### Testing Variants
```bash
# EN-US variants
http://localhost:5173?variant=neo_brutalist
http://localhost:5173?variant=modern
http://localhost:5173?variant=production_studio  # default
http://localhost:5173?variant=premium

# PT-BR variants
http://localhost:5173?variant=neo_brutalist_ptbr
http://localhost:5173?variant=modern_ptbr
http://localhost:5173?variant=production_studio_ptbr
```

---

## Key Architecture Concepts

### Variant System Flow
1. URL parameter checked in `App.tsx` (`useEffect` on mount)
2. Variant stored in component state and localStorage
3. Analytics system automatically tracks variant for all events
4. IntersectionObserver set up to track section views (50% threshold)

**Key files:**
- `src/App.tsx` - Main entry point, variant detection and routing
- `src/variants/` - Each variant implementation
- `src/variants/pt-br/` - Portuguese translations

### Analytics Architecture

Custom analytics system tracking user interactions to Supabase:

**Tracked Events:**
- `page_view` - Initial page load
- `section_view` - When 50%+ of section is visible
- `cta_click` - CTA button clicks with location metadata
- `contact_widget_open` - Contact widget expansion
- `contact_channel_click` - WhatsApp/Telegram/Email clicks
- `waitlist_signup` - Email capture submissions
- `checkout_initiated` - Stripe checkout opened
- `checkout_completed` - Successful subscription
- `checkout_cancelled` - User returned without completing

**Implementation:**
- `src/lib/analytics.ts` - Core analytics class with session tracking
- Events include metadata: session_id, timestamp, user_agent, screen dimensions
- Variant automatically attached to all events

**Query Analytics (Supabase SQL):**
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

### Database Schema

Supabase PostgreSQL (`supabase/migrations/001_initial_schema.sql`):

**Tables:**
1. `users` - User accounts with Stripe integration
   - Columns: `stripe_customer_id`, `subscription_status`, `subscription_id`
   - Row-level security enabled (service role only)

2. `waitlist` - Pre-purchase email capture
   - Tracks which variant the user saw
   - Public insert policy for form submissions

3. `analytics_events` - Event tracking
   - JSONB metadata field for flexible event data
   - Public insert policy for client-side tracking
   - Indexes on `event_name` and `variant`

### Component Architecture

**Shared UI Components** (`src/components/ui/`):
- `Button.tsx` - Variants: primary, secondary, outline | Sizes: sm, md, lg
- `Input.tsx` - Form input with error state support

**Layout Components** (`src/components/layout/`):
- `Footer.tsx` - Variant-aware footer
- `ContactWidget.tsx` - Floating contact widget (WhatsApp/Telegram/Email)

**Variant Components** (`src/variants/`):
Self-contained landing pages with their own header, sections, and styling.

### Stripe Integration Flow

1. User clicks CTA → `redirectToCheckout()` called from variant
2. Stripe Checkout loads with pre-configured subscription
3. Success → redirects to `/success?session_id={CHECKOUT_SESSION_ID}`
4. Cancel → returns to landing page
5. Analytics tracked at each step

**Success page** (`src/pages/Success.tsx`):
- Shows download links (Windows, macOS, Linux)
- Displays next steps and support options
- Tracks `checkout_completed` event

---

## Development Workflows

### Adding a New Variant

1. Create variant component in `src/variants/NewVariant.tsx`
2. Add variant type to `App.tsx` type union
3. Add to variant detection logic in `App.tsx` useEffect
4. Import and add to variant switch statement in render
5. Define variant-specific colors in `tailwind.config.ts`
6. Test with URL parameter: `?variant=new_variant`

### Adding New Analytics Events

1. Add event name to `EventName` type in `src/lib/analytics.ts`
2. Call `analytics.track()` with event name and metadata
3. Update mock implementation in `src/lib/analytics.mock.ts`
4. Test in browser console/network tab

### Modifying Database Schema

1. Create new migration file in `supabase/migrations/`
2. Use incremental naming: `002_description.sql`
3. Include both schema changes and RLS policies
4. Test locally with Supabase CLI: `supabase db push`

### Customizing Content

Edit directly in variant files:
- `src/variants/NeoBrutalist.tsx` (EN-US)
- `src/variants/pt-br/NeoBrutalistPTBR.tsx` (PT-BR)
- etc.

### Customizing Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  brutalist: {
    teal: 'hsl(174, 72%, 56%)',
    purple: 'hsl(271, 76%, 53%)',
  },
}
```

---

## Environment Setup

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
# Mock Mode (for design testing without backend setup)
VITE_USE_MOCKS=true

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key_here
VITE_STRIPE_PRICE_ID=your_stripe_price_id_here

# Communication Channels
VITE_WHATSAPP_NUMBER=your_whatsapp_number_here
VITE_TELEGRAM_CHANNEL=your_telegram_channel_here
VITE_SUPPORT_EMAIL=support@1kvideos.com

# App Configuration
VITE_APP_VERSION=0.1.0
VITE_EARLY_ADOPTER_PRICE=89.90
VITE_REGULAR_PRICE=197
VITE_CURRENCY=BRL
VITE_EARLY_ADOPTER_DURATION=3 meses
```

**Important:** All environment variables must be prefixed with `VITE_` and accessed via `import.meta.env`, not `process.env`.

---

## Important Technical Details

### TypeScript Configuration
- Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`
- Path alias: `@/*` → `./src/*` (configured in tsconfig.json and vite.config.ts)
- Target: ES2020 with DOM libraries
- Module resolution: bundler (Vite-optimized)

### Build Considerations
- Vite performs automatic code splitting
- React plugin includes Fast Refresh for development
- Production builds include type checking (`tsc && vite build`)
- All environment variables must be prefixed with `VITE_`

### Styling System
- Tailwind CSS with variant-specific design tokens (`tailwind.config.ts`)
- Custom colors, shadows, spacing scales per variant
- Font families loaded via Google Fonts
- Path alias `@/` for clean imports

### Mobile Responsiveness
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Touch-friendly buttons (minimum 44px tap targets)
- Mobile menu in variant headers
- Contact widget repositions on mobile (bottom-center)

### Video Integration
All variants include demo video embed in Hero:
- **URL:** `https://www.youtube.com/embed/LhzpLcKmJRY`
- **Aspect Ratio:** 16:9 (56.25% padding-bottom)
- **Borders:** Styled according to variant
- **Responsive:** Works on mobile, tablet, desktop

---

## Common Gotchas

1. **Environment variables:** Must be prefixed with `VITE_` and accessed via `import.meta.env`, not `process.env`

2. **Variant switching:** Changing URL parameter requires page reload; variant is cached in localStorage

3. **Analytics session:** New session ID generated on each page load; use session_id in metadata to track user journey

4. **Supabase RLS:** Row-Level Security is enabled; client can only insert to waitlist and analytics_events tables

5. **Stripe test mode:** Use test keys for development; test card 4242 4242 4242 4242 works for all test subscriptions

6. **TypeScript strict mode:** All props must be typed; use proper typing for variant names and event metadata

7. **Tailwind purging:** Only classes that appear in source files will be included in production build; avoid dynamic class construction

8. **Mock mode:** Services automatically fall back to mocks if env vars missing; check console warnings to confirm which mode is active

---

## Testing

### Mock Mode (Default)
```bash
npm run dev
# Opens http://localhost:5173
# Shows message: "🎨 DESIGN PREVIEW MODE"
# All backends mocked
```

### Console Commands
```javascript
// View mocked data
mockData()

// Check current variant
localStorage.getItem('landing_variant')

// Clear data
localStorage.clear()
location.reload()
```

---

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Configure environment variables in Vercel dashboard
# Deploy to production
vercel --prod
```

### Other Platforms
- **Netlify:** `netlify deploy --prod`
- **Cloudflare Pages:** Push to Git and configure in dashboard
- **AWS S3 + CloudFront:** Build and upload to S3

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete guides.

---

## Additional Resources

### Documentation Files
- **README.md** - Project overview and setup instructions
- **PROJECT_SUMMARY.md** - Complete project deliverables
- **DEPLOYMENT.md** - Deployment guides for multiple platforms
- **QUICKSTART.md** - 5-minute setup guide
- **CHANGELOG.md** - Version history
- **DESIGN_TESTING.md** - Design testing documentation
- **.storybook/README.md** - Storybook design system docs

### Support
- **Email:** support@1kvideos.com
- **Telegram:** Community channel
- **WhatsApp Business:** Link in ContactWidget

### For More Information
Refer to `/docs/ai/` for detailed AI agent workflows and architecture documentation.
Refer to `/docs/dev/` for comprehensive developer guides and API references.

---

**Built with ❤️ for content creators worldwide**
