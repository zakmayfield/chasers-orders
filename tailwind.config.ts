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
          text: '#0C0C0C',
          green: {
            50: '#6EF19B',
            100: '#57E086',
            200: '#46CF75',
            300: '#36BF65',
            400: '#2DB55C',
            // base color: `500`
            500: '#24AB52',
            600: '#1c9f49',
            700: '#168D3F',
            800: '#118037',
            900: '#0B6E2D',
          },
        },
        dark: {
          primary: '#18191e',
          secondary: '#1e2028',
          tertiary: '#424047',
          accent: '#6D6873',
          text: '#FFFFFF',
          green: {
            50: '#6EF19B',
            100: '#57E086',
            200: '#46CF75',
            300: '#36BF65',
            400: '#2DB55C',
            // base color: `500`
            500: '#24AB52',
            600: '#1c9f49',
            700: '#168D3F',
            800: '#118037',
            900: '#0B6E2D',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
