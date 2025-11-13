import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Shared colors
        primary: {
          DEFAULT: 'hsl(214, 84%, 56%)',
          light: 'hsl(214, 100%, 66%)',
          dark: 'hsl(214, 84%, 40%)',
        },
        // Neo-Brutalist (Teal & Purple)
        brutalist: {
          teal: 'hsl(174, 72%, 56%)',
          'teal-dark': 'hsl(174, 72%, 40%)',
          purple: 'hsl(271, 76%, 53%)',
          'purple-dark': 'hsl(271, 76%, 40%)',
          success: 'hsl(120, 100%, 40%)',
          danger: 'hsl(0, 100%, 50%)',
        },
        // Modern/Clean (Coral & Amber)
        modern: {
          coral: 'hsl(11, 93%, 64%)',
          'coral-light': 'hsl(11, 93%, 74%)',
          'coral-dark': 'hsl(11, 93%, 54%)',
          amber: 'hsl(38, 92%, 50%)',
          'amber-light': 'hsl(38, 92%, 60%)',
          'amber-dark': 'hsl(38, 92%, 40%)',
          muted: 'hsl(220, 13%, 60%)',
        },
        // Production Studio
        studio: {
          bg: 'hsl(220, 13%, 12%)',
          'bg-elevated': 'hsl(220, 13%, 18%)',
          'bg-card': 'hsl(220, 13%, 16%)',
          foreground: 'hsl(0, 0%, 98%)',
          muted: 'hsl(220, 8%, 50%)',
          'accent-red': 'hsl(0, 100%, 60%)',
          'accent-green': 'hsl(120, 50%, 50%)',
        },
        // Premium (Indigo & Cyan)
        premium: {
          indigo: 'hsl(239, 84%, 67%)',
          'indigo-light': 'hsl(239, 84%, 77%)',
          'indigo-dark': 'hsl(239, 84%, 57%)',
          cyan: 'hsl(189, 94%, 43%)',
          'cyan-light': 'hsl(189, 94%, 53%)',
          'cyan-dark': 'hsl(189, 94%, 33%)',
          muted: 'hsl(220, 13%, 60%)',
          'bg-gradient': 'hsl(220, 20%, 98%)',
        },
      },
      fontFamily: {
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
        'jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'jetbrains': ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
      },
      boxShadow: {
        'brutalist': '8px 8px 0 0 hsl(0, 0%, 0%)',
        'brutalist-sm': '4px 4px 0 0 hsl(0, 0%, 0%)',
        'modern': '0 4px 20px hsla(220, 13%, 18%, 0.08), 0 0 40px hsla(214, 84%, 56%, 0.15)',
        'modern-lg': '0 10px 40px hsla(220, 13%, 18%, 0.12), 0 0 60px hsla(214, 84%, 56%, 0.2)',
        'premium': '0 8px 30px hsla(239, 84%, 67%, 0.12), 0 2px 12px hsla(189, 94%, 43%, 0.08)',
        'premium-lg': '0 20px 60px hsla(239, 84%, 67%, 0.2), 0 8px 24px hsla(189, 94%, 43%, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
} satisfies Config
