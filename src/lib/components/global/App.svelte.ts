const rem = 16;

export const App = $state({
  viewport: {
    width: 0,
    height: 0,
  },
  scroll: {
    x: 0,
    y: 0,
  },
  breakpoints: {
    min: 20 * rem,
    '2xs': 24 * rem,
    xs: 32 * rem,
    sm: 40 * rem,
    md: 48 * rem,
    lg: 64 * rem,
    xl: 80 * rem,
    '2xl': 96 * rem,
  },
});
