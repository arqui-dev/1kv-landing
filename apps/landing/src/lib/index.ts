// Central imports file that switches between real and mock implementations
// Auto-detects if backend credentials are available

// @ts-ignore - Vite env types
const useMocks = import.meta.env.VITE_USE_MOCKS === 'true' ||
                 // @ts-ignore
                 !import.meta.env.VITE_SUPABASE_URL ||
                 // @ts-ignore
                 !import.meta.env.VITE_STRIPE_PUBLIC_KEY

if (useMocks) {
  console.log('🎨 DESIGN PREVIEW MODE: Using mock implementations')
  console.log('📝 No backend setup required - perfect for testing designs!')
  console.log('💡 To use real backends, set environment variables in .env.local')
}

// Only import mocks when needed to avoid loading real implementations
// that throw errors when credentials are missing

// Re-export from mocks (always safe to import)
export { redirectToCheckout, getBillingPortalUrl } from './stripe.mock'
export { supabase, addToWaitlist, createUser, updateUser } from './supabase.mock'
export { analytics, setupSectionTracking } from './analytics.mock'

// Export types
export type { User, WaitlistEntry, AnalyticsEvent } from './supabase.mock'
export type { EventName, EventMetadata } from './analytics.mock'

// Always export utils
export * from './utils'

// Note: When you add real credentials to .env.local, you'll need to update
// this file to conditionally import real vs mock implementations.
// For design testing, we always use mocks to avoid import errors.
