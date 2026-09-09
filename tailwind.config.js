/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#faf5ff',
          100: '#f3e8ff',
          500: '#9333ea',
          600: '#7e22ce',
          700: '#6b21a8',
          blue: '#7c3aed',
          indigo: '#8b5cf6',
          navy: '#0a0a0a',
          dark: '#1a1a1a'
        }
      }
    },
  },
  plugins: [],
}
