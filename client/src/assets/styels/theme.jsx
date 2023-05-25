// 공통 속성
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
  mainHover: `#2b6d55`,
  mainHoverLight: `#e5f0ec`,
  sub: `#fae928`,
  bg: `#FFEFE7`,
  text: `#495057`,
  textBold: `#343a40`,
  gray200: `#868e96`,
  gray100: `#adb5bd`,
  gray50: `#dee2e6`,
  black: `#000000`,
  blackOp50: `rgba(0, 0, 0, 50%)`,
  white: `#ffffff`,
  whiteOp50: `rgba(255, 255, 255, 50%)`,
  blue: `#339af0`,
  red: `#ff6b6b`,
  borderBold: `1px solid #343a40`,
  borderLight: `1px solid #dee2e6`,
  borderMain: `1px solid #39896b`,
  green900: "#343A40", //mypage 레벨도형 외곽선
  disabeld: "#f1f3f5", //mypage disabled input bg, blockquote
  shadow: `2px 2px 5px rgba(0, 0, 0, 0.3)`,
};

const commonTheme = {
  mediaQuery,
  ...color,
};

// 개별 속성
const themes = {
  defaultLight: { ...commonTheme },
  defaultDark: { ...commonTheme, main: "#5EC0CB", bg: "#494949" },
  oceanLight: {
    ...commonTheme,
    main: "#5EC0CB",
    bg: "#FBF2EA",
    borderMain: `1px solid #5EC0CB`,
    mainHover: "#4797a0",
    mainHoverLight: "#FBF2EA",
  },
  oceanDark: {
    ...commonTheme,
    main: "#0F3A5C",
    bg: "#1D2228",
    borderMain: `1px solid #0F3A5C`,
    mainHover: "#134973",
    mainHoverLight: "#1D2228",
  },
  desertLight: {
    ...commonTheme,
    main: "#DA8B2E",
    bg: "#FFF0D8",
    borderMain: `1px solid #DA8B2E`,
    mainHover: "#c07928",
    mainHoverLight: "#FFF0D8",
  },
  desertDark: {
    ...commonTheme,
    main: "#724716",
    bg: "#030C1C",
    borderMain: `1px solid #724716`,
    mainHover: "#85531a",
    mainHoverLight: "#030C1C",
  },
  forestLight: {
    ...commonTheme,
    main: "#16712A",
    bg: "#EBEFDF",
    borderMain: `1px solid #16712A`,
    mainHover: "#115720",
    mainHoverLight: "#EBEFDF",
  },
  forestDark: {
    ...commonTheme,
    main: "#554B6D",
    bg: "#211F2C",
    borderMain: `1px solid #554B6D`,
    mainHover: "#433b56",
    mainHoverLight: "#211F2C",
  },
  spaceLight: {
    ...commonTheme,
    main: "#FF8FFF",
    bg: "#D5F1FF",
    borderMain: `1px solid #FF8FFF`,
    mainHover: "#cb72cb",
    mainHoverLight: "#D5F1FF",
  },
  spaceDark: {
    ...commonTheme,
    main: "#66CADD",
    bg: "#0C090B",
    borderMain: `1px solid #66CADD`,
    mainHover: "#55a8b9",
    mainHoverLight: "#0C090B",
  },
  petLight: {
    ...commonTheme,
    main: "#9C93B5",
    bg: "#F8F4F4",
    borderMain: `1px solid #9C93B5`,
    mainHover: "#767089",
    mainHoverLight: "#F8F4F4",
  },
  petDark: {
    ...commonTheme,
    main: "#99BBBA",
    bg: "#201E1D",
    borderMain: `1px solid #99BBBA`,
    mainHover: "#728d8c",
    mainHoverLight: "#201E1D",
  },
};
export default themes;
