/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        screens: {
          DEFAULT: "100%",
          md: "1300px"
        }
      }
    },
  },
  plugins: [],
}

