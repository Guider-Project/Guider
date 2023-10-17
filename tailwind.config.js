const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        homepageBus: "url('/homepage/bus.jpg')",
        aboutBus: "url('/about/bus.jpg')",
        complainsBus: "url('/complains/bus.jpg')",
        newsBus: "url('/news/bus.jpg')",
        privacyBus: "url('/privacy/bus.jpg')",
        trackingBus: "url('/tracking/bus.jpg')",
      },

      colors: {
        primary: "#0891b2",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
