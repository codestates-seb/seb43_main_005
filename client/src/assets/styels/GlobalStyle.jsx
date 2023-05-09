import { createGlobalStyle } from "styled-components";
import reset from "./reset.css";

const GlobalStyle = createGlobalStyle`
 ${reset}

body{
  background-color: ${props => props.theme.color.bg};
  font-family: 'GmarketSansMedium', cursive;
}
button{
  padding: 0;
  color: ${props => props.theme.color.text};
}
`;
export default GlobalStyle;
