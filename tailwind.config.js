module.exports = {
  content: [
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        nunito: ['nunito', 'sans-serif'],
      },
      screens: {
        sm: { max: '768px' },
        ms: { max: '1212px' },
      },
      colors: {
        'gamify-black': '#2E2B2B',
        'gamify-red': '#C21010'
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
