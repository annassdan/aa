import {addDynamicIconSelectors} from "@iconify/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        'lobster': ['Lobster', 'sans-serif'],
        'catamaran': ['Philosopher', 'sans-serif']
      },
      colors: {
        'wedding': {
          50: '#f4f9f9',
          100: '#dbeceb',
          200: '#b7d8d8',
          300: '#8bbcbd',
          400: '#639a9e',
          500: '#497e83',
          600: '#396368',
          700: '#305054',
          800: '#2a4245',
          900: '#26393b',
        },
      }
    },

  },

  plugins: [
    addDynamicIconSelectors(),
  ],
};
