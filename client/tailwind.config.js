/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      inter: ["Inter", "sans-serif"]
    },
    borderWidth: {
      "b-1/5": "0.5px"
    },

    maxHeight: {
      "overflow": "70svh"
    },

    minHeight: {
      "phoneHeigth": "100svh",
      "cartItemHeigth": "16svh"
    },
    colors: {
      "light-gray": "#F5F5F5",
      "light-gray-2": "#D6D6D6",
      "primary-bk": "#fff",
      "secondary-orange": "#DC6A6A",
      "green": "#81CB67",
      "light-gree": "#4ED15C",
      "dark-gray": "#605E5E",
    }
  },
  plugins: [],
}
