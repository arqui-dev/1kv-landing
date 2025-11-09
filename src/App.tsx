import { useEffect, useState } from 'react'
import { NeoBrutalist } from './variants/NeoBrutalist'
import { Modern } from './variants/Modern'
import { ProductionStudio } from './variants/ProductionStudio'
import { analytics } from './lib'
import './styles/globals.css'

type Variant = 'neo_brutalist' | 'modern' | 'production_studio'

function App() {
  const [variant, setVariant] = useState<Variant>('production_studio')

  useEffect(() => {
    // Detect variant from URL parameter or use default
    const urlParams = new URLSearchParams(window.location.search)
    const variantParam = urlParams.get('variant') as Variant

    if (variantParam && ['neo_brutalist', 'modern', 'production_studio'].includes(variantParam)) {
      setVariant(variantParam)
      analytics.setVariant(variantParam)
    } else {
      // Default to production_studio (recommended variant)
      analytics.setVariant('production_studio')
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
    case 'neo_brutalist':
      return <NeoBrutalist />
    case 'modern':
      return <Modern />
    case 'production_studio':
      return <ProductionStudio />
    default:
      return <ProductionStudio />
  }
}

export default App
