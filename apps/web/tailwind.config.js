const config = require("iqf-web-tailwind/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [config],
  content: [...config.content],

  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "848px",
        ds: "848px",
        lg: "1280px",
        xl: "1536px",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "480px",
          md: "848px",
          ds: "848px",
          lg: "1280px",
          xl: "1536px",
        },
      },
      fontFamily: {
        sans: ["var(--font-degular)", "sans-serif"],
      },
      colors: {
        "page-bg": "#FEFCFA",
        neutral: "#f7f7fa",
        success: "#00a442",
        warning: "#fccd06",
      },
      gridTemplateColumns: {
        720: "repeat(720, minmax(0, 1fr))",
      },
    },
  },
};
