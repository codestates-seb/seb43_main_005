import styled from "styled-components";
import themes from "../../assets/styels/theme.jsx";

export default function ThemeCircle({ eachTheme, onClick }) {
  const eTheme = themes[eachTheme];
  return (
    <>
      <ThemeImg theme={eTheme} onClick={onClick}></ThemeImg>
    </>
  );
}

const ThemeImg = styled.div`
  width: 0px;
  height: 0px;
  border-bottom: 124px solid ${props => props.theme.main};
  border-right: 124px solid ${props => props.theme.bg};
  border-radius: 50%;
  margin: 34px;
  cursor: pointer;
  filter: drop-shadow(${props => props.theme.shadow});
  :hover {
    transform: scale(1.05);
    transition-duration: 0.5s;
  }
`;
