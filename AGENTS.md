# AGENTS.md

Este arquivo fornece orientações para agentes de IA (como Claude Code) ao trabalhar com código neste repositório.

## Visão Geral do Projeto

Este é um projeto de landing pages para **1000 Vídeos (1kvideos)** - um aplicativo desktop que ajuda criadores de conteúdo a gerar vídeos faceless em escala (10x mais rápido que métodos manuais).

**Nome do Produto:** 1000 Videos (1kvideos)
**Versão:** v0.1.0 (Fase Early Adopter)
**Preço:** R$ 89,90 por 3 meses (oferta early bird especial)
**Público-Alvo:** Criadores de conteúdo que fazem vídeos faceless (comentários de notícias, conteúdo educacional, canais com IA voiceover)

---

## Stack Técnico

### Tecnologias Principais
- **Frontend:** React 18 + TypeScript + Vite
- **Estilização:** Tailwind CSS (com tokens de design personalizados)
- **Backend:** Supabase
  - Autenticação (OAuth + email)
  - Banco de dados PostgreSQL (dados de usuário, waitlist, eventos de analytics)
  - Storage (para assets enviados)
- **Pagamentos:** Stripe
  - Checkout de assinatura (recorrente R$ 89,90/3 meses)
  - Link para portal de billing
  - Handlers de webhook para eventos de assinatura
- **Comunicação:**
  - WhatsApp Business API (botão "entrar em contato")
  - Telegram (link da comunidade)
  - Email (SendGrid ou Resend para notificações)

### Estrutura do Projeto
```
1kv-landing/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ContactWidget.tsx (widget flutuante)
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CTA.tsx
│   │   └── ui/ (componentes shadcn)
│   ├── lib/
│   │   ├── supabase.ts (configuração do client)
│   │   ├── supabase.mock.ts (implementação mock)
│   │   ├── stripe.ts (helpers de checkout)
│   │   ├── stripe.mock.ts (implementação mock)
│   │   ├── analytics.ts (rastreamento de eventos)
│   │   ├── analytics.mock.ts (implementação mock)
│   │   └── index.ts (sistema de auto-detecção)
│   ├── styles/
│   │   └── globals.css
│   ├── variants/
│   │   ├── NeoBrutalist.tsx (EN-US, cores teal & purple)
│   │   ├── Modern.tsx (EN-US, cores orange & purple)
│   │   ├── ProductionStudio.tsx (EN-US, tema dark)
│   │   └── pt-br/
│   │       ├── NeoBrutalistPTBR.tsx (PT-BR, cores teal & purple)
│   │       ├── ModernPTBR.tsx (PT-BR, cores orange & purple)
│   │       └── ProductionStudioPTBR.tsx (PT-BR, tema dark)
│   └── App.tsx
├── supabase/
│   └── migrations/ (definições de schema)
└── tailwind.config.ts (tokens de design)
```

---

## Variantes de Design

### 3 Estilos Diferentes x 2 Idiomas = 6 Landing Pages

#### Variante 1: Neo-Brutalist (Teal & Purple)
- **Design:** Estética ousada e anti-corporativa com bordas duras e alto contraste
- **Público:** Criadores Gen-Z e economia criadora
- **Cores:** Teal vibrante (`hsl(174, 72%, 56%)`) e Purple (`hsl(271, 76%, 53%)`)
- **Tipografia:** Space Grotesk (títulos), Inter (corpo), JetBrains Mono (stats)
- **Características:**
  - Bordas pretas de 3-4px em todos os cards, botões, inputs
  - Sombras duras e deslocadas (sem blur)
  - Rotação leve em badges e callout boxes (-2deg a 2deg)
  - Cantos minimamente arredondados

#### Variante 2: Modern/Clean (Orange & Purple)
- **Design:** Estética premium SaaS com gradientes suaves e glass-morphism
- **Público:** Criadores de conteúdo profissionais
- **Cores:** Orange (`hsl(25, 95%, 53%)`) e Purple (`hsl(271, 76%, 53%)`)
- **Tipografia:** Plus Jakarta Sans (títulos), Inter (corpo)
- **Características:**
  - Bordas sutis de 1px ou sem bordas
  - Sombras suaves e em camadas com brilho
  - Cantos generosamente arredondados (rounded-2xl)
  - Glass-morphism com backdrop-blur
  - Animações suaves (hover scale 1.02-1.05)

#### Variante 3: Production Studio (Dark Theme)
- **Design:** Elegância monocromática com acentos azuis estratégicos
- **Público:** Criadores de vídeo sérios e profissionais
- **Cores:** Tema escuro com blue accent (`hsl(214, 84%, 56%)`) apenas para CTAs
- **Tipografia:** Inter Display (títulos), Inter (corpo), Monospace (stats)
- **Características:**
  - Fundo muito escuro (`hsl(220, 13%, 12%)`)
  - Uso mínimo de cor (azul apenas para CTAs)
  - Bordas de 1px com baixa opacidade
  - Sombras mínimas
  - Netflix-esque sophistication

---

## Idiomas e Preços

### PT-BR (Português Brasil)
- **Preço:** R$ 89,90 por 3 meses
- **Preço Regular:** R$ 197/mês (após período early bird)
- **Moeda:** BRL (Real Brasileiro)
- **Duração Especial:** 3 meses

### EN-US (English)
- **Preço:** $20/mês
- **Preço Regular:** $49/mês
- **Moeda:** USD
- **Duração:** Mensal

---

## Sistema de Mocks

### Auto-Detecção
O app detecta automaticamente se credenciais de backend estão disponíveis:
- **Sem credenciais?** → Usa implementações mock (perfeito para testar designs)
- **Com credenciais?** → Usa Stripe/Supabase reais

**Arquivo:** `src/lib/index.ts`

### Implementações Mock
Todos os mocks simulam comportamento real:
- **Stripe Mock** (`stripe.mock.ts`): Dialog de confirmação + redirecionamento
- **Supabase Mock** (`supabase.mock.ts`): Storage in-memory + validação
- **Analytics Mock** (`analytics.mock.ts`): Console logging + tracking

**Modo Mock Ativo:**
```
🎨 DESIGN PREVIEW MODE: Using mock implementations
📝 No backend setup required - perfect for testing designs!
```

---

## Integração de Vídeo

Todas as variantes incluem embed do vídeo de demonstração no Hero:
- **URL:** `https://www.youtube.com/embed/LhzpLcKmJRY`
- **Aspect Ratio:** 16:9 (56.25% padding-bottom)
- **Bordas:** Estilizadas de acordo com a variante
- **Responsivo:** Funciona em mobile, tablet e desktop

---

## Comandos Comuns

### Aplicativo Landing (1kv-landing)

```bash
# Setup
cd 1kv-landing
npm install

# Desenvolvimento
npm run dev          # Inicia dev server (http://localhost:5173)
npm run build        # Build para produção
npm run preview      # Preview do build de produção
npm run lint         # Verificar qualidade do código

# Testar variantes
# PT-BR Neo-Brutalist: http://localhost:5173?variant=neo_brutalist_ptbr
# PT-BR Modern: http://localhost:5173?variant=modern_ptbr
# PT-BR Production: http://localhost:5173?variant=production_studio_ptbr
# EN-US Neo-Brutalist: http://localhost:5173?variant=neo_brutalist
# EN-US Modern: http://localhost:5173?variant=modern
# EN-US Production: http://localhost:5173 (padrão)
```

---

## Padrões de Desenvolvimento

### Adicionando Nova Variante

1. Criar arquivo de variante:
```typescript
// src/variants/NovaVariante.tsx
import { Button } from '@/components/ui/Button'
import { redirectToCheckout, analytics } from '@/lib'

export function NovaVariante() {
  // Implementação
}
```

2. Adicionar ao roteamento em `App.tsx`:
```typescript
case 'nova_variante':
  return <NovaVariante />
```

3. Adicionar cores ao `tailwind.config.ts` se necessário

### Customizando Conteúdo

Editar diretamente nos arquivos de variante:
- `src/variants/NeoBrutalist.tsx` (EN-US)
- `src/variants/pt-br/NeoBrutalistPTBR.tsx` (PT-BR)
- etc.

### Customizando Cores

Editar `tailwind.config.ts`:
```typescript
colors: {
  brutalist: {
    teal: 'hsl(174, 72%, 56%)',
    purple: 'hsl(271, 76%, 53%)',
  },
}
```

---

## Analytics

### Eventos Rastreados
- `page_view`: Carregamento inicial da página
- `section_view`: Quando 50%+ de uma seção está visível
- `cta_click`: Qualquer clique em botão CTA
- `contact_widget_open`: Widget de contato aberto
- `contact_channel_click`: WhatsApp/Telegram/Email clicados
- `waitlist_signup`: Email submetido para waitlist
- `checkout_initiated`: Checkout do Stripe aberto
- `checkout_completed`: Assinatura bem-sucedida
- `checkout_cancelled`: Usuário retornou sem assinar

### Consultar Analytics

No Supabase:
```sql
-- CTAs mais clicados
SELECT
  metadata->>'button_text' as button,
  COUNT(*) as clicks
FROM analytics_events
WHERE event_name = 'cta_click'
GROUP BY button
ORDER BY clicks DESC;

-- Performance de variantes
SELECT
  variant,
  COUNT(DISTINCT metadata->>'session_id') as visitantes_unicos,
  SUM(CASE WHEN event_name = 'checkout_initiated' THEN 1 ELSE 0 END) as checkouts,
  SUM(CASE WHEN event_name = 'checkout_completed' THEN 1 ELSE 0 END) as conversoes
FROM analytics_events
GROUP BY variant;
```

---

## Persistência de Dados

### Storage do App Landing
```
1kv-landing/
├── .env.local                          # Variáveis de ambiente
└── (modo mock: storage in-memory)
```

### Storage do Supabase
- Tabela `users`: Dados de assinatura e conta
- Tabela `waitlist`: Emails capturados antes da conversão
- Tabela `analytics_events`: Rastreamento de interação do usuário

---

## Deployment

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Configurar variáveis de ambiente no dashboard Vercel
# Deploy para produção
vercel --prod
```

### Outras Plataformas
- **Netlify**: `netlify deploy --prod`
- **Cloudflare Pages**: Push para Git e configure no dashboard
- **AWS S3 + CloudFront**: Build e upload para S3

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para guias completos.

---

## Notas Importantes

### Modo Mock vs Produção
- **Desenvolvimento:** Sempre usa mocks (sem backend necessário)
- **Produção:** Configura variáveis de ambiente para usar backends reais

### Idiomas
- **PT-BR:** Interface em português, preços em BRL
- **EN-US:** Interface em inglês, preços em USD

### Cores por Variante
- **Neo-Brutalist:** Teal (`#2DD4BF`) e Purple (`#A855F7`)
- **Modern:** Orange (`#FF6B35`) e Purple (`#A855F7`)
- **Production Studio:** Monochrome + Blue accent (`#3B82F6`)

### Vídeo
- Todas as variantes usam o mesmo vídeo do YouTube
- Embed responsivo com aspect ratio 16:9
- Estilização diferente por variante (bordas, sombras)

### Preços
- **PT-BR Early Bird:** R$ 89,90 por 3 meses → depois R$ 197/mês
- **EN-US Early Adopter:** $20/mês → depois $49/mês

---

## Testing

### Modo Mock (Padrão)
```bash
npm run dev
# Abre http://localhost:5173
# Vê mensagem: "🎨 DESIGN PREVIEW MODE"
# Todos os backends mockados
```

### Console Commands
```javascript
// Ver dados mockados
mockData()

// Verificar variante atual
localStorage.getItem('landing_variant')

// Limpar dados
localStorage.clear()
location.reload()
```

---

## Suporte

- **Email**: support@1kvideos.com
- **Telegram**: Canal da comunidade
- **WhatsApp Business**: Link no ContactWidget
- **Documentação**: Ver README.md, DESIGN_TESTING.md, DEPLOYMENT.md

---

## Roadmap

### Concluído ✅
- [x] Três variantes de design (EN-US)
- [x] Três variantes PT-BR
- [x] Sistema de mocks completo
- [x] Integração Stripe/Supabase
- [x] Analytics tracking
- [x] Embed de vídeo
- [x] Design responsivo
- [x] Novas cores (teal/purple, orange/purple)

### Planejado 📋
- [ ] Suporte multi-idioma (ES, FR)
- [ ] Dashboard avançado de analytics
- [ ] Seção de vídeos de depoimentos
- [ ] Widget de live chat
- [ ] Programa de referral
- [ ] Sistema de afiliados

---

**Criado com ❤️ para criadores de conteúdo em todo o mundo**
