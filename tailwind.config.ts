import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        light: {},
        dark: {
          primary: '#18191e',
          secondary: '#1e2028',
          tertiary: '#424047',
          accent: '#6D6873',
          text: '#eee',
          greenish: '#0E7B34',
        },
      },
    },
  },
  plugins: [],
};
export default config;
