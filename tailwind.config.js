/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
    theme: {
          extend: {
                  colors: { primary: '#0a1628', gold: '#c9a84c', 'gold-light': '#d4b96a' },
                  fontFamily: { serif: ['Playfair Display', 'Georgia', 'serif'], sans: ['Inter', 'sans-serif'] },
          },
    },
    plugins: [],
};
