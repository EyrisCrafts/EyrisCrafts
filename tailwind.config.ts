import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
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
      colors: {
        'grey-1': '#515151',
        'grey-2': '#9D9D9D',
        'grey-3': '#f5f5f5',
        'title-grey': '#999999',
        'date-grey': '#D8D3D3',
        'blog-color': '#606060',
        'card-bg': '#FAFAFA',
        'smol-bg': '#A4A4A4',

        // Dark Mode
        'dark-1': '#202124'
      },
      boxShadow: {
        project: '1px 1px 4px rgba(0, 0, 0, 0.1)',
        projectHovered: '4px 4px 7px rgba(0, 0, 0, 0.1)',
        projectLink: '1px 1px 6px rgba(0, 0, 0, 0.1)',
        projectLinkHovered: '1px 1px 6px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
};
export default config;
