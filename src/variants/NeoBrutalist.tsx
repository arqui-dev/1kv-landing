import { useState, FormEvent } from 'react'
import { Check, ArrowRight, Zap, Layers, Video, Download, BarChart3, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Footer } from '@/components/layout/Footer'
import { ContactWidget } from '@/components/layout/ContactWidget'
import { redirectToCheckout, addToWaitlist, analytics, validateEmail } from '@/lib'

export function NeoBrutalist() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      await addToWaitlist(email, 'neo_brutalist')
      analytics.trackWaitlistSignup(email)
      setMessage('✓ Added to waitlist!')
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
    <div className="min-h-screen bg-white text-black font-inter">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white border-b-4 border-black z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-2xl font-black font-space-grotesk">1000 VIDEOS</h1>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="font-bold uppercase text-sm hover:text-primary">Features</a>
              <a href="#how-it-works" className="font-bold uppercase text-sm hover:text-primary">How It Works</a>
              <a href="#pricing" className="font-bold uppercase text-sm hover:text-primary">Pricing</a>
            </nav>

            <div className="hidden md:block relative">
              <Button
                onClick={handleSubscribe}
                className="bg-primary text-white border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase rounded-sm relative"
              >
                Start Trial
                <span className="absolute -top-2 -right-2 bg-brutalist-teal text-black text-xs px-2 py-1 border-2 border-black font-black rotate-3">
                  EARLY ACCESS
                </span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden border-4 border-black p-2"
            >
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t-4 border-black">
              <nav className="flex flex-col gap-4">
                <a href="#features" className="font-bold uppercase">Features</a>
                <a href="#how-it-works" className="font-bold uppercase">How It Works</a>
                <a href="#pricing" className="font-bold uppercase">Pricing</a>
                <Button
                  onClick={handleSubscribe}
                  className="bg-primary text-white border-4 border-black shadow-brutalist font-bold uppercase w-full"
                >
                  Start Trial
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8" data-section="hero">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="bg-brutalist-purple text-white px-4 py-2 border-4 border-black shadow-brutalist font-black text-sm uppercase rotate-[-2deg] inline-block">
                  NEW
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black font-space-grotesk leading-tight mb-6">
                CREATE 100 VIDEOS IN 1 HOUR
              </h2>

              <p className="text-xl md:text-2xl mb-8 font-medium">
                Stop wasting time. Batch-create faceless videos 10x faster.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  onClick={handleSubscribe}
                  isLoading={isLoading}
                  size="lg"
                  className="bg-primary text-white border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase rounded-sm text-lg"
                >
                  START 14-DAY TRIAL <ArrowRight className="ml-2" />
                </Button>
                <Button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-black border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase rounded-sm text-lg"
                >
                  SEE HOW IT WORKS
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="border-4 border-black p-4 bg-white shadow-brutalist">
                  <div className="text-3xl font-black font-jetbrains text-brutalist-success">10,000+</div>
                  <div className="text-sm font-bold uppercase">Videos Created</div>
                </div>
                <div className="border-4 border-black p-4 bg-white shadow-brutalist">
                  <div className="text-3xl font-black font-jetbrains text-brutalist-success">500+</div>
                  <div className="text-sm font-bold uppercase">Creators</div>
                </div>
                <div className="border-4 border-black p-4 bg-white shadow-brutalist">
                  <div className="text-3xl font-black font-jetbrains text-brutalist-success">99%</div>
                  <div className="text-sm font-bold uppercase">Time Saved</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="border-4 border-black shadow-brutalist bg-black">
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" data-section="features">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-black font-space-grotesk text-center mb-16">
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
                className="border-4 border-black bg-white p-6 shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm transition-transform"
              >
                <div className="bg-brutalist-teal w-16 h-16 rounded-full border-4 border-black flex items-center justify-center shadow-brutalist-sm rotate-3 mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-black font-space-grotesk mb-3">{feature.title}</h4>
                <p className="text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8" data-section="how-it-works">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-black font-space-grotesk text-center mb-16">
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
                  <div className="bg-brutalist-purple text-white w-20 h-20 rounded-full border-4 border-black flex items-center justify-center shadow-brutalist mb-4">
                    <span className="text-4xl font-black font-jetbrains">{item.step}</span>
                  </div>
                  <h4 className="text-3xl font-black font-space-grotesk mb-4">{item.title}</h4>
                  <p className="text-xl">{item.description}</p>
                </div>
                <div className="flex-1 border-4 border-black bg-gray-100 h-64 flex items-center justify-center">
                  <span className="text-6xl">📹</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" data-section="pricing">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-black font-space-grotesk text-center mb-16">
            EARLY ADOPTER PRICING
          </h3>

          <div className="relative border-4 border-black bg-white p-8 shadow-brutalist">
            <div className="absolute -top-4 -right-4 bg-brutalist-danger text-white px-6 py-2 border-4 border-black font-black text-sm uppercase rotate-3 shadow-brutalist">
              EARLY ADOPTER SPECIAL
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-black font-jetbrains">$20</span>
                <span className="text-2xl font-bold text-gray-600">/MONTH</span>
              </div>
              <div className="text-xl text-gray-600 line-through font-jetbrains">$49/MONTH</div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                'Unlimited video creation',
                'All templates included',
                'Priority support',
                'Early access to new features',
                'Cancel anytime',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-brutalist-success flex-shrink-0" strokeWidth={4} />
                  <span className="text-lg font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="relative">
              <Button
                onClick={handleSubscribe}
                isLoading={isLoading}
                className="w-full bg-primary text-white border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase text-xl py-6 rounded-sm"
                size="lg"
              >
                SUBSCRIBE NOW
                <span className="absolute -top-3 -right-3 bg-brutalist-teal text-black text-xs px-3 py-1 border-2 border-black font-black rotate-6">
                  LIMITED SPOTS
                </span>
              </Button>
            </div>

            <p className="text-center text-sm mt-6 font-bold">
              14-day money-back guarantee • No questions asked
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-6xl font-black font-space-grotesk mb-6">
            JOIN 500+ CREATORS
          </h3>
          <p className="text-xl md:text-2xl mb-8">
            Start creating videos 10x faster today
          </p>
          <form onSubmit={handleWaitlist} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-4 border-black shadow-brutalist font-medium rounded-sm"
                required
              />
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-primary text-white border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase rounded-sm whitespace-nowrap"
              >
                JOIN NOW
              </Button>
            </div>
            {message && (
              <p className={`mt-4 font-bold ${message.includes('✓') ? 'text-brutalist-success' : 'text-brutalist-danger'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer variant="neo_brutalist" />
      <ContactWidget variant="neo_brutalist" />
    </div>
  )
}
