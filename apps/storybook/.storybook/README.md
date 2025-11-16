# 1000 Videos Design System - Storybook

This Storybook installation provides comprehensive documentation for the 1000 Videos design system, covering all four design variants and their associated design tokens.

## Installation

To install Storybook dependencies, run:

```bash
npm install --save-dev @storybook/react-vite @storybook/addon-links @storybook/addon-essentials @storybook/addon-interactions storybook
```

## Running Storybook

Start the Storybook development server:

```bash
npm run storybook
```

This will open Storybook at `http://localhost:6006`.

## Build Storybook

To build a static version of Storybook:

```bash
npm run build-storybook
```

The built files will be in the `storybook-static` directory and can be deployed to any static hosting service.

## Design System Structure

### 1. Colors (`ColorPalette.stories.tsx`)
- Primary colors (shared across variants)
- Neo-Brutalist colors (Teal & Purple)
- Modern/Clean colors (Coral & Amber)
- Production Studio colors (Dark theme)
- Premium colors (Indigo & Cyan)
- Gradient examples and usage guidelines

### 2. Typography (`Typography.stories.tsx`)
- Font families (Space Grotesk, Plus Jakarta Sans, Inter, JetBrains Mono)
- Heading scale (text-7xl to text-xl)
- Body text scale (text-lg to text-xs)
- Font weights (normal to black)
- Variant-specific typography patterns

### 3. Spacing (`Spacing.stories.tsx`)
- Spacing scale (xs to 3xl)
- Shadow system (brutalist, modern, premium)
- Border radius tokens
- Layout patterns and component spacing
- Variant-specific spacing rules

### 4. Components (`Components.stories.tsx`)
- Button variants for each design style
- Button sizes (sm, default, lg)
- Input field styles
- Card components
- Badges and labels
- Usage best practices

## Design Variants

### Neo-Brutalist
- **Colors**: Teal & Purple accents
- **Typography**: Space Grotesk (headings), Inter (body)
- **Spacing**: 4px borders, hard shadows, minimal rounding
- **Target**: Gen-Z creators, bold aesthetic

### Modern/Clean
- **Colors**: Coral & Amber gradients
- **Typography**: Plus Jakarta Sans (headings), Inter (body)
- **Spacing**: Generous rounding (2xl), soft shadows
- **Target**: Professional content creators

### Production Studio
- **Colors**: Dark theme with blue accent
- **Typography**: Inter Display (headings), Inter (body)
- **Spacing**: Minimal shadows, 1px borders
- **Target**: Serious video professionals

### Premium
- **Colors**: Indigo & Cyan gradients
- **Typography**: Plus Jakarta Sans (headings), Inter (body)
- **Spacing**: Premium shadows, backdrop blur
- **Target**: Enterprise customers

## Adding New Stories

Create a new `.stories.tsx` file in `src/stories/`:

```typescript
import type { Meta, StoryObj } from '@storybook/react'

const MyComponent = () => {
  return <div>Your component</div>
}

const meta: Meta<typeof MyComponent> = {
  title: 'Design System/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
```

## Tailwind Integration

All design tokens are defined in `tailwind.config.ts` and automatically available in Storybook through the preview configuration that imports `globals.css`.

## Best Practices

1. **Consistency**: Stay within the design token system
2. **Accessibility**: Maintain WCAG AA contrast ratios
3. **Responsiveness**: Design mobile-first
4. **Performance**: Optimize for fast load times
5. **Documentation**: Update stories when adding new patterns

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [HSL Color Format](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl)

## Support

For questions or issues with the design system, contact the development team or create an issue in the project repository.
