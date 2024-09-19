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
          'radial-bottom': 'radial-gradient(ellipse at bottom, #0d1d31 0%, #0c0d13 100%)',
      },
      height:{
        "b-h":"600px",
        "cell-h":"75px"
      },
      width:{
        "b-w":"800px",
        "cell-w":"100px"
      },
      gridTemplateColumns:{
        "static-cols":"repeat(8,100px)"
      },
    },
  },
  plugins: [],
};
export default config;
