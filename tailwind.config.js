/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        site: "url('./assets/dark-green.jpg')",
        abstract: "url('./assets/abstract.jpg')"
      }
    },
  },
  plugins: [],
}

