const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      width: {
        sidebar: '250px',
      },
      colors: {
        light: '#FAFAFA',
        red: '#D22919',
        gray: '#DDDDDC',
        'dark-gray': '#696A69',
        black: '#2F2F2F',
      },
    },
    fontFamily: {
      sans: ['Courier Prime', 'sans-serif'],
    },
  },
  plugins: [],
};
