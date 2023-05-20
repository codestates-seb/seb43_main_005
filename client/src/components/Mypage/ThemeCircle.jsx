import styled from "styled-components";
import themes from "../../assets/styels/theme.jsx";
import lock from "../../assets/images/lock.png";

export default function ThemeCircle({ eachTheme, onClick, opened }) {
  const eTheme = themes[eachTheme];
  return (
    <>
      {opened ? (
        <ThemeImg theme={eTheme} onClick={onClick}></ThemeImg>
      ) : (
        <LockedImg />
      )}
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
const LockedImg = styled(ThemeImg)`
  width: 124px;
  height: 124px;
  border: none;
  background-color: ${props => props.theme.gray50};
  background-image: url(${lock});
  background-position: center;
  background-repeat: no-repeat;
  cursor: default;
  :hover {
    transform: none;
  }
`;
