/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': ['0.875rem', { lineHeight: '1.5' }],
        'sm': ['1rem', { lineHeight: '1.5' }],
        'base': ['1.125rem', { lineHeight: '1.6' }], // Increased from 1rem
        'lg': ['1.25rem', { lineHeight: '1.5' }],
        'xl': ['1.375rem', { lineHeight: '1.4' }], // Increased from 1.25rem
        '2xl': ['1.75rem', { lineHeight: '1.3' }], // Increased from 1.5rem
        '3xl': ['2.125rem', { lineHeight: '1.2' }], // Increased from 1.875rem
        '4xl': ['2.75rem', { lineHeight: '1.1' }], // Increased from 2.25rem
        '5xl': ['3.5rem', { lineHeight: '1.1' }], // Increased from 3rem
        '6xl': ['4rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      fontFamily: {
        'sans': ['Segoe UI', 'Arial', 'Helvetica Neue', 'Arial', 'Helvetica', 'sans-serif'],
        'serif': ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        'mono': ['Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
