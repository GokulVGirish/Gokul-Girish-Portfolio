/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0d0b08',
          900: '#14110d', // page background (matches reference theme colour)
          850: '#191510',
          800: '#1f1a14',
          700: '#2a241c',
        },
        sand: {
          50: '#f6f0e6',
          100: '#ebe3d6',
          300: '#bfb4a3',
          400: '#9c9282',
          500: '#776e61',
        },
        ember: {
          300: '#f5c48a',
          400: '#efab62',
          500: '#e8954a',
          600: '#c97632',
        },
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(239,171,98,0.25), 0 10px 40px -10px rgba(232,149,74,0.35)',
        card: '0 1px 0 0 rgba(255,240,220,0.06) inset, 0 20px 50px -30px rgba(0,0,0,0.8)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.4, transform: 'scale(0.8)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
