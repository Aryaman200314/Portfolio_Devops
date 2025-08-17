/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',             // ← important
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
