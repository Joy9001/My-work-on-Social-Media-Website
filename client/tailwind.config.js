/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<<< HEAD:client/tailwind.config.js
  content: ["./**/*.{html,js,ejs}"],
========
  content: ["./**/*.{html,js}"],
>>>>>>>> 2691759892598d345f77660ceb614c86a97aab8c:People_Search_Pages/tailwind.config.js
  safelist: [
    "bg-slate-500", "bg-white", "bg-slate-300", "bg-[#B8F1B0]", "bg-[#E8FFB1]", "border-[#F2F7A1]", "bg-[#B8F1B0]", "border-[#071952]", "backdrop-blur-sm", "bg-[#F3F8FF]", "fill-lightpurple", "fill-navhoverfill"
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      kode: ['Kode Mono', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      mont: ['Montserrat', 'sans-serif'],
    },
    extend: {
      translate: ["group-hover"],
      spacing: {
        13: '3.25rem',
        18: '4.5rem',
        19: '4.75rem',
        22: '5.5rem',
        58: '14.5rem',
        100: '25rem',
      },
      borderWidth: {
        1: '1px',
      },
      screens: {
        xxs: '400px',
        xs: '500px',
        '3xl': '1800px',
      },
      colors: {
        bodybg: '#f8f9fa',
        lightpurple: '#9376E0',
        navbg: '#dee2ff',
        navhoverfill: '#DEE2E6'
      },
    },
  },
  "plugins": ["prettier-plugin-tailwindcss"]
};
