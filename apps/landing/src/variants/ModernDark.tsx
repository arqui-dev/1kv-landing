import { useState, FormEvent, useEffect } from 'react'
import { Check, ArrowRight, Zap, Layers, Video, Download, BarChart3, FileText, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Footer } from '@/components/layout/Footer'
import { ContactWidget } from '@/components/layout/ContactWidget'
import { redirectToCheckout, addToWaitlist, analytics, validateEmail } from '@/lib'

export function ModernDark() {
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
      await addToWaitlist(email, 'modern_dark')
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-inter">
      {/* Header */}
      <header className={`fixed top-0 w-full z-40 transition-all ${scrolled ? 'bg-slate-950/90 backdrop-blur-lg border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-2xl font-bold font-jakarta bg-gradient-to-r from-orange-500 to-amber-300 bg-clip-text text-transparent">
              1000 Videos
            </h1>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:text-orange-300 transition-colors relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-300 group-hover:w-full transition-all"></span>
              </a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-orange-300 transition-colors relative group">
                How It Works
              </a>
              <a href="#pricing" className="text-sm font-medium hover:text-orange-300 transition-colors relative group">
                Pricing
              </a>
            </nav>

            <div className="hidden md:block">
              <Button
                onClick={handleSubscribe}
                className="relative bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 text-slate-900 rounded-xl hover:shadow-lg hover:scale-105 font-semibold"
              >
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                  Early Access
                </span>
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              <div className="w-6 h-0.5 bg-white mb-1.5 transition-all"></div>
              <div className="w-6 h-0.5 bg-white mb-1.5 transition-all"></div>
              <div className="w-6 h-0.5 bg-white transition-all"></div>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 bg-slate-900/95 backdrop-blur-lg rounded-b-2xl">
              <nav className="flex flex-col gap-4">
                <a href="#features" className="font-medium">Features</a>
                <a href="#how-it-works" className="font-medium">How It Works</a>
                <a href="#pricing" className="font-medium">Pricing</a>
                <div className="relative">
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                    Early Access
                  </span>
                  <Button
                    onClick={handleSubscribe}
                    className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 text-slate-900 rounded-xl w-full"
                  >
                    Get Started
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" data-section="hero">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 via-amber-300/20 to-orange-600/20 px-4 py-2 rounded-full mb-6 animate-pulse-slow text-orange-100">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Dark Mode • Orange Accent</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold font-jakarta leading-tight mb-6 text-white">
              Create Videos 10x Faster
            </h2>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              The ultimate desktop app for faceless video creators. Generate dozens of videos in minutes, not hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  onClick={handleSubscribe}
                  isLoading={isLoading}
                  size="lg"
                  className="relative bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 text-slate-900 rounded-xl hover:shadow-lg hover:scale-105 font-semibold text-lg px-8"
                >
                  <span className="absolute -top-3 -right-3 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                    Early Access
                  </span>
                  Subscribe Now • $20/mo <ArrowRight className="ml-2" />
                </Button>
                <Button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-slate-900 text-white border border-slate-700 rounded-xl hover:bg-slate-800 hover:scale-105 font-semibold text-lg px-8"
              >
                See How It Works
              </Button>
            </div>

            {/* App Screenshot */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-amber-300/15 to-orange-600/15 rounded-3xl opacity-30 blur-2xl"></div>
              <div className="relative bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
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
                className="bg-slate-900/70 backdrop-blur-lg border border-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <div className="text-4xl font-bold font-jakarta bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/80" data-section="features">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">
            EVERYTHING YOU NEED
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers className="w-8 h-8" />,
                title: 'Batch Creation',
                description: 'Generate dozens of videos from a single script. No manual work required.',
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: 'Template System',
                description: 'Reuse layouts and settings. Save hours on every project.',
              },
              {
                icon: <Download className="w-8 h-8" />,
                title: 'Instant Exports',
                description: 'MP4, MOV, all formats ready. Upload anywhere, instantly.',
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'Analytics Dashboard',
                description: 'Track performance across platforms. Know what works.',
              },
              {
                icon: <Video className="w-8 h-8" />,
                title: 'Script-to-Video',
                description: 'Write once, create many. Perfect for series content.',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Image Library',
                description: 'Built-in stock photos or use your own. Fully flexible.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
              >
                <div className="bg-gradient-to-br from-orange-500/25 via-slate-800 to-amber-300/25 w-16 h-16 rounded-full border border-slate-700 flex items-center justify-center shadow-sm mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-lg text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8" data-section="how-it-works">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">
            HOW IT WORKS
          </h3>

          <div className="space-y-12">
            {[
              {
                step: '1',
                title: 'Import Your Script',
                description: 'Paste your text or upload a file. Our system automatically breaks it into video segments.',
              },
              {
                step: '2',
                title: 'Customize & Preview',
                description: 'Choose templates, add images, adjust timing. See exactly what your videos will look like.',
              },
              {
                step: '3',
                title: 'Export Everything',
                description: 'Hit export and get all your videos in minutes. Ready to upload to YouTube, TikTok, anywhere.',
              },
            ].map((item, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 text-slate-900 w-20 h-20 rounded-full border border-slate-800 flex items-center justify-center shadow-lg mb-4">
                    <span className="text-4xl font-black">{item.step}</span>
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-4">{item.title}</h4>
                  <p className="text-xl text-slate-300">{item.description}</p>
                </div>
                <div className="flex-1 border border-slate-800 bg-slate-900 h-64 flex items-center justify-center rounded-2xl text-6xl">
                  📹
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/80" data-section="pricing">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">
            EARLY ADOPTER PRICING
          </h3>

          <div className="relative border border-slate-800 bg-slate-950 p-8 rounded-3xl shadow-2xl">
            <div className="absolute -top-4 -right-4 bg-red-500 text-white px-6 py-2 border border-slate-800 font-bold text-sm uppercase rounded-lg shadow-lg">
              EARLY ADOPTER SPECIAL
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-black text-white">$20</span>
                <span className="text-2xl font-bold text-slate-500">/MONTH</span>
              </div>
              <div className="text-xl text-slate-600 line-through">$49/MONTH</div>
            </div>

            <ul className="space-y-4 mb-8 text-slate-200">
              {[
                'Unlimited video creation',
                'All templates included',
                'Priority support',
                'Early access to new features',
                'Cancel anytime',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-orange-300 flex-shrink-0" strokeWidth={4} />
                  <span className="text-lg font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="relative">
              <Button
                onClick={handleSubscribe}
                isLoading={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 text-slate-900 rounded-xl shadow-xl hover:scale-105 font-bold text-xl py-6"
                size="lg"
              >
                SUBSCRIBE NOW
              </Button>
            </div>

            <p className="text-center text-sm mt-6 text-slate-300">
              14-day money-back guarantee • No questions asked
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">
            JOIN 500+ CREATORS
          </h3>
          <p className="text-xl md:text-2xl mb-8 text-slate-300">
            Start creating videos 10x faster today
          </p>
          <form onSubmit={handleWaitlist} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-slate-800 bg-slate-900 text-white font-medium rounded-xl"
                required
              />
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 text-slate-900 rounded-xl hover:shadow-lg hover:scale-105 font-bold whitespace-nowrap"
              >
                JOIN NOW
              </Button>
            </div>
            {message && (
              <p className={`mt-4 font-bold ${message.includes('✓') ? 'text-orange-300' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer variant="modern_dark" />
      <ContactWidget variant="modern_dark" />
    </div>
  )
}
