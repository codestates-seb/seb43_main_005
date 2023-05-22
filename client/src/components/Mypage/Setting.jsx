import styled from "styled-components";
import Themes from "./Themes.jsx";

export default function Setting() {
  return (
    <>
      <ThemeContainer className="ThemeContainer">
        <StyledP>배경테마</StyledP>
        <Line />
        <ThemeWrapper>
          <Themes />
        </ThemeWrapper>
      </ThemeContainer>
    </>
  );
}

const ThemeContainer = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`;
const StyledP = styled.p`
  font-size: 2rem;
`;
const Line = styled.div`
  height: 0px;
  border-bottom: ${props => props.theme.borderBold};
`;
const ThemeWrapper = styled.div`
  height: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  box-sizing: border-box;
  @media ${props => props.theme.mediaQuery.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    grid-template-columns: 1fr;
  }
`;
