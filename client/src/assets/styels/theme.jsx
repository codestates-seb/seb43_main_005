const size = {
  mobile: "767px",
  tablet: ["768px", "1179px"],
  desktop: "1180px",
};
const mediaQuery = {
  mobile: `screen and (max-width: ${size.mobile})`,
  tablet: `screen and (min-width: ${size.tablet[0]}) and (max-width: ${size.tablet[1]})`,
  desktop: `screen and (min-width: ${size.desktop})`,
};
const color = {
  main: `var(--brand-color)`,
  mainHover: `var(--brand-color-hover)`,
  mainHoverLight: `var(--brand-color-hover-light)`,
  sub: `var(--sub-color)`,
  bg: `var(--bg-color)`,
  text: `var(--text-color)`,
  textBold: `var(--text-bold)`,
  gray200: `var(--gray-200)`,
  gray100: `var(--gray-100)`,
  gray50: `var(--gray-50)`,
  black: `var(--black)`,
  blackOp50: `var(--black-op50)`,
  white: `var(--white)`,
  whiteOp50: `var(--white-op50)`,
  blue: `var(--blue)`,
  red: `var(--red)`,
  borderBold: `var(--border-bold)`,
  borderLight: `var(--border-light)`,
  borderMain: `var(--border-main)`,
};
const theme = {
  mediaQuery,
  color,
};

export default theme;
