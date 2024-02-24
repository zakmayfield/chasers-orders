import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#f8fafc',
          secondary: '#F2F3F5',
          tertiary: '#D0D3D7',
          accent: '#9FADBD',
          text: '#232323',
          greenish: '#22bc57',
        },
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
