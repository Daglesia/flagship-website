import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      p: ["1rem", "1rem"],
      h1: ["3.75rem", "5.25rem"],
      h2: ["2.25rem", "3.25rem"],
      h3: ["1.5rem", "1.5rem"],
    },
    extend: {
      colors: {
        primary: "#83DEF0",
        background: "#151515",
        "background__variant--light": "#242424",
        secondary: "#52DE7E",
        "secondary__variant--dark": "#5DBE7B",
      },
      animation: {
        gradient: "animatedgradient 6s ease infinite alternate",
      },
    },
  },
};
export default config;
