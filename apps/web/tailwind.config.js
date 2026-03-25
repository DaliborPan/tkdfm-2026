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
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        "page-bg": "#FEFCFA",
        neutral: "#f7f7fa",
        success: "#00a442",
        warning: "#fccd06",
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      gridTemplateColumns: {
        720: "repeat(720, minmax(0, 1fr))",
      },
    },
  },
};
