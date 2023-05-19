import styled from "styled-components";
import Frames from "./Frames.jsx";
import Themes from "./Themes.jsx";
import { useState } from "react";
import themes from "../../assets/styels/theme.jsx";

export default function Setting() {
  const handleThemeChange = event => {
    // setSelectedTheme(event.target.innerText);
    // 유저가 바꾼 테마를 서버로 보내서 저장하기 => 임시로 로컬 스토리지에 저장
    localStorage.setItem("theme", event.target.innerText);
    // 다시 가져와서 상태 업데이트하기
    const savedTheme = localStorage.getItem("theme");
    // setSelectedTheme(savedTheme);
  };

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
        <div>selectPage</div>
        <div>
          {Object.keys(themes).map(theme => (
            <div
              key={theme}
              value={theme}
              onClick={e => handleThemeChange(e)}
              role="none">
              {theme}
            </div>
          ))}
        </div>
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
  border-bottom: ${props => props.theme.borderBold};
`;
const FrameBox = styled.div`
  width: 100%;
  /* min-height: 200px; */
  background-color: ${props => props.theme.white};
  border-radius: 20px;
  border: ${props => props.theme.borderBold};
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
