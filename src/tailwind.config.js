/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6e45e2',
        'primary-dark': '#4a2dbf',
        secondary: '#88d3ce',
        dark: '#121212',
        darker: '#0a0a0a',
        light: '#f5f5f5',
        gray: '#2a2a2a',
        'light-gray': '#3a3a3a',
        accent: '#ff6b6b',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};