import styled from "styled-components";
import Frames from "./Frames.jsx";
import Themes from "./Themes.jsx";

export default function Setting() {
  return (
    <>
      <FrameContainer>
        <StyledP>프레임</StyledP>
        <Line />
        <FrameBox className="FrameBox">
          <Frames />
        </FrameBox>
      </FrameContainer>
      <FrameContainer className="ThemeContainer">
        <StyledP>배경테마</StyledP>
        <Line />
        <ThemeWrapper>
          <Themes />
        </ThemeWrapper>
      </FrameContainer>
    </>
  );
}

const FrameContainer = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`;
const StyledP = styled.p`
  font-size: 2rem;
`;
const Line = styled.div`
  height: 0px;
  border-bottom: ${props => props.theme.color.borderBold};
`;
const FrameBox = styled.div`
  width: 100%;
  /* min-height: 200px; */
  background-color: ${props => props.theme.color.white};
  border-radius: 20px;
  border: ${props => props.theme.color.borderBold};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  @media ${props => props.theme.mediaQuery.tablet} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
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
