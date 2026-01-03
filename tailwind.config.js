/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffd700',
        secondary: '#00ff99',
        black: '#121212',
        sports: '#FF9F1C',
        crash: '#074CE3',
        slots: '#FF3300',
        arcade: '#5E00FF',
        casino: '#1ABC9C',
        lottery: '#00ABEA',
        fishing: '#47BA00',
        promotion: '#8F4AFF',
        table: '#FF07DE',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      // responsive
      screens: {
        'max-md': 'screen and (max-width: 768px)',
        'max-sm': '480px',
        'max-xs': '320px',
        'max-2xs': '280px',
        'max-3xs': '240px',
        'max-4xs': '200px',
        'max-5xs': '160px',
        'max-6xs': '120px',
        'max-7xs': '80px',
        'max-8xs': '40px',
      },
    },
  },
  plugins: [],
}