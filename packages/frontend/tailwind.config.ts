import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: '#a0ff00',
          50: '#f0ffe0',
          100: '#d4ffa3',
          200: '#b8ff66',
          300: '#a0ff00',
          400: '#8ce600',
          500: '#6db300',
          600: '#4d8000',
          700: '#335400',
          800: '#1a2b00',
          900: '#0d1500',
        },
        cyber: {
          DEFAULT: '#00ff41',
          dim: '#00cc33',
          bright: '#39ff14',
        },
        dark: {
          50: '#e4e4e7',
          100: '#d4d4d8',
          200: '#a1a1aa',
          300: '#71717a',
          400: '#52525b',
          500: '#3f3f46',
          600: '#27272a',
          700: '#1c1c1f',
          800: '#111114',
          900: '#0a0a0c',
          950: '#050506',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 5px rgba(160,255,0,0.3), inset 0 0 5px rgba(160,255,0,0.05)' },
          '100%': { boxShadow: '0 0 20px rgba(160,255,0,0.5), inset 0 0 10px rgba(160,255,0,0.1)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
