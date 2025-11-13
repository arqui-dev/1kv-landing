interface FooterProps {
  variant: 'neo_brutalist' | 'modern' | 'production_studio' | 'premium'
}

export function Footer({ variant }: FooterProps) {
  const year = new Date().getFullYear()

  const getFooterStyles = () => {
    switch (variant) {
      case 'neo_brutalist':
        return {
          container: 'bg-black text-white border-t-4 border-black',
          link: 'hover:text-brutalist-accent font-bold',
          text: 'font-jetbrains',
        }
      case 'modern':
        return {
          container: 'bg-gradient-to-br from-gray-50 to-white border-t border-gray-200',
          link: 'hover:text-primary transition-colors',
          text: 'text-modern-muted',
        }
      case 'production_studio':
        return {
          container: 'bg-studio-bg border-t border-studio-foreground/10',
          link: 'hover:text-primary transition-colors',
          text: 'text-studio-muted',
        }
      case 'premium':
        return {
          container: 'bg-white border-t border-premium-indigo/10',
          link: 'hover:text-premium-indigo transition-colors',
          text: 'text-premium-muted',
        }
    }
  }

  const styles = getFooterStyles()

  return (
    <footer className={`py-12 ${styles.container}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className={`text-2xl font-bold mb-4 ${variant === 'neo_brutalist' ? 'font-space-grotesk' : variant === 'modern' ? 'font-jakarta' : ''}`}>
              1000 VIDEOS
            </h3>
            <p className={`mb-4 ${styles.text}`}>
              Create faceless videos 10x faster. Built for content creators who want to scale.
            </p>
            <p className={`text-sm ${styles.text}`}>
              v0.1.0 • Early Access
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className={styles.link}>Features</a></li>
              <li><a href="#pricing" className={styles.link}>Pricing</a></li>
              <li><a href="#how-it-works" className={styles.link}>How It Works</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="mailto:support@1kvideos.com" className={styles.link}>Email Support</a></li>
              <li><a href={`https://t.me/${import.meta.env.VITE_TELEGRAM_CHANNEL}`} target="_blank" rel="noopener noreferrer" className={styles.link}>Community</a></li>
              <li><a href="/terms" className={styles.link}>Terms</a></li>
              <li><a href="/privacy" className={styles.link}>Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${variant === 'neo_brutalist' ? 'border-white/20' : variant === 'modern' ? 'border-gray-200' : 'border-studio-foreground/10'}`}>
          <p className={`text-center text-sm ${styles.text}`}>
            © {year} 1000 Videos. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
