import type { Config } from 'tailwindcss'
import landingConfig from '../landing/tailwind.config'

const landingContent = Array.isArray(landingConfig.content) ? landingConfig.content : []

const config: Config = {
  ...landingConfig,
  content: Array.from(new Set([
    ...landingContent,
    '../landing/index.html',
    '../landing/src/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ])),
}

export default config
