import { useEffect, useState, FormEvent } from 'react'
import { ArrowRight, Check, Workflow, Gauge, ShieldCheck, Sparkles, LineChart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Footer } from '@/components/layout/Footer'
import { ContactWidget } from '@/components/layout/ContactWidget'
import { addToWaitlist, analytics, redirectToCheckout, validateEmail } from '@/lib'

export function ModernStudio() {
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
    } catch (err) {
      console.error('Checkout error', err)
      setMessage('Unable to open checkout. Please try again.')
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
      await addToWaitlist(email, 'modern_studio')
      analytics.trackWaitlistSignup(email)
      setMessage('✓ You are on the list!')
      setEmail('')
    } catch (err: any) {
      if (err?.code === '23505') setMessage('Email already registered')
      else setMessage('Could not join. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-inter">
      <header className={`fixed top-0 w-full z-40 transition-all ${scrolled ? 'bg-slate-900/90 border-b border-slate-800 backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="text-xl font-semibold text-white">1000 Videos Studio</div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-200">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          </nav>
          <div className="hidden md:block">
            <Button
              onClick={handleSubscribe}
              className="bg-gradient-to-r from-primary to-modern-coral text-white rounded-xl shadow-modern-lg hover:scale-105"
            >
              Start free
            </Button>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            <div className="w-6 h-0.5 bg-white mb-1.5" />
            <div className="w-6 h-0.5 bg-white mb-1.5" />
            <div className="w-6 h-0.5 bg-white" />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden py-4 bg-slate-900/95 backdrop-blur-lg rounded-b-2xl">
            <nav className="flex flex-col gap-4">
              <a href="#features" className="font-medium">Features</a>
              <a href="#how-it-works" className="font-medium">How It Works</a>
              <a href="#pricing" className="font-medium">Pricing</a>
              <Button onClick={handleSubscribe} className="bg-gradient-to-r from-primary to-modern-coral text-white rounded-xl w-full">Start free</Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" data-section="hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.18),transparent_25%)]" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-primary text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" /> Modern + Studio hybrid
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-jakarta leading-tight text-white mb-4">
              Studio discipline with Modern glow
            </h1>
            <p className="text-lg text-slate-300 mb-6">
              Modern (light) flow adapted to a studio-grade dark UI—hero proof, stats, and fast CTAs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={handleSubscribe}
                size="lg"
                isLoading={isLoading}
                className="bg-gradient-to-r from-primary to-modern-coral text-white rounded-xl shadow-modern-lg hover:scale-105 px-7"
              >
                Launch workspace <ArrowRight className="ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-white/20 text-white hover:border-primary hover:text-primary rounded-xl"
              >
                View pipeline
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[{ value: '10,000+', label: 'Videos Created' }, { value: '500+', label: 'Active Creators' }, { value: '99%', label: 'Time Saved' }].map((stat) => (
                <div key={stat.label} className="bg-slate-900/70 border border-white/10 rounded-xl p-4 shadow-modern">
                  <div className="text-3xl font-bold font-jakarta text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-r from-primary/25 via-modern-coral/25 to-modern-amber/25 blur-3xl rounded-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-4 shadow-modern-lg">
              <div className="relative pb-[56.25%]">
                <iframe
                  src="https://www.youtube.com/embed/LhzpLcKmJRY"
                  title="1kvideos App Demo"
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/80" data-section="features">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">
            EVERYTHING YOU NEED
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Workflow className="w-7 h-7" />,
                title: 'Guided workflows',
                description: 'Modern UI with studio rail-guards to keep edits on brief.',
              },
              {
                icon: <Gauge className="w-7 h-7" />,
                title: 'Render control',
                description: 'GPU-aware batches that balance speed with premium output.',
              },
              {
                icon: <ShieldCheck className="w-7 h-7" />,
                title: 'Provenance',
                description: 'Auditable exports, watermarking, and signed handoffs.',
              },
              {
                icon: <LineChart className="w-7 h-7" />,
                title: 'Insights',
                description: 'Studio dashboards with Modern gradients and sharp typography.',
              },
              {
                icon: <Gauge className="w-7 h-7" />,
                title: 'Queues',
                description: 'Manage priorities across clients and campaigns.',
              },
              {
                icon: <Workflow className="w-7 h-7" />,
                title: 'Brand kits',
                description: 'Preserve typography, LUTs, lower-thirds, and pacing.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-950 border border-white/10 p-6 rounded-2xl shadow-modern hover:shadow-modern-lg hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center border border-white/10 mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8" data-section="how-it-works">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">HOW IT WORKS</h3>
          <div className="space-y-12">
            {[
              { step: '1', title: 'Ingest', description: 'Drop sources, prompts, and brand kits; preset decks keep things coherent.' },
              { step: '2', title: 'Automate', description: 'Caption packs, rhythm cuts, and overlays reuse Modern gradients.' },
              { step: '3', title: 'Deliver', description: 'Studio-grade quality gates and signed review links.' },
            ].map((item, index) => (
              <div key={item.step} className={`flex flex-col ${index % 2 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-primary to-modern-coral text-white w-16 h-16 rounded-xl flex items-center justify-center shadow-modern-lg mb-4">
                    <span className="text-2xl font-bold">{item.step}</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-white mb-3">{item.title}</h4>
                  <p className="text-lg text-slate-300">{item.description}</p>
                </div>
                <div className="flex-1 bg-slate-900/70 border border-white/10 rounded-2xl h-56 flex items-center justify-center text-5xl">
                  🎬
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/80" data-section="pricing">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-modern-lg">
            <div className="text-sm text-primary font-semibold mb-2">Teams</div>
            <div className="text-4xl font-bold text-white mb-2">$49<span className="text-lg text-slate-400">/mo</span></div>
            <p className="text-slate-300 mb-6">Modern polish with studio approval steps for teams.</p>
            <ul className="space-y-3 text-slate-200 text-sm mb-6">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Team seats & permissions</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Render queue manager</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Brand kits + presets</li>
            </ul>
            <Button onClick={handleSubscribe} className="bg-gradient-to-r from-primary to-modern-coral text-white rounded-xl w-full shadow-modern-lg">
              Choose Teams
            </Button>
          </div>
          <div className="rounded-3xl border border-primary/40 bg-primary/10 p-8 shadow-modern-lg">
            <div className="text-sm text-primary font-semibold mb-2">Studios</div>
            <div className="text-4xl font-bold text-white mb-2">Custom</div>
            <p className="text-slate-100 mb-6">Enterprise support, SSO, SLA, and air-gapped delivery if needed.</p>
            <ul className="space-y-3 text-slate-100 text-sm mb-6">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Dedicated success</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Audit logging</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Custom workflows</li>
            </ul>
            <Button
              variant="outline"
              onClick={() => analytics.trackCTAClick('Contact sales', 'pricing')}
              className="border-white/30 text-white hover:border-primary hover:text-primary rounded-xl"
            >
              Talk to us
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" data-section="cta">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Bring Modern polish to studio workflows</h3>
          <p className="text-slate-300 mb-6">Same high-converting flow as the light Modern page, restyled for studio dark.</p>
          <form onSubmit={handleWaitlist} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Work email"
              className="bg-slate-900 border border-white/10 text-white placeholder:text-slate-500"
            />
            <Button type="submit" isLoading={isLoading} className="bg-gradient-to-r from-primary to-modern-coral text-white rounded-xl shadow-modern-lg">
              Get early access
            </Button>
          </form>
          {message && <p className="text-sm text-primary mt-2">{message}</p>}
        </div>
      </section>

      <Footer variant="modern_studio" />
      <ContactWidget variant="modern_studio" />
    </div>
  )
}
