import type { Meta, StoryObj } from '@storybook/react'

// Typography component
const Typography = () => {
  const headingScales = [
    { name: 'text-7xl', size: '72px / 4.5rem', class: 'text-7xl' },
    { name: 'text-6xl', size: '60px / 3.75rem', class: 'text-6xl' },
    { name: 'text-5xl', size: '48px / 3rem', class: 'text-5xl' },
    { name: 'text-4xl', size: '36px / 2.25rem', class: 'text-4xl' },
    { name: 'text-3xl', size: '30px / 1.875rem', class: 'text-3xl' },
    { name: 'text-2xl', size: '24px / 1.5rem', class: 'text-2xl' },
    { name: 'text-xl', size: '20px / 1.25rem', class: 'text-xl' },
  ]

  const bodyScales = [
    { name: 'text-lg', size: '18px / 1.125rem', class: 'text-lg' },
    { name: 'text-base', size: '16px / 1rem', class: 'text-base' },
    { name: 'text-sm', size: '14px / 0.875rem', class: 'text-sm' },
    { name: 'text-xs', size: '12px / 0.75rem', class: 'text-xs' },
  ]

  const fontFamilies = [
    { name: 'Space Grotesk', class: 'font-space-grotesk', usage: 'Neo-Brutalist headings', weight: 'font-black' },
    { name: 'Plus Jakarta Sans', class: 'font-jakarta', usage: 'Modern/Premium headings', weight: 'font-bold' },
    { name: 'Inter', class: 'font-inter', usage: 'Body text (all variants)', weight: 'font-normal' },
    { name: 'JetBrains Mono', class: 'font-jetbrains', usage: 'Stats, code, monospace', weight: 'font-medium' },
  ]

  const fontWeights = [
    { name: 'font-normal', weight: '400', class: 'font-normal' },
    { name: 'font-medium', weight: '500', class: 'font-medium' },
    { name: 'font-semibold', weight: '600', class: 'font-semibold' },
    { name: 'font-bold', weight: '700', class: 'font-bold' },
    { name: 'font-black', weight: '900', class: 'font-black' },
  ]

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Typography System</h1>
          <p className="text-lg text-gray-600">
            Complete typography scale and font families used across all variants.
          </p>
        </div>

        {/* Font Families */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Font Families</h3>
          <div className="space-y-6">
            {fontFamilies.map((font, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className={`text-3xl ${font.class} ${font.weight} mb-2`}>
                      {font.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      <code className="bg-gray-100 px-2 py-1 rounded">{font.class}</code>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Usage</div>
                    <div className="text-sm font-medium text-gray-900">{font.usage}</div>
                  </div>
                </div>
                <div className={`${font.class} text-lg leading-relaxed text-gray-600`}>
                  The quick brown fox jumps over the lazy dog. 0123456789
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heading Scale */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Heading Scale</h3>
          <div className="space-y-6">
            {headingScales.map((scale, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono text-gray-700 min-w-[120px]">
                    {scale.name}
                  </code>
                  <span className="text-sm text-gray-500">{scale.size}</span>
                </div>
                <div className={`${scale.class} font-bold text-gray-900`}>
                  Create Videos 10x Faster
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Body Scale */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Body Text Scale</h3>
          <div className="space-y-6">
            {bodyScales.map((scale, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono text-gray-700 min-w-[120px]">
                    {scale.name}
                  </code>
                  <span className="text-sm text-gray-500">{scale.size}</span>
                </div>
                <div className={`${scale.class} text-gray-600`}>
                  Professional video creation platform for serious content creators. Create, manage, and export hundreds of videos in minutes.
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Font Weights */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Font Weights</h3>
          <div className="space-y-4">
            {fontWeights.map((weight, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono text-gray-700 min-w-[140px]">
                    {weight.name}
                  </code>
                  <span className="text-sm text-gray-500">{weight.weight}</span>
                </div>
                <div className={`${weight.class} text-2xl text-gray-900`}>
                  Create Videos 10x Faster
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Variant Examples */}
        <div className="mb-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Typography by Variant</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Neo-Brutalist</h4>
              <div className="space-y-3">
                <div className="font-space-grotesk font-black text-3xl">HEADING</div>
                <div className="font-inter text-lg">Body text with clear hierarchy</div>
                <div className="font-jetbrains text-sm">10,000+ Videos</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Modern/Clean</h4>
              <div className="space-y-3">
                <div className="font-jakarta font-bold text-3xl">Heading Style</div>
                <div className="font-inter text-lg">Elegant body text</div>
                <div className="font-inter text-sm font-medium">500+ Creators</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Production Studio</h4>
              <div className="space-y-3 bg-gray-900 text-white p-4 rounded-lg">
                <div className="font-inter font-bold text-3xl">Professional</div>
                <div className="font-inter text-lg text-gray-300">Sophisticated typography</div>
                <div className="font-mono text-sm">99% Satisfaction</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Premium</h4>
              <div className="space-y-3">
                <div className="font-jakarta font-bold text-3xl bg-gradient-to-r from-[hsl(239,84%,67%)] to-[hsl(189,94%,43%)] bg-clip-text text-transparent">
                  Premium Style
                </div>
                <div className="font-inter text-lg">Enterprise-grade content</div>
                <div className="font-inter text-sm font-semibold">Trusted by 500+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-bold mb-3 text-gray-900">Typography Best Practices</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>Hierarchy:</strong> Use font size and weight to establish clear content hierarchy</li>
            <li>• <strong>Line Height:</strong> Use <code>leading-relaxed</code> (1.625) for body text, <code>leading-tight</code> (1.25) for headings</li>
            <li>• <strong>Letter Spacing:</strong> Default for body, <code>tracking-tight</code> for large headings</li>
            <li>• <strong>Contrast:</strong> Ensure sufficient contrast between text and background (WCAG AA minimum)</li>
            <li>• <strong>Consistency:</strong> Each variant has specific font pairings - maintain them for brand identity</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Storybook configuration
const meta: Meta<typeof Typography> = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const AllTypography: Story = {}
