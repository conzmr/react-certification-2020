const tailwindcss = require('tailwindcss');
const tailwindcssforms = require('@tailwindcss/forms');
const autoprefixer = require('autoprefixer');

module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [tailwindcss, tailwindcssforms, autoprefixer],
};
