/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dynamic-black": "#1e1c1f",
        "bee-yellow": "#ffaa31",
        "bee-yellow-hover": "#fe970b",
        "dark-gray": "#232024",
        "bright-star": "#dee2e6",
        pitch: "#413938",
      },
    },
  },
};
