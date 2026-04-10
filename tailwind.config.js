/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          light: "#c8a97e",
          DEFAULT: "#8B5E3C",
          dark: "#5C3D2E",
        },
      },
    },
  },
  plugins: [],
};
