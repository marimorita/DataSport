/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '920px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '768px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '480px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      animation: {
        modal: 'modal 1s forwards',
        icon: 'icon 1s forwards',
       },
      keyframes: {
        modal: {
          '100%' : {opacity: '1'}
        },
        icon: {
          '0%': {top: '-20%'},
          '100%': {opacity: '1', top:'0' },
        },
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')],
}