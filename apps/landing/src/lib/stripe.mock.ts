// Mock Stripe implementation for testing designs without backend setup

export async function redirectToCheckout(email?: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  console.log('🎨 MOCK: Stripe checkout would open here')
  console.log('📧 Email:', email || 'Not provided')
  console.log('💳 Price: $20/month')

  // Simulate checkout by showing alert and redirecting to success page
  const proceed = window.confirm(
    '🎨 DESIGN PREVIEW MODE\n\n' +
    'Stripe checkout would open here.\n' +
    'Price: $20/month\n' +
    (email ? `Email: ${email}\n` : '') +
    '\nClick OK to simulate successful payment and see the success page.'
  )

  if (proceed) {
    // Redirect to success page with mock session
    window.location.href = '/success?session_id=mock_cs_test_' + Math.random().toString(36).substr(2, 9)
  }
}

export function getBillingPortalUrl(): string {
  return '/api/create-portal-session'
}
