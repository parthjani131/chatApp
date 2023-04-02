/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: "#FAFAFA",
        lightGrey: "#DADADA",
        white: "#FFFFFF",
        blue: "#006D9B",
        orange: "#9B7900",
      },
    },
  },
  plugins: [],
};
