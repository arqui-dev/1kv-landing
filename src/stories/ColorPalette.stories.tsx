import type { Meta, StoryObj } from '@storybook/react'

// Color swatch component
const ColorSwatch = ({ name, color, description }: { name: string; color: string; description?: string }) => (
  <div className="flex flex-col">
    <div
      className="w-32 h-32 rounded-lg shadow-lg border border-gray-200 mb-3"
      style={{ backgroundColor: color }}
    ></div>
    <div className="text-sm font-semibold text-gray-900">{name}</div>
    <div className="text-xs text-gray-500 font-mono">{color}</div>
    {description && <div className="text-xs text-gray-600 mt-1">{description}</div>}
  </div>
)

// Color group component
const ColorGroup = ({ title, colors }: { title: string; colors: Array<{ name: string; color: string; description?: string }> }) => (
  <div className="mb-12">
    <h3 className="text-2xl font-bold mb-6 text-gray-900">{title}</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {colors.map((color, idx) => (
        <ColorSwatch key={idx} {...color} />
      ))}
    </div>
  </div>
)

// Main color palette component
const ColorPalette = () => {
  const primaryColors = [
    { name: 'Primary', color: 'hsl(214, 84%, 56%)', description: 'Main brand color' },
    { name: 'Primary Light', color: 'hsl(214, 100%, 66%)', description: 'Hover states' },
    { name: 'Primary Dark', color: 'hsl(214, 84%, 40%)', description: 'Active states' },
  ]

  const brutalistColors = [
    { name: 'Teal', color: 'hsl(174, 72%, 56%)', description: 'Accent badges' },
    { name: 'Teal Dark', color: 'hsl(174, 72%, 40%)', description: 'Teal variant' },
    { name: 'Purple', color: 'hsl(271, 76%, 53%)', description: 'Step numbers' },
    { name: 'Purple Dark', color: 'hsl(271, 76%, 40%)', description: 'Purple variant' },
    { name: 'Success', color: 'hsl(120, 100%, 40%)', description: 'Success states' },
    { name: 'Danger', color: 'hsl(0, 100%, 50%)', description: 'Error states' },
  ]

  const modernColors = [
    { name: 'Coral', color: 'hsl(11, 93%, 64%)', description: 'Primary accent' },
    { name: 'Coral Light', color: 'hsl(11, 93%, 74%)', description: 'Light variant' },
    { name: 'Coral Dark', color: 'hsl(11, 93%, 54%)', description: 'Dark variant' },
    { name: 'Amber', color: 'hsl(38, 92%, 50%)', description: 'Secondary accent' },
    { name: 'Amber Light', color: 'hsl(38, 92%, 60%)', description: 'Light variant' },
    { name: 'Amber Dark', color: 'hsl(38, 92%, 40%)', description: 'Dark variant' },
    { name: 'Muted', color: 'hsl(220, 13%, 60%)', description: 'Text muted' },
  ]

  const studioColors = [
    { name: 'Background', color: 'hsl(220, 13%, 12%)', description: 'Main background' },
    { name: 'BG Elevated', color: 'hsl(220, 13%, 18%)', description: 'Elevated surfaces' },
    { name: 'BG Card', color: 'hsl(220, 13%, 16%)', description: 'Card backgrounds' },
    { name: 'Foreground', color: 'hsl(0, 0%, 98%)', description: 'Text color' },
    { name: 'Muted', color: 'hsl(220, 8%, 50%)', description: 'Muted text' },
    { name: 'Accent Red', color: 'hsl(0, 100%, 60%)', description: 'Error/urgent' },
    { name: 'Accent Green', color: 'hsl(120, 50%, 50%)', description: 'Success' },
  ]

  const premiumColors = [
    { name: 'Indigo', color: 'hsl(239, 84%, 67%)', description: 'Primary gradient' },
    { name: 'Indigo Light', color: 'hsl(239, 84%, 77%)', description: 'Light variant' },
    { name: 'Indigo Dark', color: 'hsl(239, 84%, 57%)', description: 'Dark variant' },
    { name: 'Cyan', color: 'hsl(189, 94%, 43%)', description: 'Secondary gradient' },
    { name: 'Cyan Light', color: 'hsl(189, 94%, 53%)', description: 'Light variant' },
    { name: 'Cyan Dark', color: 'hsl(189, 94%, 33%)', description: 'Dark variant' },
    { name: 'Muted', color: 'hsl(220, 13%, 60%)', description: 'Text muted' },
    { name: 'BG Gradient', color: 'hsl(220, 20%, 98%)', description: 'Background' },
  ]

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">1000 Videos - Color System</h1>
          <p className="text-lg text-gray-600">
            Complete color palette across all design variants. All colors use HSL format for easy manipulation.
          </p>
        </div>

        <ColorGroup title="Primary Colors" colors={primaryColors} />

        <ColorGroup title="Neo-Brutalist (Teal & Purple)" colors={brutalistColors} />

        <ColorGroup title="Modern/Clean (Coral & Amber)" colors={modernColors} />

        <ColorGroup title="Production Studio (Dark Theme)" colors={studioColors} />

        <ColorGroup title="Premium (Indigo & Cyan)" colors={premiumColors} />

        {/* Gradient Examples */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Gradient Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="h-32 rounded-lg bg-gradient-to-r from-[hsl(11,93%,64%)] to-[hsl(38,92%,50%)] shadow-lg mb-3"></div>
              <div className="text-sm font-semibold text-gray-900">Modern Gradient</div>
              <div className="text-xs text-gray-500">Coral → Amber</div>
            </div>
            <div>
              <div className="h-32 rounded-lg bg-gradient-to-r from-[hsl(239,84%,67%)] to-[hsl(189,94%,43%)] shadow-lg mb-3"></div>
              <div className="text-sm font-semibold text-gray-900">Premium Gradient</div>
              <div className="text-xs text-gray-500">Indigo → Cyan</div>
            </div>
            <div>
              <div className="h-32 rounded-lg bg-gradient-to-r from-[hsl(174,72%,56%)] to-[hsl(271,76%,53%)] shadow-lg mb-3"></div>
              <div className="text-sm font-semibold text-gray-900">Brutalist Gradient</div>
              <div className="text-xs text-gray-500">Teal → Purple</div>
            </div>
            <div>
              <div className="h-32 rounded-lg bg-gradient-to-br from-[hsl(220,13%,12%)] to-[hsl(220,13%,18%)] shadow-lg mb-3"></div>
              <div className="text-sm font-semibold text-gray-900">Studio Gradient</div>
              <div className="text-xs text-gray-500">Dark theme layers</div>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="mb-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Usage Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-gray-900">Neo-Brutalist</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• High contrast with 4px borders</li>
                <li>• Teal for accents and badges</li>
                <li>• Purple for numbered steps</li>
                <li>• Hard shadows (no blur)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-900">Modern/Clean</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Coral to Amber gradients</li>
                <li>• Soft shadows with glow</li>
                <li>• Glass-morphism effects</li>
                <li>• Rounded corners (2xl)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-900">Production Studio</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Dark backgrounds only</li>
                <li>• Blue accent for CTAs only</li>
                <li>• Minimal color usage</li>
                <li>• Professional aesthetic</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-900">Premium</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Indigo to Cyan gradients</li>
                <li>• Premium shadows</li>
                <li>• Backdrop blur effects</li>
                <li>• Enterprise positioning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Storybook configuration
const meta: Meta<typeof ColorPalette> = {
  title: 'Design System/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const AllColors: Story = {}
