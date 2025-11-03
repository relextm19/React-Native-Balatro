/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./ui/**/*.{js,jsx,ts,tsx}",
    "./interfaces/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        customRed: '#c01e1eff',
        darkBg: '#272521',
        lightBorder: '#334444',
        accentGold: '#e0ae07',
      },
      borderRadius: {
        main: '8px',
      },
    },
  },
  plugins: [],
}
