/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        bluelabs: {
          dark: '#020617', // Rich midnight
          surface: '#0f172a', // Slightly lighter navy
          primary: '#3b82f6', // Electric Blue
          accent: '#60a5fa', // Lighter Blue
          text: '#f8fafc', // Off-white
          muted: '#94a3b8', // Muted text
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}