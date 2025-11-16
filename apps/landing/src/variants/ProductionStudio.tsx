import { useState, FormEvent } from 'react'
import { Check, ArrowRight, Zap, Layers, Video, Download, BarChart3, FileText, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Footer } from '@/components/layout/Footer'
import { ContactWidget } from '@/components/layout/ContactWidget'
import { redirectToCheckout, addToWaitlist, analytics, validateEmail } from '@/lib'

export function ProductionStudio() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSubscribe = async () => {
    analytics.trackCTAClick('Subscribe', 'hero')
    analytics.trackCheckoutInitiated()
    setIsLoading(true)
    try {
      await redirectToCheckout(email || undefined)
    } catch (error) {
      console.error('Checkout error:', error)
      setMessage('Failed to open checkout. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWaitlist = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email')
      return
    }

    setIsLoading(true)
    try {
      await addToWaitlist(email, 'production_studio')
      analytics.trackWaitlistSignup(email)
      setMessage('✓ You are on the list')
      setEmail('')
    } catch (error: any) {
      if (error.code === '23505') {
        setMessage('Email already registered')
      } else {
        setMessage('Failed to join waitlist')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-studio-bg text-studio-foreground font-inter">
      {/* Header */}
      <header className="fixed top-0 w-full bg-studio-bg border-b border-studio-foreground/10 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
              <h1 className="text-xl font-semibold">1000 Videos</h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-studio-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-studio-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-sm text-studio-foreground hover:text-primary transition-colors">
                Pricing
              </a>
            </nav>

            <div className="hidden md:block">
              <Button
                onClick={handleSubscribe}
                className="bg-primary text-white rounded-lg hover:bg-primary-light transition-all"
              >
                Subscribe
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              <div className="w-6 h-0.5 bg-studio-foreground mb-1.5"></div>
              <div className="w-6 h-0.5 bg-studio-foreground mb-1.5"></div>
              <div className="w-6 h-0.5 bg-studio-foreground"></div>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-studio-foreground/10">
              <nav className="flex flex-col gap-4">
                <a href="#features" className="text-sm">Features</a>
                <a href="#how-it-works" className="text-sm">How It Works</a>
                <a href="#pricing" className="text-sm">Pricing</a>
                <Button
                  onClick={handleSubscribe}
                  className="bg-primary text-white rounded-lg w-full"
                >
                  Subscribe
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative" data-section="hero">
        <div className="absolute inset-0 bg-gradient-radial from-studio-bg-elevated to-studio-bg -z-10"></div>

        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="text-sm text-studio-muted font-mono">v0.1.0 • Early Access</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-semibold leading-tight mb-6">
            Create Videos <span className="text-primary">10x FASTER</span>
          </h2>

          <p className="text-xl md:text-2xl text-studio-muted mb-12 max-w-3xl mx-auto">
            Professional video creation tool for content creators. Batch-generate faceless videos in minutes.
          </p>

          <Button
            onClick={handleSubscribe}
            isLoading={isLoading}
            size="lg"
            className="bg-primary text-white rounded-lg hover:bg-primary-light transition-all text-lg px-12 py-6 shadow-lg shadow-primary/50"
          >
            Subscribe for $20/mo <ArrowRight className="ml-2" />
          </Button>

          {/* App Screenshot */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl"></div>
            <div className="relative bg-studio-bg-card rounded-lg overflow-hidden border border-primary/30 shadow-2xl">
              <img
                src="/app-screenshot.png"
                alt="1kvideos Desktop App"
                className="w-full h-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"%3E%3Crect fill="%231a1d29" width="1200" height="800"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="32"%3E1kvideos Interface%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
            {[
              { value: '10,000+', label: 'Videos Created', icon: <Video className="w-5 h-5" /> },
              { value: '500+', label: 'Active Creators', icon: <BarChart3 className="w-5 h-5" /> },
              { value: '99%', label: 'Time Saved', icon: <Zap className="w-5 h-5" /> },
            ].map((stat, index) => (
              <div key={index} className="bg-studio-bg-card border border-studio-foreground/10 rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-4xl font-semibold font-mono mb-1">{stat.value}</div>
                <div className="text-sm text-studio-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8" data-section="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-semibold mb-4">
              Professional Features
            </h3>
            <p className="text-lg text-studio-muted">
              Everything you need to scale your content creation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Layers className="w-6 h-6" />,
                title: 'Batch Creation',
                description: 'Generate dozens of videos from a single script automatically.',
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: 'Template System',
                description: 'Reuse layouts and settings. Maintain consistency effortlessly.',
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: 'Instant Exports',
                description: 'Export to MP4, MOV, and all formats. Production-ready.',
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: 'Analytics Dashboard',
                description: 'Track performance metrics across all your platforms.',
              },
              {
                icon: <Video className="w-6 h-6" />,
                title: 'Script-to-Video',
                description: 'Transform written content into engaging videos instantly.',
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Image Library',
                description: 'Built-in stock library or import your own assets.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-studio-bg-card border border-studio-foreground/10 rounded-lg p-6 hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 bg-studio-bg-elevated rounded-lg flex items-center justify-center text-studio-foreground group-hover:text-primary transition-colors mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-studio-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-studio-bg-elevated" data-section="how-it-works">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-semibold mb-4">
              How It Works
            </h3>
            <p className="text-lg text-studio-muted">
              Three steps to streamlined video production
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                step: '1',
                title: 'Import Your Script',
                description: 'Paste your text or upload a file. The system intelligently segments it for optimal video creation.',
              },
              {
                step: '2',
                title: 'Customize & Preview',
                description: 'Select templates, adjust timing, add media. Real-time preview ensures perfect results.',
              },
              {
                step: '3',
                title: 'Export Everything',
                description: 'One-click export generates all videos. Ready for immediate upload to any platform.',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white text-2xl font-semibold font-mono">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-semibold mb-3">{item.title}</h4>
                  <p className="text-studio-muted leading-relaxed mb-6">{item.description}</p>
                  <div className="bg-studio-bg border border-primary/20 rounded-lg h-48 flex items-center justify-center">
                    <span className="text-5xl opacity-30">📹</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8" data-section="pricing">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-semibold mb-4">
              Early Adopter Pricing
            </h3>
            <p className="text-lg text-studio-muted">
              Limited-time offer for founding creators
            </p>
          </div>

          <div className="relative bg-studio-bg-card border border-studio-foreground/10 rounded-lg p-8 shadow-xl">
            <div className="absolute -top-4 -right-4 bg-studio-accent-red text-white px-6 py-2 rounded-lg font-semibold text-sm shadow-lg">
              LIMITED TIME: $20/mo
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-semibold">$20</span>
                <span className="text-xl text-studio-muted">/month</span>
              </div>
              <div className="text-lg text-studio-muted line-through">$49/month</div>
              <p className="text-sm text-studio-muted mt-2">Early adopter discount — $29/mo savings</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                'Unlimited video creation',
                'All premium templates',
                'Priority support',
                'Early feature access',
                'Cancel anytime',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-base">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={handleSubscribe}
              isLoading={isLoading}
              className="w-full bg-primary text-white rounded-lg hover:bg-primary-light transition-all text-lg py-6 shadow-lg shadow-primary/30"
              size="lg"
            >
              Subscribe for $20/mo
            </Button>

            <p className="text-center text-sm text-studio-muted mt-6">
              Cancel anytime • 14-day refund policy
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-studio-bg-elevated">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold mb-4">
              Trusted by Content Creators
            </h3>
            <p className="text-studio-muted">
              Publishing to platforms worldwide
            </p>
          </div>

          {/* Platform logos */}
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            {['YouTube', 'TikTok', 'Instagram', 'Twitter', 'Facebook'].map((platform) => (
              <div key={platform} className="text-2xl font-semibold hover:opacity-100 hover:grayscale-0 hover:text-primary transition-all cursor-default">
                {platform}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-semibold mb-6">
            Start Creating Today
          </h3>
          <p className="text-xl text-studio-muted mb-8">
            Join 500+ creators making videos 10x faster
          </p>
          <form onSubmit={handleWaitlist} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-studio-bg-card border border-studio-foreground/20 text-studio-foreground rounded-lg focus-visible:ring-primary"
                required
              />
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-primary text-white rounded-lg hover:bg-primary-light transition-all whitespace-nowrap"
              >
                Get Started
              </Button>
            </div>
            {message && (
              <p className={`mt-4 text-sm ${message.includes('✓') ? 'text-studio-accent-green' : 'text-studio-accent-red'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer variant="production_studio" />
      <ContactWidget variant="production_studio" />
    </div>
  )
}
