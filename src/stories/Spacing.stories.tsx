import type { Meta, StoryObj } from '@storybook/react'

// Spacing component
const Spacing = () => {
  const spacingScale = [
    { name: 'xs', size: '0.5rem / 8px', value: '0.5rem' },
    { name: 'sm', size: '1rem / 16px', value: '1rem' },
    { name: 'md', size: '1.5rem / 24px', value: '1.5rem' },
    { name: 'lg', size: '2rem / 32px', value: '2rem' },
    { name: 'xl', size: '3rem / 48px', value: '3rem' },
    { name: '2xl', size: '4rem / 64px', value: '4rem' },
    { name: '3xl', size: '6rem / 96px', value: '6rem' },
  ]

  const shadows = [
    {
      name: 'brutalist',
      class: 'shadow-brutalist',
      css: '8px 8px 0 0 hsl(0, 0%, 0%)',
      description: 'Hard shadow, no blur',
    },
    {
      name: 'brutalist-sm',
      class: 'shadow-brutalist-sm',
      css: '4px 4px 0 0 hsl(0, 0%, 0%)',
      description: 'Small hard shadow',
    },
    {
      name: 'modern',
      class: 'shadow-modern',
      css: '0 4px 20px hsla(220, 13%, 18%, 0.08)',
      description: 'Soft glow effect',
    },
    {
      name: 'modern-lg',
      class: 'shadow-modern-lg',
      css: '0 10px 40px hsla(220, 13%, 18%, 0.12)',
      description: 'Large soft shadow',
    },
    {
      name: 'premium',
      class: 'shadow-premium',
      css: '0 8px 30px hsla(239, 84%, 67%, 0.12)',
      description: 'Colored shadow',
    },
    {
      name: 'premium-lg',
      class: 'shadow-premium-lg',
      css: '0 20px 60px hsla(239, 84%, 67%, 0.2)',
      description: 'Large colored shadow',
    },
  ]

  const borderRadius = [
    { name: 'rounded-sm', size: '2px', class: 'rounded-sm' },
    { name: 'rounded', size: '4px', class: 'rounded' },
    { name: 'rounded-md', size: '6px', class: 'rounded-md' },
    { name: 'rounded-lg', size: '8px', class: 'rounded-lg' },
    { name: 'rounded-xl', size: '12px', class: 'rounded-xl' },
    { name: 'rounded-2xl', size: '16px', class: 'rounded-2xl' },
    { name: 'rounded-3xl', size: '24px', class: 'rounded-3xl' },
    { name: 'rounded-full', size: '9999px', class: 'rounded-full' },
  ]

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Spacing & Layout System</h1>
          <p className="text-lg text-gray-600">
            Spacing scale, shadows, and border radius tokens for consistent layouts.
          </p>
        </div>

        {/* Spacing Scale */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Spacing Scale</h3>
          <div className="space-y-6">
            {spacingScale.map((space, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-6 mb-4">
                  <code className="text-sm bg-gray-100 px-3 py-1 rounded font-mono text-gray-700 min-w-[80px]">
                    {space.name}
                  </code>
                  <span className="text-sm text-gray-500">{space.size}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="bg-blue-500"
                    style={{ width: space.value, height: space.value }}
                  ></div>
                  <div className="text-sm text-gray-600">Visual representation</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shadows */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Shadow System</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {shadows.map((shadow, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6">
                <div className="mb-4">
                  <code className="text-sm bg-gray-100 px-3 py-1 rounded font-mono text-gray-700">
                    {shadow.class}
                  </code>
                  <div className="text-sm text-gray-500 mt-2">{shadow.description}</div>
                </div>
                <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div
                    className={`w-32 h-32 bg-white ${shadow.class} ${
                      shadow.name.includes('brutalist') ? 'border-4 border-black' : ''
                    } rounded-lg flex items-center justify-center`}
                  >
                    <span className="text-2xl">📦</span>
                  </div>
                </div>
                <div className="mt-4 text-xs font-mono text-gray-500 break-all">
                  {shadow.css}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Border Radius */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Border Radius</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {borderRadius.map((radius, idx) => (
              <div key={idx} className="text-center">
                <div
                  className={`w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 mx-auto mb-3 ${radius.class}`}
                ></div>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono text-gray-700 block mb-1">
                  {radius.name}
                </code>
                <div className="text-xs text-gray-500">{radius.size}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Layout Examples */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Component Spacing Examples</h3>
          <div className="space-y-8">
            {/* Stack Spacing */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-bold mb-4 text-gray-900">Vertical Stack (space-y-*)</h4>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="bg-blue-500 h-12 rounded"></div>
                  <div className="bg-blue-500 h-12 rounded"></div>
                  <div className="bg-blue-500 h-12 rounded"></div>
                </div>
                <div className="text-xs text-gray-500 mt-4">
                  Using <code className="bg-gray-200 px-2 py-1 rounded">space-y-4</code>
                </div>
              </div>
            </div>

            {/* Grid Gap */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-bold mb-4 text-gray-900">Grid Gap (gap-*)</h4>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-purple-500 h-16 rounded"></div>
                  <div className="bg-purple-500 h-16 rounded"></div>
                  <div className="bg-purple-500 h-16 rounded"></div>
                  <div className="bg-purple-500 h-16 rounded"></div>
                  <div className="bg-purple-500 h-16 rounded"></div>
                  <div className="bg-purple-500 h-16 rounded"></div>
                </div>
                <div className="text-xs text-gray-500 mt-4">
                  Using <code className="bg-gray-200 px-2 py-1 rounded">gap-6</code>
                </div>
              </div>
            </div>

            {/* Padding */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h4 className="font-bold mb-4 text-gray-900">Padding (p-*, px-*, py-*)</h4>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="bg-green-500 p-8 rounded inline-block">
                  <div className="bg-white rounded p-4">
                    Content with padding
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-4">
                  Outer: <code className="bg-gray-200 px-2 py-1 rounded">p-8</code>,
                  Inner: <code className="bg-gray-200 px-2 py-1 rounded">p-4</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Variant-Specific Patterns */}
        <div className="mb-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Variant-Specific Patterns</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-3 text-gray-900">Neo-Brutalist</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-16 border-4 border-black shadow-brutalist bg-white rounded-sm"></div>
                  <div>
                    <div>4px borders</div>
                    <div className="text-xs">Hard shadows</div>
                  </div>
                </div>
                <ul className="space-y-1">
                  <li>• No rounded corners (rounded-sm only)</li>
                  <li>• 8px offset hard shadows</li>
                  <li>• 4px solid borders</li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-gray-900">Modern/Premium</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-16 shadow-modern bg-white rounded-2xl"></div>
                  <div>
                    <div>2xl corners</div>
                    <div className="text-xs">Soft shadows</div>
                  </div>
                </div>
                <ul className="space-y-1">
                  <li>• Generous rounding (rounded-2xl, rounded-3xl)</li>
                  <li>• Soft shadows with blur</li>
                  <li>• Glass-morphism (backdrop-blur)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-bold mb-3 text-gray-900">Spacing Best Practices</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>Consistency:</strong> Use the spacing scale for all margins and padding</li>
            <li>• <strong>Hierarchy:</strong> Larger spacing for major sections, smaller for related content</li>
            <li>• <strong>Breathing Room:</strong> Don't be afraid of whitespace - it improves readability</li>
            <li>• <strong>Mobile First:</strong> Start with mobile spacing, scale up for larger screens</li>
            <li>• <strong>Shadows:</strong> Use variant-appropriate shadows to maintain visual identity</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Storybook configuration
const meta: Meta<typeof Spacing> = {
  title: 'Design System/Spacing',
  component: Spacing,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const AllSpacing: Story = {}
