/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      colors: {
        main: '#C4C4C4',
        gray: {
          light: '#E3E8EE',
          medium: '#7D7D7D',
        },
        accent: '#1B2438',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
