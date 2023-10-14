/** @type {import('tailwindcss').Config} */
const sharedConfig = {
  content: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}', 
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

export default sharedConfig;
