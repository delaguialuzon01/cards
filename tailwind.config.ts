/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:   '#2c2416',
          cream:  '#f8f5f0',
          accent: '#9a7c5a',
          border: '#e8e0d5',
          muted:  '#7a6e64',
        },
      },
      fontFamily: {
        serif: ['"Rotis Sans Serif"', 'Georgia', 'serif'],
        sans:  ['"Rotis Sans Serif"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}