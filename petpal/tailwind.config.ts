import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors:{
      "orange" : "#FF872F",
      "blue" : "#0075FF",
      "white" : "#FFFFFF",
      "gray" : "#D9D9D9",
      "cream" : "#FAF8ED",
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};
export default config;
