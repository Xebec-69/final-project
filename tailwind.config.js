/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        baumans: ["Baumans", "cursive"],
        sfproreg: ['"SF Pro Display-Regular"', "ui-sans-serif", "system-ui"],
        sfpromed: ['"SF Pro Display-Medium"', "ui-sans-serif", "system-ui"],
        sfprobold: ['"SF Pro Display-Bold"', "ui-sans-serif", "system-ui"],
      },
      colors: {
        customOrange: "#F08700",
      },
    },
  },
  plugins: [],
};
