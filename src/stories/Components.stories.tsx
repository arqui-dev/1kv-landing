import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Check, ArrowRight, Download } from 'lucide-react'

// Components showcase
const Components = () => {
  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Component Library</h1>
          <p className="text-lg text-gray-600">
            Reusable UI components styled for each design variant.
          </p>
        </div>

        {/* Buttons */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Buttons</h3>

          {/* Neo-Brutalist Buttons */}
          <div className="mb-8 border border-gray-200 rounded-lg p-6">
            <h4 className="font-bold mb-4 text-gray-900">Neo-Brutalist</h4>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary text-white border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase rounded-sm">
                PRIMARY BUTTON
              </Button>
              <Button className="bg-white text-black border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase rounded-sm">
                SECONDARY
              </Button>
              <Button className="bg-[hsl(174,72%,56%)] text-black border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase rounded-sm">
                TEAL ACCENT
              </Button>
              <Button className="bg-[hsl(271,76%,53%)] text-white border-4 border-black shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm font-bold uppercase rounded-sm">
                PURPLE ACCENT
              </Button>
            </div>
          </div>

          {/* Modern Buttons */}
          <div className="mb-8 border border-gray-200 rounded-lg p-6">
            <h4 className="font-bold mb-4 text-gray-900">Modern/Clean</h4>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-[hsl(11,93%,64%)] to-[hsl(38,92%,50%)] text-white rounded-xl hover:shadow-modern-lg hover:scale-105 font-semibold">
                Primary Button
              </Button>
              <Button className="bg-white text-gray-900 border border-gray-300 rounded-xl hover:shadow-modern hover:scale-105 font-semibold">
                Secondary
              </Button>
              <Button className="bg-gradient-to-r from-primary to-[hsl(11,93%,64%)] text-white rounded-xl hover:shadow-modern-lg hover:scale-105 font-semibold">
                With Icon <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Premium Buttons */}
          <div className="mb-8 border border-gray-200 rounded-lg p-6">
            <h4 className="font-bold mb-4 text-gray-900">Premium</h4>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-[hsl(239,84%,67%)] to-[hsl(189,94%,43%)] text-white rounded-2xl hover:shadow-premium-lg hover:scale-105 font-semibold">
                Start Free Trial
              </Button>
              <Button className="bg-white text-[hsl(239,84%,67%)] border-2 border-[hsl(239,84%,67%)]/20 rounded-2xl hover:shadow-premium hover:scale-105 font-semibold">
                Learn More
              </Button>
              <Button className="bg-white/80 backdrop-blur-sm text-gray-900 border border-gray-200 rounded-2xl hover:shadow-premium font-semibold">
                Secondary
              </Button>
            </div>
          </div>

          {/* Production Studio Buttons */}
          <div className="mb-8 border border-gray-200 rounded-lg p-6 bg-gray-900">
            <h4 className="font-bold mb-4 text-white">Production Studio</h4>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary text-white rounded-lg hover:bg-[hsl(214,84%,66%)] shadow-lg font-semibold">
                Primary CTA
              </Button>
              <Button className="bg-[hsl(220,13%,18%)] text-white border border-[hsl(0,0%,98%)]/10 rounded-lg hover:border-primary shadow-lg font-semibold">
                Secondary
              </Button>
              <Button className="bg-transparent text-white border border-[hsl(0,0%,98%)]/20 rounded-lg hover:bg-[hsl(220,13%,18%)] font-semibold">
                Ghost
              </Button>
            </div>
          </div>
        </div>

        {/* Button Sizes */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Button Sizes</h3>
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm" className="bg-primary text-white rounded-lg">
                Small
              </Button>
              <Button className="bg-primary text-white rounded-lg">
                Default
              </Button>
              <Button size="lg" className="bg-primary text-white rounded-lg">
                Large
              </Button>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Input Fields</h3>

          {/* Neo-Brutalist Input */}
          <div className="mb-6 border border-gray-200 rounded-lg p-6">
            <h4 className="font-bold mb-4 text-gray-900">Neo-Brutalist</h4>
            <Input
              type="email"
              placeholder="Enter your email"
              className="border-4 border-black shadow-brutalist font-medium rounded-sm"
            />
          </div>

          {/* Modern Input */}
          <div className="mb-6 border border-gray-200 rounded-lg p-6">
            <h4 className="font-bold mb-4 text-gray-900">Modern/Clean</h4>
            <Input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-xl focus:ring-2 focus:ring-[hsl(11,93%,64%)] focus:border-transparent shadow-sm"
            />
          </div>

          {/* Premium Input */}
          <div className="mb-6 border border-gray-200 rounded-lg p-6">
            <h4 className="font-bold mb-4 text-gray-900">Premium</h4>
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/80 backdrop-blur-sm border border-[hsl(239,84%,67%)]/20 rounded-xl focus:ring-2 focus:ring-[hsl(239,84%,67%)] shadow-premium"
            />
          </div>

          {/* Production Studio Input */}
          <div className="mb-6 border border-gray-200 rounded-lg p-6 bg-gray-900">
            <h4 className="font-bold mb-4 text-white">Production Studio</h4>
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-[hsl(220,13%,16%)] border border-[hsl(0,0%,98%)]/10 rounded-lg text-white placeholder:text-gray-500 focus:border-primary"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Cards</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Neo-Brutalist Card */}
            <div className="border-4 border-black shadow-brutalist bg-white p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-sm transition-transform">
              <div className="bg-[hsl(174,72%,56%)] w-12 h-12 rounded-full border-4 border-black flex items-center justify-center shadow-brutalist-sm mb-4">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black font-space-grotesk mb-2">FEATURE</h4>
              <p className="text-sm">Neo-brutalist card with bold borders.</p>
            </div>

            {/* Modern Card */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-modern-lg transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(11,93%,64%)] to-[hsl(38,92%,50%)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-modern">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold font-jakarta mb-2">Feature</h4>
              <p className="text-sm text-gray-600">Modern card with gradient accent.</p>
            </div>

            {/* Premium Card */}
            <div className="bg-white/80 backdrop-blur-sm border border-[hsl(239,84%,67%)]/10 rounded-2xl p-6 hover:shadow-premium-lg transition-all group">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(239,84%,67%)] to-[hsl(189,94%,43%)] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-premium">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold font-jakarta mb-2">Feature</h4>
              <p className="text-sm text-gray-600">Premium card with colored shadow.</p>
            </div>

            {/* Studio Card */}
            <div className="bg-[hsl(220,13%,16%)] border border-[hsl(0,0%,98%)]/10 rounded-lg p-6 hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-[hsl(220,13%,18%)] rounded-lg flex items-center justify-center border border-primary/50 mb-4">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Feature</h4>
              <p className="text-sm text-gray-400">Studio card with minimal styling.</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Badges & Labels</h3>
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-bold mb-4 text-gray-900">Neo-Brutalist</h4>
              <div className="flex flex-wrap gap-3">
                <span className="bg-[hsl(174,72%,56%)] text-black px-4 py-2 border-4 border-black shadow-brutalist font-black text-sm uppercase rotate-[-2deg] inline-block">
                  NEW
                </span>
                <span className="bg-[hsl(271,76%,53%)] text-white px-4 py-2 border-4 border-black shadow-brutalist font-black text-sm uppercase inline-block">
                  HOT
                </span>
                <span className="bg-white text-black px-3 py-1 border-2 border-black font-black text-xs uppercase inline-block">
                  EARLY ACCESS
                </span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-bold mb-4 text-gray-900">Modern/Premium</h4>
              <div className="flex flex-wrap gap-3">
                <span className="bg-gradient-to-r from-[hsl(11,93%,64%)] to-[hsl(38,92%,50%)] text-white px-4 py-2 rounded-full font-semibold text-sm shadow-modern">
                  Early Access
                </span>
                <span className="bg-gradient-to-r from-[hsl(239,84%,67%)] to-[hsl(189,94%,43%)] text-white px-4 py-2 rounded-full font-semibold text-sm shadow-premium">
                  Premium
                </span>
                <span className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-900 px-4 py-2 rounded-full font-medium text-sm">
                  New Feature
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-bold mb-3 text-gray-900">Component Best Practices</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>Consistency:</strong> Use the same component style within a variant</li>
            <li>• <strong>Accessibility:</strong> Ensure sufficient color contrast for text and interactive elements</li>
            <li>• <strong>States:</strong> Provide clear hover, focus, and active states</li>
            <li>• <strong>Loading:</strong> Use the Button isLoading prop for async operations</li>
            <li>• <strong>Composition:</strong> Combine primitives to build complex components</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Storybook configuration
const meta: Meta<typeof Components> = {
  title: 'Design System/Components',
  component: Components,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const AllComponents: Story = {}
