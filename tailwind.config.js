/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0A0A0A",
          dark: "#1A1A1A",
          gold: "#C9A84C",
          light: "#F5F0E8",
          cream: "#FAFAF8",
        },
      },
      fontFamily: {
        brand: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
