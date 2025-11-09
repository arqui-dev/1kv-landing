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
        // Neo-Brutalist
        brutalist: {
          accent: 'hsl(48, 100%, 50%)',
          'accent-dark': 'hsl(48, 100%, 40%)',
          success: 'hsl(120, 100%, 40%)',
          danger: 'hsl(0, 100%, 50%)',
        },
        // Modern/Clean
        modern: {
          coral: 'hsl(15, 85%, 55%)',
          'coral-light': 'hsl(15, 90%, 65%)',
          amber: 'hsl(45, 95%, 50%)',
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
