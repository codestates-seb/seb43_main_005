import { createGlobalStyle } from "styled-components";
import reset from "./reset.css";

const GlobalStyle = createGlobalStyle`
 ${reset}

body{
  background-color: ${props => props.theme.bg};
  font-family: 'GmarketSansMedium', cursive;
  color: ${props => props.theme.text};
}
button{
  padding: 0;
  color: ${props => props.theme.text};
}
`;
export default GlobalStyle;
