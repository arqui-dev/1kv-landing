import { useState, FormEvent, useEffect } from 'react'
import { Check, ArrowRight, Zap, Layers, Video, Download, BarChart3, FileText, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Footer } from '@/components/layout/Footer'
import { ContactWidget } from '@/components/layout/ContactWidget'
import { redirectToCheckout, addToWaitlist, analytics, validateEmail } from '@/lib'

export function ModernPTBR() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubscribe = async () => {
    analytics.trackCTAClick('Assinar Agora', 'hero')
    analytics.trackCheckoutInitiated()
    setIsLoading(true)
    try {
      await redirectToCheckout(email || undefined)
    } catch (error) {
      setMessage('Falha ao abrir checkout. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWaitlist = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setMessage('Por favor, insira um email válido')
      return
    }
    setIsLoading(true)
    try {
      await addToWaitlist(email, 'modern_ptbr')
      analytics.trackWaitlistSignup(email)
      setMessage('✓ Bem-vindo à comunidade!')
      setEmail('')
    } catch (error: any) {
      setMessage(error.code === '23505' ? 'Email já cadastrado!' : 'Falha ao entrar na lista')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-foreground font-inter">
      <header className={`fixed top-0 w-full z-40 transition-all ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-2xl font-bold font-jakarta bg-gradient-to-r from-modern-orange to-modern-purple bg-clip-text text-transparent">
              1000 Videos
            </h1>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#recursos" className="text-sm font-medium hover:text-modern-orange transition-colors relative group">
                Recursos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-modern-orange to-modern-purple group-hover:w-full transition-all"></span>
              </a>
              <a href="#como-funciona" className="text-sm font-medium hover:text-modern-orange transition-colors relative group">
                Como Funciona
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-modern-orange to-modern-purple group-hover:w-full transition-all"></span>
              </a>
              <a href="#precos" className="text-sm font-medium hover:text-modern-orange transition-colors relative group">
                Preços
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-modern-orange to-modern-purple group-hover:w-full transition-all"></span>
              </a>
            </nav>
            <div className="hidden md:block">
              <Button onClick={handleSubscribe} className="bg-gradient-to-r from-modern-orange to-modern-purple text-white rounded-xl hover:shadow-modern-lg hover:scale-105 font-semibold">
                Começar
              </Button>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              <div className="w-6 h-0.5 bg-black mb-1.5 transition-all"></div>
              <div className="w-6 h-0.5 bg-black mb-1.5 transition-all"></div>
              <div className="w-6 h-0.5 bg-black transition-all"></div>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 bg-white/95 backdrop-blur-lg rounded-b-2xl">
              <nav className="flex flex-col gap-4">
                <a href="#recursos" className="font-medium">Recursos</a>
                <a href="#como-funciona" className="font-medium">Como Funciona</a>
                <a href="#precos" className="font-medium">Preços</a>
                <Button onClick={handleSubscribe} className="bg-gradient-to-r from-modern-orange to-modern-purple text-white rounded-xl w-full">Começar</Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" data-section="hero">
        <div className="absolute inset-0 bg-gradient-to-br from-modern-orange/5 via-transparent to-modern-purple/5 -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-modern-orange/10 to-modern-purple/10 px-4 py-2 rounded-full mb-6 animate-pulse-slow">
              <Sparkles className="w-4 h-4 text-modern-orange" />
              <span className="text-sm font-semibold text-modern-orange">Agora em Early Access</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold font-jakarta leading-tight mb-6 bg-gradient-to-r from-modern-orange via-modern-purple to-modern-purple-dark bg-clip-text text-transparent">
              Crie Vídeos 10x Mais Rápido
            </h2>
            <p className="text-xl md:text-2xl text-modern-muted mb-8 leading-relaxed">
              O aplicativo desktop definitivo para criadores de vídeos faceless. Gere dezenas de vídeos em minutos, não horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button onClick={handleSubscribe} isLoading={isLoading} size="lg" className="bg-gradient-to-r from-modern-orange to-modern-purple text-white rounded-xl hover:shadow-modern-lg hover:scale-105 font-semibold text-lg px-8">
                Assinar Agora • R$ 89,90/3 meses <ArrowRight className="ml-2" />
              </Button>
              <Button onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-foreground border border-gray-200 rounded-xl hover:bg-gray-50 hover:scale-105 font-semibold text-lg px-8">
                Ver Como Funciona
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-modern-orange to-modern-purple rounded-3xl opacity-20 blur-2xl"></div>
              <div className="relative bg-white rounded-2xl shadow-modern-lg overflow-hidden border border-gray-100">
                <div className="relative pb-[56.25%]">
                  <iframe src="https://www.youtube.com/embed/LhzpLcKmJRY" title="1kvideos App Demo" className="absolute top-0 left-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            {[{ value: '10.000+', label: 'Vídeos Criados' }, { value: '500+', label: 'Criadores Ativos' }, { value: '99%', label: 'Tempo Economizado' }].map((stat, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-lg border border-gray-100 rounded-2xl p-6 shadow-modern hover:shadow-modern-lg hover:scale-105 transition-all">
                <div className="text-4xl font-bold font-jakarta bg-gradient-to-r from-modern-orange to-modern-purple bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-sm text-modern-muted font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="recursos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50" data-section="recursos">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-bold font-jakarta mb-4">Tudo Que Você Precisa</h3>
            <p className="text-xl text-modern-muted max-w-2xl mx-auto">Recursos poderosos projetados para ajudá-lo a criar mais conteúdo, mais rápido.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Layers className="w-6 h-6" />, title: 'Criação em Lote', description: 'Gere dezenas de vídeos a partir de um único script. Automatize todo o seu fluxo de trabalho.', gradient: 'from-blue-500 to-cyan-500' },
              { icon: <FileText className="w-6 h-6" />, title: 'Sistema de Templates', description: 'Reutilize layouts e configurações entre projetos. Consistência facilitada.', gradient: 'from-purple-500 to-pink-500' },
              { icon: <Download className="w-6 h-6" />, title: 'Exportação Instantânea', description: 'Exporte para MP4, MOV e todos os formatos populares. Pronto para qualquer plataforma.', gradient: 'from-green-500 to-emerald-500' },
              { icon: <BarChart3 className="w-6 h-6" />, title: 'Painel de Análises', description: 'Acompanhe o desempenho em todas as plataformas. Tome decisões baseadas em dados.', gradient: 'from-orange-500 to-amber-500' },
              { icon: <Video className="w-6 h-6" />, title: 'Script para Vídeo', description: 'Transforme conteúdo escrito em vídeos envolventes automaticamente.', gradient: 'from-red-500 to-rose-500' },
              { icon: <Zap className="w-6 h-6" />, title: 'Biblioteca de Imagens', description: 'Acesse fotos de stock integradas ou importe suas próprias imagens.', gradient: 'from-indigo-500 to-violet-500' },
            ].map((f, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-lg border border-gray-100 rounded-2xl p-6 shadow-modern hover:shadow-modern-lg hover:scale-105 transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white mb-4`}>{f.icon}</div>
                <h4 className="text-xl font-semibold font-jakarta mb-2">{f.title}</h4>
                <p className="text-modern-muted leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8" data-section="como-funciona">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-bold font-jakarta mb-4">Como Funciona</h3>
            <p className="text-xl text-modern-muted">Três passos simples para domínio na criação de vídeos</p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-modern-orange via-modern-purple to-modern-purple-dark -translate-y-1/2 -z-10"></div>
            <div className="grid lg:grid-cols-3 gap-12">
              {[
                { step: '1', title: 'Importe Seu Script', description: 'Cole seu texto ou envie um arquivo. Nosso sistema inteligente divide em segmentos de vídeo perfeitos.' },
                { step: '2', title: 'Personalize e Visualize', description: 'Escolha entre templates lindos, adicione imagens e ajuste o tempo. Visualize em tempo real.' },
                { step: '3', title: 'Exporte Tudo', description: 'Um clique exporta todos os seus vídeos. Faça upload para YouTube, TikTok ou qualquer plataforma instantaneamente.' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-modern-orange to-modern-purple text-white text-2xl font-bold font-jakarta mb-6 shadow-modern">{item.step}</div>
                  <h4 className="text-2xl font-semibold font-jakarta mb-4">{item.title}</h4>
                  <p className="text-modern-muted leading-relaxed">{item.description}</p>
                  <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl h-48 flex items-center justify-center border border-gray-200 shadow-md">
                    <span className="text-6xl opacity-50">📹</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="precos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white" data-section="precos">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-6xl font-bold font-jakarta mb-4">Preço Early Bird</h3>
            <p className="text-xl text-modern-muted">Oferta por tempo limitado para nossos criadores fundadores</p>
          </div>
          <div className="relative bg-white rounded-3xl p-8 shadow-modern-lg border border-gray-100">
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-modern-orange to-modern-purple text-white px-6 py-2 rounded-full font-semibold text-sm shadow-modern">⚡ EARLY BIRD</div>
            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-bold font-jakarta bg-gradient-to-r from-modern-orange to-modern-purple bg-clip-text text-transparent">R$ 89,90</span>
                <span className="text-2xl font-medium text-modern-muted">/3 meses</span>
              </div>
              <div className="text-xl text-modern-muted line-through">R$ 197/mês</div>
              <p className="text-sm text-modern-muted mt-2">Economize nos primeiros 3 meses</p>
            </div>
            <ul className="space-y-4 mb-8">
              {['Criação ilimitada de vídeos', 'Todos os templates premium', 'Suporte prioritário por email', 'Acesso antecipado a novos recursos', 'Cancele quando quiser, sem perguntas'].map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-modern-orange to-modern-purple flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-base font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <Button onClick={handleSubscribe} isLoading={isLoading} className="w-full bg-gradient-to-r from-modern-orange to-modern-purple text-white rounded-xl hover:shadow-modern-lg hover:scale-105 font-semibold text-lg py-6" size="lg">
              Assinar Agora • R$ 89,90/3 meses
            </Button>
            <p className="text-center text-sm text-modern-muted mt-6">Garantia de reembolso de 14 dias • Pagamento seguro via Stripe</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-6xl font-bold font-jakarta mb-6">Junte-se à Nossa Comunidade</h3>
          <p className="text-xl md:text-2xl text-modern-muted mb-8">500+ criadores já estão fazendo vídeos 10x mais rápido</p>
          <form onSubmit={handleWaitlist} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-200 rounded-xl shadow-sm focus-visible:ring-modern-orange" required />
              <Button type="submit" isLoading={isLoading} className="bg-gradient-to-r from-modern-orange to-modern-purple text-white rounded-xl hover:shadow-modern-lg hover:scale-105 font-semibold whitespace-nowrap">
                Começar
              </Button>
            </div>
            {message && <p className={`mt-4 font-medium ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
          </form>
        </div>
      </section>

      <Footer variant="modern" />
      <ContactWidget variant="modern" />
    </div>
  )
}
