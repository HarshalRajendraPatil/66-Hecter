/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navyBlue: "#001F3F",
        gray: "#6C757D",
        gold: "#FFC107",
        lightBeige: "#F8F9FA",
        darkGray: "#343A40",
        darkGold: "#E0A800",
      },
    },
  },
  plugins: [],
};
