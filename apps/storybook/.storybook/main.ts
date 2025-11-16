import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    const currentDir = dirname(fileURLToPath(import.meta.url))
    const landingSrc = join(currentDir, '../../landing/src')
    const existingAlias = config.resolve?.alias ?? []
    const aliasArray = Array.isArray(existingAlias)
      ? existingAlias
      : Object.entries(existingAlias).map(([find, replacement]) => ({ find, replacement }))

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: [
          ...aliasArray,
          { find: '@', replacement: landingSrc },
        ],
      },
    }
  },
}

export default config
