module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    textColor: {
      'secondary': '#F39C12'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
