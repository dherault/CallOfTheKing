/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        papaya: '#fffdfa',
        primary: {
          50: '#fff1f2',
          100: '#ffdfe1',
          200: '#ffc5c9',
          300: '#ff9da4',
          400: '#ff6470',
          500: '#ff4654',
          600: '#ed1525',
          700: '#c80d1b',
          800: '#a50f1a',
          900: '#88141d',
          950: '#4b0409',
        },
      },
    },
  },
  plugins: [],
}
