/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    // app content
    "src/**/*.{js,ts,jsx,tsx}",
    // include packages if not transpiling
    "../../packages/iqf-web-ui/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/leaflet-map/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/iqf-web-admin/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/iqf-web-json-forms/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/iqf-web-zeebe/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          sm: "480px",
          md: "768px",
          ds: "848px",
          lg: "1024px",
          xl: "1200px",
        },
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.0125rem" }],

        s: [
          "0.875rem",
          { lineHeight: "1.3125rem", letterSpacing: "0.0125rem" },
        ],
        sm: [
          "0.875rem",
          { lineHeight: "1.3125rem", letterSpacing: "0.0125rem" },
        ],

        base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.0125rem" }],
        m: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.0125rem" }],

        lg: [
          "1.125rem",
          { lineHeight: "1.6875rem", letterSpacing: "0.0125rem" },
        ],
        l: [
          "1.125rem",
          { lineHeight: "1.6875rem", letterSpacing: "0.0125rem" },
        ],

        xl: ["1.25rem", { lineHeight: "1.875", letterSpacing: "0.025rem" }],
      },
      boxShadow: {
        // eq to sm
        s: "0 1px 2px 0 rgb(0 0 0 / 0.05)",

        // eq to md
        m: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",

        // eq to lg
        l: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },

      colors: {
        primary: "var(--iqf-color-primary)",
        "primary-50": "var(--iqf-color-primary-50)",
        "primary-100": "var(--iqf-color-primary-100)",
        "primary-200": "var(--iqf-color-primary-200)",
        "primary-300": "var(--iqf-color-primary-300)",
        "primary-400": "var(--iqf-color-primary-400)",
        "primary-500": "var(--iqf-color-primary-500)",
        "primary-600": "var(--iqf-color-primary-600)",
        "primary-700": "var(--iqf-color-primary-700)",
        "primary-800": "var(--iqf-color-primary-800)",
        "primary-900": "var(--iqf-color-primary-900)",
        "primary-950": "var(--iqf-color-primary-950)",

        secondary: "var(--iqf-color-secondary)",
        "secondary-100": "var(--iqf-color-secondary-100)",
        "secondary-200": "var(--iqf-color-secondary-200)",
        "secondary-300": "var(--iqf-color-secondary-300)",
        "secondary-400": "var(--iqf-color-secondary-400)",
        "secondary-500": "var(--iqf-color-secondary-500)",
        "secondary-600": "var(--iqf-color-secondary-600)",
        "secondary-700": "var(--iqf-color-secondary-700)",
        "secondary-800": "var(--iqf-color-secondary-800)",
        "secondary-900": "var(--iqf-color-secondary-900)",

        success: "var(--iqf-color-success)",
        "success-50": "var(--iqf-color-success-50)",
        "success-100": "var(--iqf-color-success-100)",
        "success-200": "var(--iqf-color-success-200)",
        "success-300": "var(--iqf-color-success-300)",
        "success-400": "var(--iqf-color-success-400)",
        "success-500": "var(--iqf-color-success-500)",
        "success-600": "var(--iqf-color-success-600)",
        "success-700": "var(--iqf-color-success-700)",
        "success-800": "var(--iqf-color-success-800)",
        "success-900": "var(--iqf-color-success-900)",
        "success-950": "var(--iqf-color-success-950)",

        warning: "var(--iqf-color-warning)",
        "warning-100": "var(--iqf-color-warning-100)",
        "warning-200": "var(--iqf-color-warning-200)",
        "warning-300": "var(--iqf-color-warning-300)",
        "warning-400": "var(--iqf-color-warning-400)",
        "warning-500": "var(--iqf-color-warning-500)",
        "warning-600": "var(--iqf-color-warning-600)",
        "warning-700": "var(--iqf-color-warning-700)",

        error: "var(--iqf-color-error)",
        "error-50": "var(--iqf-color-error-50)",
        "error-100": "var(--iqf-color-error-100)",
        "error-200": "var(--iqf-color-error-200)",
        "error-300": "var(--iqf-color-error-300)",
        "error-400": "var(--iqf-color-error-400)",
        "error-500": "var(--iqf-color-error-500)",
        "error-600": "var(--iqf-color-error-600)",
        "error-700": "var(--iqf-color-error-700)",
        "error-800": "var(--iqf-color-error-800)",
        "error-900": "var(--iqf-color-error-900)",
        "error-950": "var(--iqf-color-error-950)",

        neutral: "var(--iqf-color-neutral)",
        "neutral-50": "var(--iqf-color-neutral-50)",
        "neutral-100": "var(--iqf-color-neutral-100)",
        "neutral-200": "var(--iqf-color-neutral-200)",
        "neutral-300": "var(--iqf-color-neutral-300)",
        "neutral-400": "var(--iqf-color-neutral-400)",
        "neutral-500": "var(--iqf-color-neutral-500)",
        "neutral-600": "var(--iqf-color-neutral-600)",
        "neutral-700": "var(--iqf-color-neutral-700)",
        "neutral-800": "var(--iqf-color-neutral-800)",
        "neutral-900": "var(--iqf-color-neutral-900)",
        "neutral-950": "var(--iqf-color-neutral-950)",

        transparent: "transparent",
        focus: "var(--iqf-color-focus-base)",

        // Text
        "text-primary": "var(--iqf-color-neutral-950)",
        "text-secondary": "var(--iqf-color-neutral-700)",
        "text-terciary": "var(--iqf-color-neutral-500)",
        "text-primary-color": "var(--iqf-color-primary-700)", // use-case: primární barva na světlém/bílém pozadí
        "text-disabled": "var(--iqf-color-neutral-300)",
        "text-success": "var(--iqf-color-success-700)",
        "text-error": "var(--iqf-color-error-700)",
        "primary-foreground": "var(--iqf-color-primary-foreground)", // use-case: barva textu na primárním pozadí
      },
      animation: {
        "fade-in": "fadeIn 2s",
        "scale-x-in": "scaleXIn 0.5s",
        "scale-x-out": "scaleXOut 0.5s",
        "slide-up": "slideUp 0.5s",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scaleXIn: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        scaleXOut: {
          "0%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      zIndex: {
        100: "100",
        200: "200",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/typography"),
  ],
};
