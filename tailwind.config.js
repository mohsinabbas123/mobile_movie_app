/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  // <-- this line is required for NativeWind to work
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};



