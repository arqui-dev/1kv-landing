import { useState, FormEvent, useEffect } from 'react'
import { Check, ArrowRight, Zap, Layers, Video, Download, BarChart3, FileText, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Footer } from '@/components/layout/Footer'
import { ContactWidget } from '@/components/layout/ContactWidget'
import { redirectToCheckout, addToWaitlist, analytics, validateEmail } from '@/lib'

export function ModernLight() {
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
      await addToWaitlist(email, 'modern_light')
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
              </a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors relative group">
                Pricing
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
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" data-section="features">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-bold text-center mb-16 text-gray-900">
            EVERYTHING YOU NEED
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Layers className="w-8 h-8" />, title: 'Batch Creation', description: 'Generate dozens of videos from a single script. No manual work required.' },
              { icon: <FileText className="w-8 h-8" />, title: 'Template System', description: 'Reuse layouts and settings. Save hours on every project.' },
              { icon: <Download className="w-8 h-8" />, title: 'Instant Exports', description: 'MP4, MOV, all formats ready. Upload anywhere, instantly.' },
              { icon: <BarChart3 className="w-8 h-8" />, title: 'Analytics Dashboard', description: 'Track performance across platforms. Know what works.' },
              { icon: <Video className="w-8 h-8" />, title: 'Script-to-Video', description: 'Write once, create many. Perfect for series content.' },
              { icon: <Zap className="w-8 h-8" />, title: 'Image Library', description: 'Built-in stock photos or use your own. Fully flexible.' },
            ].map((feature, index) => (
              <div
                key={index}
                className="border border-gray-200 bg-white p-6 rounded-2xl shadow-modern hover:shadow-modern-lg hover:scale-105 transition-transform"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center shadow-sm mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-lg text-modern-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8" data-section="how-it-works">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-bold text-center mb-16 text-gray-900">
            HOW IT WORKS
          </h3>

          <div className="space-y-12">
            {[
              { step: '1', title: 'Import Your Script', description: 'Paste your text or upload a file. Our system automatically breaks it into video segments.' },
              { step: '2', title: 'Customize & Preview', description: 'Choose templates, add images, adjust timing. See exactly what your videos will look like.' },
              { step: '3', title: 'Export Everything', description: 'Hit export and get all your videos in minutes. Ready to upload to YouTube, TikTok, anywhere.' },
            ].map((item, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-primary to-modern-coral text-white w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center shadow-lg mb-4">
                    <span className="text-4xl font-black">{item.step}</span>
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h4>
                  <p className="text-xl text-modern-muted">{item.description}</p>
                </div>
                <div className="flex-1 border border-gray-200 bg-gray-100 h-64 flex items-center justify-center rounded-2xl text-6xl">
                  📹
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" data-section="pricing">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-bold text-center mb-16 text-gray-900">
            EARLY ADOPTER PRICING
          </h3>

          <div className="relative border border-gray-200 bg-white p-8 rounded-3xl shadow-modern-lg">
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary to-modern-coral text-white px-6 py-2 border border-gray-200 font-black text-sm uppercase rounded-lg shadow-md">
              EARLY ADOPTER SPECIAL
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-black font-jetbrains text-primary">$20</span>
                <span className="text-2xl font-bold text-gray-600">/MONTH</span>
              </div>
              <div className="text-xl text-gray-500 line-through font-jetbrains">$49/MONTH</div>
            </div>

            <ul className="space-y-4 mb-8 text-gray-800">
              {[
                'Unlimited video creation',
                'All templates included',
                'Priority support',
                'Early access to new features',
                'Cancel anytime',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0" strokeWidth={4} />
                  <span className="text-lg font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="relative">
              <Button
                onClick={handleSubscribe}
                isLoading={isLoading}
                className="w-full bg-gradient-to-r from-modern-coral to-modern-amber text-white rounded-xl shadow-modern-lg hover:scale-105 font-bold uppercase text-xl py-6"
                size="lg"
              >
                SUBSCRIBE NOW
              </Button>
            </div>

            <p className="text-center text-sm mt-6 font-bold text-modern-muted">
              14-day money-back guarantee • No questions asked
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            JOIN 500+ CREATORS
          </h3>
          <p className="text-xl md:text-2xl mb-8 text-modern-muted">
            Start creating videos 10x faster today
          </p>
          <form onSubmit={handleWaitlist} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-200 shadow-modern font-medium rounded-xl"
                required
              />
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-gradient-to-r from-modern-coral to-modern-amber text-white rounded-xl hover:shadow-modern-lg hover:scale-105 font-bold whitespace-nowrap"
              >
                JOIN NOW
              </Button>
            </div>
            {message && (
              <p className={`mt-4 font-bold ${message.includes('✓') ? 'text-primary' : 'text-red-500'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer variant="modern_light" />
      <ContactWidget variant="modern_light" />
    </div>
  )
}
