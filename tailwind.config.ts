import * as palette from './package/theme/palette';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './module/**/*.{js,ts,jsx,tsx,mdx}',
    './core/**/*.{js,ts,jsx,tsx,mdx}',
    './package/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: palette,
    fontFamily: {
      inter: 'var(--font-inter)',
    },
  },
  plugins: [],
}