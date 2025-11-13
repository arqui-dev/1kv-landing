# 1000 Videos Design System

Complete design system documentation with Storybook integration for the 1000 Videos landing page project.

## Quick Start

### Install Storybook

```bash
cd 1kv-landing
npm install --save-dev @storybook/react-vite @storybook/addon-links @storybook/addon-essentials @storybook/addon-interactions storybook
```

### Run Storybook

```bash
npm run storybook
```

This opens the interactive design system documentation at `http://localhost:6006`.

## Design System Structure

### 📁 Files Created

```
1kv-landing/
├── .storybook/
│   ├── main.ts                    # Storybook configuration
│   ├── preview.ts                 # Global settings & Tailwind import
│   └── README.md                  # Storybook documentation
│
└── src/
    └── stories/
        ├── Introduction.stories.mdx    # Welcome page
        ├── ColorPalette.stories.tsx    # Color documentation
        ├── Typography.stories.tsx      # Typography system
        ├── Spacing.stories.tsx         # Spacing & shadows
        └── Components.stories.tsx      # UI components
```

## Design Variants

### 1. Neo-Brutalist (Teal & Purple)
**Target**: Gen-Z creators, bold aesthetic
- **Primary Colors**: Teal `hsl(174, 72%, 56%)`, Purple `hsl(271, 76%, 53%)`
- **Typography**: Space Grotesk (headings), Inter (body), JetBrains Mono (stats)
- **Visual Style**: 4px borders, hard shadows (no blur), minimal rounding
- **Components**: UPPERCASE text, bold borders, rotated badges

**Usage**:
```tsx
<button className="bg-brutalist-teal text-black border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 font-black uppercase rounded-sm">
  CLICK ME
</button>
```

### 2. Modern/Clean (Coral & Amber)
**Target**: Professional content creators
- **Primary Colors**: Coral `hsl(11, 93%, 64%)`, Amber `hsl(38, 92%, 50%)`
- **Typography**: Plus Jakarta Sans (headings), Inter (body)
- **Visual Style**: Generous rounding, soft shadows with glow, glass-morphism
- **Components**: Gradients, backdrop blur, smooth animations

**Usage**:
```tsx
<button className="bg-gradient-to-r from-modern-coral to-modern-amber text-white rounded-xl hover:shadow-modern-lg hover:scale-105 font-semibold">
  Get Started
</button>
```

### 3. Production Studio (Dark Theme)
**Target**: Professional video studios, enterprises
- **Primary Colors**: Very dark `hsl(220, 13%, 12%)`, Blue accent `hsl(214, 84%, 56%)`
- **Typography**: Inter Display (headings), Inter (body), Monospace (stats)
- **Visual Style**: Minimal shadows, 1px borders, sophisticated
- **Components**: Dark backgrounds, blue CTAs only, Netflix-esque

**Usage**:
```tsx
<button className="bg-primary text-white rounded-lg hover:bg-primary-light shadow-lg font-semibold">
  Start Trial
</button>
```

### 4. Premium (Indigo & Cyan)
**Target**: Enterprise customers, serious businesses
- **Primary Colors**: Indigo `hsl(239, 84%, 67%)`, Cyan `hsl(189, 94%, 43%)`
- **Typography**: Plus Jakarta Sans (headings), Inter (body)
- **Visual Style**: Premium shadows, backdrop blur, polished gradients
- **Components**: Colored shadows, glass-morphism, sophisticated effects

**Usage**:
```tsx
<button className="bg-gradient-to-r from-premium-indigo to-premium-cyan text-white rounded-2xl hover:shadow-premium-lg hover:scale-105 font-semibold">
  Start Free Trial
</button>
```

## Design Tokens

### Color Tokens

All colors are defined in HSL format for easy manipulation:

```typescript
// tailwind.config.ts
colors: {
  // Primary (shared)
  primary: {
    DEFAULT: 'hsl(214, 84%, 56%)',
    light: 'hsl(214, 100%, 66%)',
    dark: 'hsl(214, 84%, 40%)',
  },

  // Neo-Brutalist
  brutalist: {
    teal: 'hsl(174, 72%, 56%)',
    purple: 'hsl(271, 76%, 53%)',
    success: 'hsl(120, 100%, 40%)',
    danger: 'hsl(0, 100%, 50%)',
  },

  // Modern/Clean
  modern: {
    coral: 'hsl(11, 93%, 64%)',
    amber: 'hsl(38, 92%, 50%)',
    muted: 'hsl(220, 13%, 60%)',
  },

  // Production Studio
  studio: {
    bg: 'hsl(220, 13%, 12%)',
    foreground: 'hsl(0, 0%, 98%)',
    muted: 'hsl(220, 8%, 50%)',
  },

  // Premium
  premium: {
    indigo: 'hsl(239, 84%, 67%)',
    cyan: 'hsl(189, 94%, 43%)',
    muted: 'hsl(220, 13%, 60%)',
  },
}
```

### Typography Tokens

```typescript
fontFamily: {
  'space-grotesk': ['Space Grotesk', 'sans-serif'],  // Neo-Brutalist
  'jakarta': ['Plus Jakarta Sans', 'sans-serif'],     // Modern/Premium
  'inter': ['Inter', 'sans-serif'],                   // All variants
  'jetbrains': ['JetBrains Mono', 'monospace'],       // Stats/Code
}
```

### Spacing Tokens

```typescript
spacing: {
  'xs': '0.5rem',   // 8px
  'sm': '1rem',     // 16px
  'md': '1.5rem',   // 24px
  'lg': '2rem',     // 32px
  'xl': '3rem',     // 48px
  '2xl': '4rem',    // 64px
  '3xl': '6rem',    // 96px
}
```

### Shadow Tokens

```typescript
boxShadow: {
  'brutalist': '8px 8px 0 0 hsl(0, 0%, 0%)',
  'brutalist-sm': '4px 4px 0 0 hsl(0, 0%, 0%)',
  'modern': '0 4px 20px hsla(220, 13%, 18%, 0.08)',
  'modern-lg': '0 10px 40px hsla(220, 13%, 18%, 0.12)',
  'premium': '0 8px 30px hsla(239, 84%, 67%, 0.12)',
  'premium-lg': '0 20px 60px hsla(239, 84%, 67%, 0.2)',
}
```

## Component Patterns

### Buttons

Each variant has specific button styling:

```tsx
// Neo-Brutalist
<Button className="border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 font-bold uppercase rounded-sm">
  BUTTON TEXT
</Button>

// Modern
<Button className="rounded-xl hover:shadow-modern-lg hover:scale-105 font-semibold">
  Button Text
</Button>

// Premium
<Button className="rounded-2xl hover:shadow-premium-lg hover:scale-105 font-semibold">
  Button Text
</Button>

// Studio
<Button className="rounded-lg shadow-lg hover:bg-primary-light font-semibold">
  Button Text
</Button>
```

### Cards

```tsx
// Neo-Brutalist
<div className="border-4 border-black shadow-brutalist bg-white p-6 hover:translate-x-1 hover:translate-y-1">
  Content
</div>

// Modern/Premium
<div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-modern-lg">
  Content
</div>

// Studio
<div className="bg-studio-bg-card border border-studio-foreground/10 rounded-lg p-6 hover:border-primary">
  Content
</div>
```

### Inputs

```tsx
// Neo-Brutalist
<Input className="border-4 border-black shadow-brutalist font-medium rounded-sm" />

// Modern
<Input className="border border-gray-300 rounded-xl focus:ring-2 focus:ring-modern-coral shadow-sm" />

// Premium
<Input className="bg-white/80 backdrop-blur-sm border border-premium-indigo/20 rounded-xl focus:ring-2 focus:ring-premium-indigo shadow-premium" />

// Studio
<Input className="bg-studio-bg-card border border-studio-foreground/10 rounded-lg text-white focus:border-primary" />
```

## Best Practices

### 1. Color Usage
- ✅ Use design tokens from Tailwind config
- ✅ Maintain WCAG AA contrast ratios (4.5:1 for text)
- ❌ Don't create custom colors outside the token system
- ❌ Don't mix colors from different variants

### 2. Typography
- ✅ Use variant-appropriate font families
- ✅ Establish clear hierarchy with size and weight
- ✅ Use `leading-relaxed` for body text, `leading-tight` for headings
- ❌ Don't use more than 3 font sizes per section

### 3. Spacing
- ✅ Use the spacing scale for all margins and padding
- ✅ Be consistent with spacing within a variant
- ✅ Use larger spacing for major sections
- ❌ Don't use arbitrary spacing values

### 4. Components
- ✅ Follow variant-specific component patterns
- ✅ Provide clear hover and focus states
- ✅ Test on real devices for responsiveness
- ❌ Don't mix component styles from different variants

## Storybook Features

### Color Palette
- Visual swatches for all colors
- HSL values displayed
- Usage guidelines per variant
- Gradient examples

### Typography
- Font family specimens
- Complete type scale
- Font weight demonstrations
- Variant-specific examples

### Spacing
- Visual spacing scale
- Shadow demonstrations
- Border radius examples
- Layout pattern examples

### Components
- Button variants and sizes
- Input field styles
- Card components
- Badge/label patterns

## Deployment

### Build Storybook for Production

```bash
npm run build-storybook
```

This creates a static site in `storybook-static/` that can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Automated Deployment

Add to `.github/workflows/storybook.yml`:

```yaml
name: Deploy Storybook
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build-storybook
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static
```

## Resources

- **Storybook**: http://localhost:6006 (when running)
- **Tailwind Config**: `tailwind.config.ts`
- **Color Docs**: Browse "Design System/Colors" in Storybook
- **Typography Docs**: Browse "Design System/Typography" in Storybook

## Maintenance

### Adding New Colors

1. Update `tailwind.config.ts`:
```typescript
colors: {
  'new-variant': {
    primary: 'hsl(...)',
    secondary: 'hsl(...)',
  }
}
```

2. Document in `ColorPalette.stories.tsx`
3. Add usage examples

### Adding New Components

1. Create component in `src/components/`
2. Add story in `src/stories/`
3. Document usage patterns
4. Add variant-specific examples

## Support

For questions about the design system:
- Check Storybook documentation
- Review this README
- Contact the design team

---

**Version**: 0.1.0
**Last Updated**: 2025-01
**Maintained by**: 1000 Videos Design Team
