import { useState, FormEvent } from 'react'
import { Check, ArrowRight, Zap, Layers, Video, Download, BarChart3, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Footer } from '@/components/layout/Footer'
import { ContactWidget } from '@/components/layout/ContactWidget'
import { redirectToCheckout, addToWaitlist, analytics, validateEmail } from '@/lib'

export function NeoBrutalistPTBR() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSubscribe = async () => {
    analytics.trackCTAClick('Assinar Agora', 'hero')
    analytics.trackCheckoutInitiated()
    setIsLoading(true)
    try {
      await redirectToCheckout(email || undefined)
    } catch (error) {
      console.error('Checkout error:', error)
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
      await addToWaitlist(email, 'neo_brutalist_ptbr')
      analytics.trackWaitlistSignup(email)
      setMessage('✓ Adicionado à lista de espera!')
      setEmail('')
    } catch (error: any) {
      if (error.code === '23505') {
        setMessage('Email já cadastrado!')
      } else {
        setMessage('Falha ao entrar na lista de espera')
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
            <h1 className="text-2xl font-black font-space-grotesk">1000 VÍDEOS</h1>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#recursos" className="font-bold uppercase text-sm hover:text-brutalist-purple">Recursos</a>
              <a href="#como-funciona" className="font-bold uppercase text-sm hover:text-brutalist-purple">Como Funciona</a>
              <a href="#precos" className="font-bold uppercase text-sm hover:text-brutalist-purple">Preços</a>
            </nav>

            <div className="hidden md:block relative">
              <Button
                onClick={handleSubscribe}
                className="bg-brutalist-purple text-white border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase rounded-sm relative"
              >
                Começar Agora
                <span className="absolute -top-2 -right-2 bg-brutalist-teal text-black text-xs px-2 py-1 border-2 border-black font-black rotate-3">
                  EARLY BIRD
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
                <a href="#recursos" className="font-bold uppercase">Recursos</a>
                <a href="#como-funciona" className="font-bold uppercase">Como Funciona</a>
                <a href="#precos" className="font-bold uppercase">Preços</a>
                <Button
                  onClick={handleSubscribe}
                  className="bg-brutalist-purple text-white border-4 border-black shadow-brutalist font-bold uppercase w-full"
                >
                  Começar Agora
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
                <span className="bg-brutalist-teal text-black px-4 py-2 border-4 border-black shadow-brutalist font-black text-sm uppercase rotate-[-2deg] inline-block">
                  NOVO
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black font-space-grotesk leading-tight mb-6">
                CRIE 100 VÍDEOS EM 1 HORA
              </h2>

              <p className="text-xl md:text-2xl mb-8 font-medium">
                Pare de perder tempo. Crie vídeos faceless em lote 10x mais rápido.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  onClick={handleSubscribe}
                  isLoading={isLoading}
                  size="lg"
                  className="bg-brutalist-purple text-white border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase rounded-sm text-lg"
                >
                  COMEÇAR AGORA <ArrowRight className="ml-2" />
                </Button>
                <Button
                  onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-black border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase rounded-sm text-lg"
                >
                  VER COMO FUNCIONA
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="border-4 border-black p-4 bg-white shadow-brutalist">
                  <div className="text-3xl font-black font-jetbrains text-brutalist-success">10.000+</div>
                  <div className="text-sm font-bold uppercase">Vídeos Criados</div>
                </div>
                <div className="border-4 border-black p-4 bg-white shadow-brutalist">
                  <div className="text-3xl font-black font-jetbrains text-brutalist-success">500+</div>
                  <div className="text-sm font-bold uppercase">Criadores</div>
                </div>
                <div className="border-4 border-black p-4 bg-white shadow-brutalist">
                  <div className="text-3xl font-black font-jetbrains text-brutalist-success">99%</div>
                  <div className="text-sm font-bold uppercase">Tempo Economizado</div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Video Embed */}
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
      <section id="recursos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" data-section="recursos">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-black font-space-grotesk text-center mb-16">
            TUDO QUE VOCÊ PRECISA
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers className="w-8 h-8" />,
                title: 'Criação em Lote',
                description: 'Gere dezenas de vídeos a partir de um único script. Sem trabalho manual.',
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: 'Sistema de Templates',
                description: 'Reutilize layouts e configurações. Economize horas em cada projeto.',
              },
              {
                icon: <Download className="w-8 h-8" />,
                title: 'Exportação Instantânea',
                description: 'MP4, MOV, todos os formatos prontos. Faça upload em qualquer lugar, instantaneamente.',
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'Painel de Análises',
                description: 'Acompanhe o desempenho em todas as plataformas. Saiba o que funciona.',
              },
              {
                icon: <Video className="w-8 h-8" />,
                title: 'Script para Vídeo',
                description: 'Escreva uma vez, crie muitos. Perfeito para conteúdo em série.',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Biblioteca de Imagens',
                description: 'Fotos de stock integradas ou use as suas próprias. Totalmente flexível.',
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
      <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8" data-section="como-funciona">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-black font-space-grotesk text-center mb-16">
            COMO FUNCIONA
          </h3>

          <div className="space-y-12">
            {[
              {
                step: '1',
                title: 'Importe Seu Script',
                description: 'Cole seu texto ou envie um arquivo. Nosso sistema divide automaticamente em segmentos de vídeo.',
              },
              {
                step: '2',
                title: 'Personalize e Visualize',
                description: 'Escolha templates, adicione imagens, ajuste o tempo. Veja exatamente como seus vídeos ficarão.',
              },
              {
                step: '3',
                title: 'Exporte Tudo',
                description: 'Clique em exportar e receba todos os seus vídeos em minutos. Prontos para upload no YouTube, TikTok, onde quiser.',
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
      <section id="precos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" data-section="precos">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-black font-space-grotesk text-center mb-16">
            PREÇO EARLY BIRD
          </h3>

          <div className="relative border-4 border-black bg-white p-8 shadow-brutalist">
            <div className="absolute -top-4 -right-4 bg-brutalist-danger text-white px-6 py-2 border-4 border-black font-black text-sm uppercase rotate-3 shadow-brutalist">
              OFERTA ESPECIAL EARLY BIRD
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-black font-jetbrains">R$ 89,90</span>
                <span className="text-2xl font-bold text-gray-600">/3 MESES</span>
              </div>
              <div className="text-xl text-gray-600 line-through font-jetbrains">R$ 197/mês</div>
              <p className="text-sm text-brutalist-purple font-bold mt-2">Apenas nos primeiros 3 meses • Depois R$ 197/mês</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                'Criação ilimitada de vídeos',
                'Todos os templates incluídos',
                'Suporte prioritário',
                'Acesso antecipado a novos recursos',
                'Cancele quando quiser',
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
                className="w-full bg-brutalist-purple text-white border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase text-xl py-6 rounded-sm"
                size="lg"
              >
                ASSINAR AGORA
                <span className="absolute -top-3 -right-3 bg-brutalist-teal text-black text-xs px-3 py-1 border-2 border-black font-black rotate-6">
                  VAGAS LIMITADAS
                </span>
              </Button>
            </div>

            <p className="text-center text-sm mt-6 font-bold">
              Garantia de reembolso de 14 dias • Sem perguntas
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-6xl font-black font-space-grotesk mb-6">
            JUNTE-SE A 500+ CRIADORES
          </h3>
          <p className="text-xl md:text-2xl mb-8">
            Comece a criar vídeos 10x mais rápido hoje
          </p>
          <form onSubmit={handleWaitlist} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-4 border-black shadow-brutalist font-medium rounded-sm"
                required
              />
              <Button
                type="submit"
                isLoading={isLoading}
                className="bg-brutalist-purple text-white border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase rounded-sm whitespace-nowrap"
              >
                ENTRAR AGORA
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
