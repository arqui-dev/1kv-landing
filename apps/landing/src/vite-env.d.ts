/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_STRIPE_PUBLIC_KEY?: string
  readonly VITE_STRIPE_PRICE_ID?: string
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_TELEGRAM_CHANNEL?: string
  readonly VITE_TELEGRAM_LINK?: string
  readonly VITE_SUPPORT_EMAIL?: string
  readonly VITE_APP_VERSION?: string
  readonly VITE_EARLY_ADOPTER_PRICE?: string
  readonly VITE_REGULAR_PRICE?: string
  readonly VITE_CURRENCY?: string
  readonly VITE_EARLY_ADOPTER_DURATION?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
