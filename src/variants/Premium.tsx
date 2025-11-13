import { useState, FormEvent, useEffect } from 'react'
import { Check, ArrowRight, Zap, Layers, Video, Download, BarChart3, FileText, TrendingUp, Users, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Footer } from '@/components/layout/Footer'
import { ContactWidget } from '@/components/layout/ContactWidget'
import { redirectToCheckout, addToWaitlist, analytics, validateEmail } from '@/lib'

export function Premium() {
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
    analytics.trackCTAClick('Get Started', 'hero')
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
      await addToWaitlist(email, 'premium')
      analytics.trackWaitlistSignup(email)
      setMessage('✓ Welcome! We will be in touch soon.')
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
    <div className="min-h-screen bg-premium-bg-gradient text-foreground font-inter">
      {/* Header */}
      <header className={`fixed top-0 w-full z-40 transition-all ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-premium border-b border-premium-indigo/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-premium-indigo to-premium-cyan rounded-xl flex items-center justify-center shadow-premium">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold font-jakarta bg-gradient-to-r from-premium-indigo to-premium-cyan bg-clip-text text-transparent">
                1000 Videos
              </h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:text-premium-indigo transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-premium-indigo transition-colors">
                Solutions
              </a>
              <a href="#pricing" className="text-sm font-medium hover:text-premium-indigo transition-colors">
                Pricing
              </a>
            </nav>

            <div className="hidden md:block">
              <Button
                onClick={handleSubscribe}
                className="bg-gradient-to-r from-premium-indigo to-premium-cyan text-white rounded-2xl hover:shadow-premium-lg hover:scale-105 font-semibold transition-all"
              >
                Start Free Trial
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-premium-indigo/5"
            >
              <div className="w-6 h-0.5 bg-foreground mb-1.5 rounded-full"></div>
              <div className="w-6 h-0.5 bg-foreground mb-1.5 rounded-full"></div>
              <div className="w-6 h-0.5 bg-foreground rounded-full"></div>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-premium-indigo/10">
              <nav className="flex flex-col gap-4">
                <a href="#features" className="text-sm font-medium">Features</a>
                <a href="#how-it-works" className="text-sm font-medium">Solutions</a>
                <a href="#pricing" className="text-sm font-medium">Pricing</a>
                <Button
                  onClick={handleSubscribe}
                  className="bg-gradient-to-r from-premium-indigo to-premium-cyan text-white rounded-2xl w-full font-semibold"
                >
                  Start Free Trial
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" data-section="hero">
        <div className="absolute inset-0 bg-gradient-to-br from-premium-indigo/5 via-transparent to-premium-cyan/5 -z-10"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-premium-indigo/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-premium-cyan/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-premium border border-premium-indigo/20">
              <TrendingUp className="w-4 h-4 text-premium-indigo" />
              <span className="text-sm font-semibold bg-gradient-to-r from-premium-indigo to-premium-cyan bg-clip-text text-transparent">
                Trusted by 500+ content creators worldwide
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold font-jakarta leading-tight mb-6">
              Scale Your Video <br />
              <span className="bg-gradient-to-r from-premium-indigo via-premium-cyan to-premium-indigo-dark bg-clip-text text-transparent">
                Production 10x
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-premium-muted mb-12 max-w-3xl mx-auto leading-relaxed">
              Professional video creation platform for serious content creators. Create, manage, and export hundreds of videos in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                onClick={handleSubscribe}
                isLoading={isLoading}
                size="lg"
                className="bg-gradient-to-r from-premium-indigo to-premium-cyan text-white rounded-2xl hover:shadow-premium-lg hover:scale-105 font-semibold text-lg px-10 transition-all"
              >
                Start 14-Day Free Trial <ArrowRight className="ml-2" />
              </Button>
              <Button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/80 backdrop-blur-sm text-premium-indigo border-2 border-premium-indigo/20 rounded-2xl hover:bg-white hover:shadow-premium font-semibold text-lg px-10 transition-all"
                size="lg"
              >
                See How It Works
              </Button>
            </div>

            {/* Video Embed */}
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-premium-indigo to-premium-cyan rounded-3xl opacity-20 blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-premium-indigo/20 shadow-premium-lg">
                <div className="relative pb-[56.25%]">
                  <iframe
                    src="https://www.youtube.com/embed/LhzpLcKmJRY"
                    title="1kvideos App Demo"
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
              {[
                { icon: <Video className="w-6 h-6" />, value: '10,000+', label: 'Videos Created' },
                { icon: <Users className="w-6 h-6" />, value: '500+', label: 'Active Creators' },
                { icon: <TrendingUp className="w-6 h-6" />, value: '99%', label: 'Client Satisfaction' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm border border-premium-indigo/10 rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-all">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-premium-indigo to-premium-cyan rounded-xl flex items-center justify-center text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-bold font-jakarta bg-gradient-to-r from-premium-indigo to-premium-cyan bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-premium-muted font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8" data-section="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold font-jakarta mb-4">
              Enterprise-Grade Features
            </h3>
            <p className="text-lg text-premium-muted max-w-2xl mx-auto">
              Everything you need to scale your video production workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers className="w-6 h-6" />,
                title: 'Batch Processing',
                description: 'Generate hundreds of videos from a single script with intelligent automation.',
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: 'Template Library',
                description: 'Professional templates that maintain brand consistency across all your content.',
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: 'Multi-Format Export',
                description: 'Export to any format: MP4, MOV, or optimized for specific platforms.',
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: 'Analytics Dashboard',
                description: 'Track performance metrics and optimize your content strategy.',
              },
              {
                icon: <Video className="w-6 h-6" />,
                title: 'AI-Powered Creation',
                description: 'Transform scripts into engaging videos with intelligent scene matching.',
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Enterprise Security',
                description: 'Bank-level encryption and secure cloud storage for your content.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm border border-premium-indigo/10 rounded-2xl p-8 hover:shadow-premium-lg transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-premium-indigo to-premium-cyan rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-premium">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold font-jakarta mb-3">{feature.title}</h4>
                <p className="text-premium-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50" data-section="how-it-works">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold font-jakarta mb-4">
              Simple, Powerful Workflow
            </h3>
            <p className="text-lg text-premium-muted">
              From script to publish in three easy steps
            </p>
          </div>

          <div className="space-y-16">
            {[
              {
                step: '01',
                title: 'Import & Organize',
                description: 'Upload your script or paste content directly. Our AI automatically segments and optimizes for video creation.',
                color: 'from-premium-indigo to-premium-indigo-dark',
              },
              {
                step: '02',
                title: 'Customize & Preview',
                description: 'Select professional templates, add media, and adjust timing. Real-time preview ensures perfect results.',
                color: 'from-premium-cyan to-premium-cyan-dark',
              },
              {
                step: '03',
                title: 'Export & Publish',
                description: 'Bulk export all videos with one click. Ready for immediate upload to any platform.',
                color: 'from-premium-indigo to-premium-cyan',
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${item.color} text-white rounded-3xl text-4xl font-black font-jakarta mb-6 shadow-premium-lg`}>
                    {item.step}
                  </div>
                  <h4 className="text-3xl font-bold font-jakarta mb-4">{item.title}</h4>
                  <p className="text-xl text-premium-muted leading-relaxed">{item.description}</p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-premium-indigo/10 to-premium-cyan/10 border border-premium-indigo/20 rounded-2xl h-72 flex items-center justify-center shadow-premium">
                  <span className="text-7xl">📹</span>
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
            <h3 className="text-4xl md:text-5xl font-bold font-jakarta mb-4">
              Early Access Pricing
            </h3>
            <p className="text-lg text-premium-muted">
              Limited-time offer for founding members
            </p>
          </div>

          <div className="relative bg-white/90 backdrop-blur-sm border border-premium-indigo/20 rounded-3xl p-10 shadow-premium-lg">
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-premium-indigo to-premium-cyan text-white px-6 py-3 rounded-full font-bold text-sm shadow-premium-lg">
              🎉 EARLY ACCESS: $20/mo
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-black font-jakarta bg-gradient-to-r from-premium-indigo to-premium-cyan bg-clip-text text-transparent">
                  $20
                </span>
                <span className="text-2xl font-semibold text-premium-muted">/month</span>
              </div>
              <div className="text-lg text-premium-muted line-through">Regular price: $49/month</div>
              <p className="text-sm text-premium-muted mt-2">Lock in this rate forever as a founding member</p>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                'Unlimited video generation',
                'All premium templates included',
                'Priority support & onboarding',
                'Early access to new features',
                'No watermarks, full commercial rights',
                'Cancel anytime, no questions asked',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-premium-indigo to-premium-cyan rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-base font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={handleSubscribe}
              isLoading={isLoading}
              className="w-full bg-gradient-to-r from-premium-indigo to-premium-cyan text-white rounded-2xl hover:shadow-premium-lg hover:scale-105 font-bold text-lg py-7 transition-all"
              size="lg"
            >
              Start 14-Day Free Trial
            </Button>

            <p className="text-center text-sm text-premium-muted mt-6">
              14-day money-back guarantee • No credit card required for trial
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-premium-indigo/5 to-premium-cyan/5">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold font-jakarta mb-6">
            Ready to Scale Your Content?
          </h3>
          <p className="text-xl text-premium-muted mb-10">
            Join hundreds of creators producing professional videos 10x faster
          </p>
          <form onSubmit={handleWaitlist} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/80 backdrop-blur-sm border border-premium-indigo/20 rounded-xl focus:ring-premium-indigo shadow-premium"
                required
              />
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-gradient-to-r from-premium-indigo to-premium-cyan text-white rounded-xl hover:shadow-premium-lg hover:scale-105 font-semibold whitespace-nowrap"
              >
                Get Started
              </Button>
            </div>
            {message && (
              <p className={`mt-4 text-sm ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer variant="premium" />
      <ContactWidget variant="premium" />
    </div>
  )
}
