const tailwindcss = require('tailwindcss');
const tailwindcssforms = require('@tailwindcss/forms');
const autoprefixer = require('autoprefixer');
const aspectratio = require('@tailwindcss/aspect-ratio');
const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      black: {
        50: '#909090',
        100: '#303030',
        900: '#212121',
        default: '#000',
      },
      darkGray: '#212121',
      mediumGray: '#303030',
      lightGray: '#909090',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [tailwindcss, tailwindcssforms, autoprefixer, aspectratio],
};
