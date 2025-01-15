/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sourceCode: ['Source Code Pro', 'serif'],
      },
    },
  },
  plugins: [],
}

