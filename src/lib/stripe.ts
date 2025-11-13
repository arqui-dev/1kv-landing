import { loadStripe, Stripe } from '@stripe/stripe-js'

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
const stripePriceId = import.meta.env.VITE_STRIPE_PRICE_ID

if (!stripePublicKey) {
  console.warn('Missing Stripe public key')
}

let stripePromise: Promise<Stripe | null> | null = null

export const getStripe = () => {
  if (!stripePromise && stripePublicKey) {
    stripePromise = loadStripe(stripePublicKey)
  }
  return stripePromise
}

export async function redirectToCheckout(email?: string) {
  try {
    const stripe = await getStripe()
    if (!stripe) {
      throw new Error('Stripe failed to load')
    }

    if (!stripePriceId) {
      throw new Error('Stripe price ID not configured')
    }

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin,
      customerEmail: email,
    })

    if (error) {
      throw error
    }
  } catch (err) {
    console.error('Error redirecting to checkout:', err)
    throw err
  }
}

export function getBillingPortalUrl(): string {
  // This would typically be an API endpoint that creates a billing portal session
  // For now, we'll just return a placeholder
  return '/api/create-portal-session'
}
