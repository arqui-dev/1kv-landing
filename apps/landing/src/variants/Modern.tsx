import { useState, FormEvent, useEffect } from 'react'
import { Check, ArrowRight, Zap, Layers, Video, Download, BarChart3, FileText, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Footer } from '@/components/layout/Footer'
import { ContactWidget } from '@/components/layout/ContactWidget'
import { redirectToCheckout, addToWaitlist, analytics, validateEmail } from '@/lib'

export function Modern() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubscribe = async () => {
    analytics.trackCTAClick('Subscribe Now', 'hero')
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
      await addToWaitlist(email, 'modern')
      analytics.trackWaitlistSignup(email)
      setMessage('✓ Welcome to the community!')
      setEmail('')
    } catch (error: any) {
      if (error.code === '23505') {
        setMessage('Email already registered!')
      } else {
        setMessage('Failed to join waitlist')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-foreground font-inter">
      {/* Header */}
      <header className={`fixed top-0 w-full z-40 transition-all ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-2xl font-bold font-jakarta bg-gradient-to-r from-primary to-modern-coral bg-clip-text text-transparent">
              1000 Videos
            </h1>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-modern-coral group-hover:w-full transition-all"></span>
              </a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors relative group">
                How It Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-modern-coral group-hover:w-full transition-all"></span>
              </a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors relative group">
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-modern-coral group-hover:w-full transition-all"></span>
              </a>
            </nav>

            <div className="hidden md:block">
              <Button
                onClick={handleSubscribe}
                className="bg-gradient-to-r from-modern-coral to-modern-amber text-white rounded-xl hover:shadow-modern-lg hover:scale-105 font-semibold"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              <div className="w-6 h-0.5 bg-black mb-1.5 transition-all"></div>
              <div className="w-6 h-0.5 bg-black mb-1.5 transition-all"></div>
              <div className="w-6 h-0.5 bg-black transition-all"></div>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 bg-white/95 backdrop-blur-lg rounded-b-2xl">
              <nav className="flex flex-col gap-4">
                <a href="#features" className="font-medium">Features</a>
                <a href="#how-it-works" className="font-medium">How It Works</a>
                <a href="#pricing" className="font-medium">Pricing</a>
                <Button
                  onClick={handleSubscribe}
                  className="bg-gradient-to-r from-modern-coral to-modern-amber text-white rounded-xl w-full"
                >
                  Get Started
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" data-section="hero">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-modern-coral/5 -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-modern-coral/10 px-4 py-2 rounded-full mb-6 animate-pulse-slow">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Now in Early Access</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold font-jakarta leading-tight mb-6 bg-gradient-to-r from-primary via-modern-coral to-modern-amber bg-clip-text text-transparent">
              Create Videos 10x Faster
            </h2>

            <p className="text-xl md:text-2xl text-modern-muted mb-8 leading-relaxed">
              The ultimate desktop app for faceless video creators. Generate dozens of videos in minutes, not hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={handleSubscribe}
                isLoading={isLoading}
                size="lg"
                className="bg-gradient-to-r from-modern-coral to-modern-amber text-white rounded-xl hover:shadow-modern-lg hover:scale-105 font-semibold text-lg px-8"
              >
                Subscribe Now • $20/mo <ArrowRight className="ml-2" />
              </Button>
              <Button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-foreground border border-gray-200 rounded-xl hover:bg-gray-50 hover:scale-105 font-semibold text-lg px-8"
              >
                See How It Works
              </Button>
            </div>

            {/* App Screenshot */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-modern-coral rounded-3xl opacity-20 blur-2xl"></div>
              <div className="relative bg-white rounded-2xl shadow-modern-lg overflow-hidden border border-gray-100">
                <img
                  src="/app-screenshot.png"
                  alt="1kvideos Desktop App"
                  className="w-full h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"%3E%3Cdefs%3E%3ClinearGradient id="a" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%233b82f6;stop-opacity:0.1"/%3E%3Cstop offset="100%25" style="stop-color:%23ef4444;stop-opacity:0.1"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23a)" width="1200" height="800"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32"%3E1kvideos App Interface%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            {[
              { value: '10,000+', label: 'Videos Created' },
              { value: '500+', label: 'Active Creators' },
              { value: '99%', label: 'Time Saved' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/50 backdrop-blur-lg border border-gray-100 rounded-2xl p-6 shadow-modern hover:shadow-modern-lg hover:scale-105 transition-all"
              >
                <div className="text-4xl font-bold font-jakarta bg-gradient-to-r from-primary to-modern-coral bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-modern-muted font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50" data-section="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-bold font-jakarta mb-4">
              Everything You Need
            </h3>
            <p className="text-xl text-modern-muted max-w-2xl mx-auto">
              Powerful features designed to help you create more content, faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Layers className="w-6 h-6" />,
                title: 'Batch Creation',
                description: 'Generate dozens of videos from a single script. Automate your entire workflow.',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: 'Template System',
                description: 'Reuse layouts and settings across projects. Consistency made easy.',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: 'Instant Exports',
                description: 'Export to MP4, MOV, and all popular formats. Ready for any platform.',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: 'Analytics Dashboard',
                description: 'Track performance across platforms. Make data-driven decisions.',
                gradient: 'from-orange-500 to-amber-500',
              },
              {
                icon: <Video className="w-6 h-6" />,
                title: 'Script-to-Video',
                description: 'Turn written content into engaging videos automatically.',
                gradient: 'from-red-500 to-rose-500',
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Image Library',
                description: 'Access built-in stock photos or import your own images.',
                gradient: 'from-indigo-500 to-violet-500',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-lg border border-gray-100 rounded-2xl p-6 shadow-modern hover:shadow-modern-lg hover:scale-105 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold font-jakarta mb-2">{feature.title}</h4>
                <p className="text-modern-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8" data-section="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-bold font-jakarta mb-4">
              How It Works
            </h3>
            <p className="text-xl text-modern-muted">
              Three simple steps to video creation mastery
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-modern-coral to-modern-amber -translate-y-1/2 -z-10"></div>

            <div className="grid lg:grid-cols-3 gap-12">
              {[
                {
                  step: '1',
                  title: 'Import Your Script',
                  description: 'Paste your text or upload a file. Our intelligent system breaks it into perfect video segments.',
                },
                {
                  step: '2',
                  title: 'Customize & Preview',
                  description: 'Choose from beautiful templates, add images, and fine-tune timing. Preview in real-time.',
                },
                {
                  step: '3',
                  title: 'Export Everything',
                  description: 'One click exports all your videos. Upload to YouTube, TikTok, or any platform instantly.',
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-modern-coral text-white text-2xl font-bold font-jakarta mb-6 shadow-modern">
                    {item.step}
                  </div>
                  <h4 className="text-2xl font-semibold font-jakarta mb-4">{item.title}</h4>
                  <p className="text-modern-muted leading-relaxed">{item.description}</p>

                  {/* Placeholder for screenshot */}
                  <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl h-48 flex items-center justify-center border border-gray-200 shadow-md">
                    <span className="text-6xl opacity-50">📹</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white" data-section="pricing">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-6xl font-bold font-jakarta mb-4">
              Early Adopter Pricing
            </h3>
            <p className="text-xl text-modern-muted">
              Limited time offer for our founding creators
            </p>
          </div>

          <div className="relative bg-white rounded-3xl p-8 shadow-modern-lg border border-gray-100">
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-modern-coral to-modern-amber text-white px-6 py-2 rounded-full font-semibold text-sm shadow-modern">
              ⚡ EARLY ADOPTER
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-bold font-jakarta bg-gradient-to-r from-primary to-modern-coral bg-clip-text text-transparent">$20</span>
                <span className="text-2xl font-medium text-modern-muted">/month</span>
              </div>
              <div className="text-xl text-modern-muted line-through">$49/month</div>
              <p className="text-sm text-modern-muted mt-2">Save $29/month as an early adopter</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                'Unlimited video creation',
                'All premium templates',
                'Priority email support',
                'Early access to new features',
                'Cancel anytime, no questions asked',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-modern-coral flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-base font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={handleSubscribe}
              isLoading={isLoading}
              className="w-full bg-gradient-to-r from-modern-coral to-modern-amber text-white rounded-xl hover:shadow-modern-lg hover:scale-105 font-semibold text-lg py-6"
              size="lg"
            >
              Subscribe Now • $20/mo
            </Button>

            <p className="text-center text-sm text-modern-muted mt-6">
              14-day money-back guarantee • Secure payment via Stripe
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-6xl font-bold font-jakarta mb-6">
            Join Our Community
          </h3>
          <p className="text-xl md:text-2xl text-modern-muted mb-8">
            500+ creators are already making videos 10x faster
          </p>
          <form onSubmit={handleWaitlist} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-200 rounded-xl shadow-sm focus-visible:ring-primary"
                required
              />
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-gradient-to-r from-modern-coral to-modern-amber text-white rounded-xl hover:shadow-modern-lg hover:scale-105 font-semibold whitespace-nowrap"
              >
                Get Started
              </Button>
            </div>
            {message && (
              <p className={`mt-4 font-medium ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer variant="modern" />
      <ContactWidget variant="modern" />
    </div>
  )
}
