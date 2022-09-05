module.exports = {
  content: [
    "./index.html",
    "./src/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        pri : "#F4B41A",
        sec : "#143D59"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}