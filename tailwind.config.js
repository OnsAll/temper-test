/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        "green-temper": {
          100: "#07f984",
          200: "#58ffad",
        },
        "light-green-temper": "#34805c",
        purple: "#6357b5",
        "light-purple": "#7469be",
        "dark-gray": "#7d7d7d",
        "light-gray": "#f5f5f5",
      },
    },
  },
  plugins: [],
};
