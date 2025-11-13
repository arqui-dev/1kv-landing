import { useState, FormEvent } from 'react'
import { Check, ArrowRight, Zap, Layers, Video, Download, BarChart3, FileText, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Footer } from '@/components/layout/Footer'
import { ContactWidget } from '@/components/layout/ContactWidget'
import { redirectToCheckout, addToWaitlist, analytics, validateEmail } from '@/lib'

export function ProductionStudioPTBR() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSubscribe = async () => {
    analytics.trackCTAClick('Assinar', 'hero')
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
      await addToWaitlist(email, 'production_studio_ptbr')
      analytics.trackWaitlistSignup(email)
      setMessage('✓ Você está na lista')
      setEmail('')
    } catch (error: any) {
      setMessage(error.code === '23505' ? 'Email já cadastrado' : 'Falha ao entrar na lista')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-studio-bg text-studio-foreground font-inter">
      <header className="fixed top-0 w-full bg-studio-bg border-b border-studio-foreground/10 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
              <h1 className="text-xl font-semibold">1000 Videos</h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#recursos" className="text-sm text-studio-foreground hover:text-primary transition-colors">Recursos</a>
              <a href="#como-funciona" className="text-sm text-studio-foreground hover:text-primary transition-colors">Como Funciona</a>
              <a href="#precos" className="text-sm text-studio-foreground hover:text-primary transition-colors">Preços</a>
            </nav>
            <div className="hidden md:block">
              <Button onClick={handleSubscribe} className="bg-primary text-white rounded-lg hover:bg-primary-light transition-all">Assinar</Button>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              <div className="w-6 h-0.5 bg-studio-foreground mb-1.5"></div>
              <div className="w-6 h-0.5 bg-studio-foreground mb-1.5"></div>
              <div className="w-6 h-0.5 bg-studio-foreground"></div>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-studio-foreground/10">
              <nav className="flex flex-col gap-4">
                <a href="#recursos" className="text-sm">Recursos</a>
                <a href="#como-funciona" className="text-sm">Como Funciona</a>
                <a href="#precos" className="text-sm">Preços</a>
                <Button onClick={handleSubscribe} className="bg-primary text-white rounded-lg w-full">Assinar</Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative" data-section="hero">
        <div className="absolute inset-0 bg-gradient-radial from-studio-bg-elevated to-studio-bg -z-10"></div>
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="text-sm text-studio-muted font-mono">v0.1.0 • Early Access</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-semibold leading-tight mb-6">
            Crie Vídeos <span className="text-primary">10x MAIS RÁPIDO</span>
          </h2>
          <p className="text-xl md:text-2xl text-studio-muted mb-12 max-w-3xl mx-auto">
            Ferramenta profissional de criação de vídeos para criadores de conteúdo. Gere vídeos faceless em lote em minutos.
          </p>
          <Button onClick={handleSubscribe} isLoading={isLoading} size="lg" className="bg-primary text-white rounded-lg hover:bg-primary-light transition-all text-lg px-12 py-6 shadow-lg shadow-primary/50">
            Assinar por R$ 89,90/3 meses <ArrowRight className="ml-2" />
          </Button>
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl"></div>
            <div className="relative bg-studio-bg-card rounded-lg overflow-hidden border border-primary/30 shadow-2xl">
              <div className="relative pb-[56.25%]">
                <iframe src="https://www.youtube.com/embed/LhzpLcKmJRY" title="1kvideos App Demo" className="absolute top-0 left-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
            {[
              { value: '10.000+', label: 'Vídeos Criados', icon: <Video className="w-5 h-5" /> },
              { value: '500+', label: 'Criadores Ativos', icon: <BarChart3 className="w-5 h-5" /> },
              { value: '99%', label: 'Tempo Economizado', icon: <Zap className="w-5 h-5" /> },
            ].map((stat, i) => (
              <div key={i} className="bg-studio-bg-card border border-studio-foreground/10 rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-2 text-primary">{stat.icon}</div>
                <div className="text-4xl font-semibold font-mono mb-1">{stat.value}</div>
                <div className="text-sm text-studio-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="recursos" className="py-20 px-4 sm:px-6 lg:px-8" data-section="recursos">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-semibold mb-4">Recursos Profissionais</h3>
            <p className="text-lg text-studio-muted">Tudo que você precisa para escalar sua criação de conteúdo</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Layers className="w-6 h-6" />, title: 'Criação em Lote', description: 'Gere dezenas de vídeos a partir de um único script automaticamente.' },
              { icon: <FileText className="w-6 h-6" />, title: 'Sistema de Templates', description: 'Reutilize layouts e configurações. Mantenha consistência sem esforço.' },
              { icon: <Download className="w-6 h-6" />, title: 'Exportação Instantânea', description: 'Exporte para MP4, MOV e todos os formatos. Pronto para produção.' },
              { icon: <BarChart3 className="w-6 h-6" />, title: 'Painel de Análises', description: 'Acompanhe métricas de desempenho em todas as suas plataformas.' },
              { icon: <Video className="w-6 h-6" />, title: 'Script para Vídeo', description: 'Transforme conteúdo escrito em vídeos envolventes instantaneamente.' },
              { icon: <Zap className="w-6 h-6" />, title: 'Biblioteca de Imagens', description: 'Biblioteca de stock integrada ou importe seus próprios recursos.' },
            ].map((f, i) => (
              <div key={i} className="bg-studio-bg-card border border-studio-foreground/10 rounded-lg p-6 hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 bg-studio-bg-elevated rounded-lg flex items-center justify-center text-studio-foreground group-hover:text-primary transition-colors mb-4">{f.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
                <p className="text-studio-muted leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-studio-bg-elevated" data-section="como-funciona">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-semibold mb-4">Como Funciona</h3>
            <p className="text-lg text-studio-muted">Três passos para produção de vídeo simplificada</p>
          </div>
          <div className="space-y-12">
            {[
              { step: '1', title: 'Importe Seu Script', description: 'Cole seu texto ou envie um arquivo. O sistema segmenta inteligentemente para criação de vídeo otimizada.' },
              { step: '2', title: 'Personalize e Visualize', description: 'Selecione templates, ajuste o tempo, adicione mídia. Visualização em tempo real garante resultados perfeitos.' },
              { step: '3', title: 'Exporte Tudo', description: 'Exportação com um clique gera todos os vídeos. Prontos para upload imediato em qualquer plataforma.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white text-2xl font-semibold font-mono">{item.step}</div>
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

      <section id="precos" className="py-20 px-4 sm:px-6 lg:px-8" data-section="precos">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-semibold mb-4">Preço Early Bird</h3>
            <p className="text-lg text-studio-muted">Oferta por tempo limitado para criadores fundadores</p>
          </div>
          <div className="relative bg-studio-bg-card border border-studio-foreground/10 rounded-lg p-8 shadow-xl">
            <div className="absolute -top-4 -right-4 bg-studio-accent-red text-white px-6 py-2 rounded-lg font-semibold text-sm shadow-lg">TEMPO LIMITADO: R$ 89,90/3 meses</div>
            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-semibold">R$ 89,90</span>
                <span className="text-xl text-studio-muted">/3 meses</span>
              </div>
              <div className="text-lg text-studio-muted line-through">R$ 197/mês</div>
              <p className="text-sm text-studio-muted mt-2">Desconto early bird — Economia de R$ 107,10/mês nos primeiros 3 meses</p>
            </div>
            <ul className="space-y-4 mb-8">
              {['Criação ilimitada de vídeos', 'Todos os templates premium', 'Suporte prioritário', 'Acesso antecipado a recursos', 'Cancele quando quiser'].map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-base">{f}</span>
                </li>
              ))}
            </ul>
            <Button onClick={handleSubscribe} isLoading={isLoading} className="w-full bg-primary text-white rounded-lg hover:bg-primary-light transition-all text-lg py-6 shadow-lg shadow-primary/30" size="lg">
              Assinar por R$ 89,90/3 meses
            </Button>
            <p className="text-center text-sm text-studio-muted mt-6">Cancele quando quiser • Política de reembolso de 14 dias</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-studio-bg-elevated">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold mb-4">Confiado por Criadores de Conteúdo</h3>
            <p className="text-studio-muted">Publicando em plataformas em todo o mundo</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            {['YouTube', 'TikTok', 'Instagram', 'Twitter', 'Facebook'].map((p) => (
              <div key={p} className="text-2xl font-semibold hover:opacity-100 hover:grayscale-0 hover:text-primary transition-all cursor-default">{p}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-semibold mb-6">Comece a Criar Hoje</h3>
          <p className="text-xl text-studio-muted mb-8">Junte-se a 500+ criadores fazendo vídeos 10x mais rápido</p>
          <form onSubmit={handleWaitlist} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input type="email" placeholder="Seu email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-studio-bg-card border border-studio-foreground/20 text-studio-foreground rounded-lg focus-visible:ring-primary" required />
              <Button type="submit" isLoading={isLoading} className="bg-primary text-white rounded-lg hover:bg-primary-light transition-all whitespace-nowrap">Começar</Button>
            </div>
            {message && <p className={`mt-4 text-sm ${message.includes('✓') ? 'text-studio-accent-green' : 'text-studio-accent-red'}`}>{message}</p>}
          </form>
        </div>
      </section>

      <Footer variant="production_studio" />
      <ContactWidget variant="production_studio" />
    </div>
  )
}
