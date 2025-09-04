import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        jost: ["var(--font-jost)"],
        merri: ["var(--font-merriweather)"],
        inter: ["var(--font-inter)"],
      },
      colors: {
        primary: "#3b1060", //
        secondary: "#d3b6c7", //
        tertiary: "#f2e9ee",
        //tertiary: "#e9ccba", // ORANGE LYS HUDFARGE
        highlight: "#",
        accent: "#",
        background: "#f2f3f5",
      },
    },
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
export default config;
