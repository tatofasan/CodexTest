import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1F7A8C',
        secondary: '#022B3A',
        accent: '#BFDBF7',
        success: '#1EAE98',
        warning: '#F4D35E',
        danger: '#EE6C4D'
      }
    }
  },
  plugins: []
} satisfies Config;
