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
  main: `#39896B`,
  mainHover: `var(--brand-color-hover)`,
  mainHoverLight: `var(--brand-color-hover-light)`,
  sub: `var(--sub-color)`,
  bg: `#FFEFE7`,
  text: `var(--text-color)`,
  textBold: `var(--text-bold)`,
  gray200: `var(--gray-200)`,
  gray100: `var(--gray-100)`,
  gray50: `var(--gray-50)`,
  black: `var(--black)`,
  blackOp50: `var(--black-op50)`,
  white: `var(--white)`,
  whiteOp50: `var(--white-op50)`,
  blue: `blue`,
  red: `red`,
  borderBold: `var(--border-bold)`,
  borderLight: `var(--border-light)`,
  borderMain: `var(--border-main)`,
  green900: "#343A40", //mypage 레벨도형 외곽선
  disabeld: "#f1f3f5", //mypage disabled input bg
};

const commonTheme = {
  mediaQuery,
  ...color,
};
const themes = {
  // 개별 속성
  defaultLight: { ...commonTheme },
  defaultDark: { ...commonTheme, main: "#5EC0CB", bg: "#494949" },
  oceanLight: {
    ...commonTheme,
    main: "#5EC0CB",
    bg: "#FBF2EA",
  },
  oceanDark: {
    ...commonTheme,
    main: "#0F3A5C",
    bg: "#1D2228",
  },
  desertLight: {
    ...commonTheme,
    main: "#DA8B2E",
    bg: "#FFF0D8",
  },
  desertDark: {
    ...commonTheme,
    main: "#724716",
    bg: "#030C1C",
  },
  forestLight: {
    ...commonTheme,
    main: "#16712A",
    bg: "#EBEFDF",
  },
  forestDark: {
    ...commonTheme,
    main: "#554B6D",
    bg: "#211F2C",
  },
  spaceLight: {
    ...commonTheme,
    main: "#FF8FFF",
    bg: "#D5F1FF",
  },
  spaceDark: {
    ...commonTheme,
    main: "#66CADD",
    bg: "#0C090B",
  },
  puppyLight: {
    ...commonTheme,
    main: "#9C93B5",
    bg: "#F8F4F4",
  },
  kittyDark: {
    ...commonTheme,
    main: "#99BBBA",
    bg: "#201E1D",
  },
};
export default themes;
