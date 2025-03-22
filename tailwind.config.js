import flowbite from 'flowbite-react/tailwind'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {}
  },
  plugins: [
    flowbite.plugin(),
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none', // IE & Edge
          'scrollbar-width': 'none' // Firefox
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none' // Chrome, Safari
        }
      })
    }
  ]
}
