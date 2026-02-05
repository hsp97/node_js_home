import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "inv-green": "#059669",
        "inv-red": "#dc2626",
        "inv-dark": "#1b2028",
        "inv-nav": "#253040",
        "inv-blue": "#2962ff",
        "inv-light": "#f8f9fa",
        "inv-border": "#e0e3eb",
        "inv-text": "#333333",
        "inv-text-light": "#6a6d78",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
