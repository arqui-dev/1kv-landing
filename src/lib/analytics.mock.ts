// Mock Analytics implementation for testing designs without backend setup

import { supabase } from './supabase.mock'

export type EventName =
  | 'page_view'
  | 'cta_click'
  | 'section_view'
  | 'contact_widget_open'
  | 'contact_channel_click'
  | 'waitlist_signup'
  | 'checkout_initiated'
  | 'checkout_completed'
  | 'checkout_cancelled'

export interface EventMetadata {
  [key: string]: string | number | boolean | undefined
  button_text?: string
  section_name?: string
  channel?: string
  email?: string
  variant?: string
}

class Analytics {
  private variant: string = 'unknown'
  private sessionId: string

  constructor() {
    this.sessionId = this.generateSessionId()
    this.variant = this.detectVariant()
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private detectVariant(): string {
    const urlParams = new URLSearchParams(window.location.search)
    const variantFromUrl = urlParams.get('variant')

    if (variantFromUrl) {
      localStorage.setItem('landing_variant', variantFromUrl)
      return variantFromUrl
    }

    return localStorage.getItem('landing_variant') || 'production_studio'
  }

  setVariant(variant: string) {
    this.variant = variant
    localStorage.setItem('landing_variant', variant)
  }

  async track(eventName: EventName, metadata: EventMetadata = {}) {
    try {
      const eventData = {
        event_name: eventName,
        variant: this.variant,
        metadata: {
          ...metadata,
          session_id: this.sessionId,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          screen_width: window.screen.width,
          screen_height: window.screen.height,
        },
      }

      console.log('📊 ANALYTICS:', eventName, metadata)

      await supabase
        .from('analytics_events')
        .insert([eventData])

    } catch (err) {
      console.error('Analytics tracking error:', err)
    }
  }

  trackPageView() {
    this.track('page_view', {
      path: window.location.pathname,
      referrer: document.referrer,
    })
  }

  trackCTAClick(buttonText: string, location: string) {
    this.track('cta_click', {
      button_text: buttonText,
      location,
    })
  }

  trackSectionView(sectionName: string) {
    this.track('section_view', {
      section_name: sectionName,
    })
  }

  trackContactChannel(channel: 'whatsapp' | 'telegram' | 'email') {
    this.track('contact_channel_click', {
      channel,
    })
  }

  trackWaitlistSignup(email: string) {
    this.track('waitlist_signup', {
      email,
    })
  }

  trackCheckoutInitiated() {
    this.track('checkout_initiated')
  }

  trackCheckoutCompleted() {
    this.track('checkout_completed')
  }

  trackCheckoutCancelled() {
    this.track('checkout_cancelled')
  }
}

export const analytics = new Analytics()

// Setup section tracking
export function setupSectionTracking() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-section')
          if (sectionName) {
            analytics.trackSectionView(sectionName)
          }
        }
      })
    },
    {
      threshold: 0.5,
    }
  )

  document.querySelectorAll('[data-section]').forEach((section) => {
    observer.observe(section)
  })

  return observer
}
