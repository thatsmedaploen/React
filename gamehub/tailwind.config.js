/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0d1423',
        'dark-card': '#111a2b',
        'dark-border': '#202b40',
        'dark-text': '#94a3b8',
        'dark-muted': '#64748b',
        'primary': '#5145e5',
        'primary-dark': '#302b68',
        'accent-green': '#6ee7b7',
        'accent-green-dark': '#123c34',
        'accent-purple': '#c4b5fd',
        'accent-purple-dark': '#302b52',
        'accent-pink': '#f9a8d4',
        'accent-pink-dark': '#3b1931',
        'accent-yellow': '#fbbf24',
        'gradient-start': '#1b2140',
        'gradient-mid': '#312568',
        'gradient-end': '#2449a0',
      },
      spacing: {
        'sidebar-width': '230px',
      },
      margin: {
        'sidebar-width': '230px',
        'sidebar-width-sm': '190px',
        'sidebar-width-xs': '70px',
      },
    },
    screens: {
      '2xl': { 'max': '1920px' },
      'xl': { 'max': '1280px' },
      'lg': { 'max': '1024px' },
      'md': { 'max': '768px' },
      'sm': { 'max': '650px' },
    },
  },
  plugins: [],
}

