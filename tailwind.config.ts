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
        'primary-dark': '#5F0F40',
        'accent-dark' : '#9A031E',
        'primary-light': '#FB8B24',
        'primary-orange': '#E36414'
      }
    },
  },
  plugins: [],
};
export default config;
