import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '-16px 4px 35px 0 rgb(0 0 0 / 0.03)',
      },
    },
  },
  plugins: [],
} satisfies Config
