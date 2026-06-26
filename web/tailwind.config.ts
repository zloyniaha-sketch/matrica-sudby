import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        mystic: {
          50: "#faf7ff",
          100: "#f3ecff",
          200: "#e9d9ff",
          300: "#d4b8ff",
          400: "#b88aff",
          500: "#9b5cff",
          600: "#8539f5",
          700: "#7228d8",
          800: "#5f22b0",
          900: "#4f1d8f",
          950: "#310f62",
        },
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
