/* global tailwind */

// Shared Tailwind CDN config for all root pages.
// Keep this file small and stable: it should cover the union of tokens used by the mockups.
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary-rgb) / <alpha-value>)",
        "primary-dark": "rgb(var(--color-primary-dark-rgb) / <alpha-value>)",
        "background-light": "rgb(var(--color-background-light-rgb) / <alpha-value>)",
        "background-dark": "rgb(var(--color-background-dark-rgb) / <alpha-value>)",
        "surface-dark": "rgb(var(--color-surface-dark-rgb) / <alpha-value>)",
        "surface-card": "rgb(var(--color-surface-card-rgb) / <alpha-value>)",
        "surface-lighter": "rgb(var(--color-surface-lighter-rgb) / <alpha-value>)",
        "surface-grey": "rgb(var(--color-surface-grey-rgb) / <alpha-value>)",
        success: "rgb(var(--color-success-rgb) / <alpha-value>)",
        error: "rgb(var(--color-error-rgb) / <alpha-value>)",
        "accent-cyan": "rgb(var(--color-accent-cyan-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["Roboto Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      backgroundImage: {
        // Used by workflow/portfolio pages.
        "mesh-grid":
          "linear-gradient(to right, rgb(var(--color-primary-rgb) / 0.10) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-primary-rgb) / 0.10) 1px, transparent 1px)",
        // Used by UI-kit blocks page.
        "grid-pattern":
          "linear-gradient(to right, var(--color-surface-lighter) 1px, transparent 1px), linear-gradient(to bottom, var(--color-surface-lighter) 1px, transparent 1px)",
      },
    },
  },
};
