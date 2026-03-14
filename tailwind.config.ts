import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        page: '#0a0a0f',
        surface: '#111118',
        subtle: '#1a1a24',
        border: '#2a2a35',
        accent: '#4ade80',
        'accent-dim': '#22c55e',
        text: {
          primary: '#d4d4d8',
          secondary: '#71717a',
          muted: '#52525b',
        },
        'grey-1': '#515151',
        'grey-2': '#9D9D9D',
        'title-grey': '#999999',
        'blog-color': '#606060',
      },
    },
  },
  plugins: [],
};
export default config;
