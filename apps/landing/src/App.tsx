import { useEffect, useState } from 'react'
import { ModernDark } from './variants/ModernDark'
import { ModernLight } from './variants/ModernLight'
import { analytics } from './lib'
import './styles/globals.css'

type Variant =
  | 'modern_dark'
  | 'modern_light'

function App() {
  const [variant, setVariant] = useState<Variant>('modern_dark')

  useEffect(() => {
    // Detect variant from URL parameter or use default
    const urlParams = new URLSearchParams(window.location.search)
    const variantParam = urlParams.get('variant') as Variant

    if (variantParam && ['modern_dark', 'modern_light'].includes(variantParam)) {
      setVariant(variantParam)
      analytics.setVariant(variantParam)
    } else {
      // Default to modern_dark (chosen primary variant)
      setVariant('modern_dark')
      analytics.setVariant('modern_dark')
    }

    // Track page view
    analytics.trackPageView()

    // Setup section tracking
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
      { threshold: 0.5 }
    )

    // Wait for DOM to load before observing
    setTimeout(() => {
      document.querySelectorAll('[data-section]').forEach((section) => {
        observer.observe(section)
      })
    }, 100)

    return () => observer.disconnect()
  }, [variant])

  // Render the appropriate variant
  switch (variant) {
    case 'modern_dark':
      return <ModernDark />
    case 'modern_light':
      return <ModernLight />
    default:
      return <ModernDark />
  }
}

export default App
