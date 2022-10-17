/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0084c7",
        success: "#059669",
        gray50: "#F9FAFB",
        gray100: "#F3F6F9",
        gray150: "#F3F4F6",
        gray200: "#D0D4D9",
        gray300: "#728095",
        gray600: "#4B5563",
        gray700: "#747474",
        gray800: "#1F2937",
        gray900: "#3B3B3B",
        red50: "#FEF2F2",
        red900: "#DC2626",
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("flowbite/plugin"),
  ],
};
