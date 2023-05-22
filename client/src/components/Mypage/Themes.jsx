import styled from "styled-components";
import ThemeCircle from "./ThemeCircle.jsx";
import { useState } from "react";

export default function Themes() {
  const handleThemeChange = value => {
    // 유저가 바꾼 테마를 서버로 보내서 저장하기 => 임시로 로컬 스토리지에 저장
    localStorage.setItem("theme", value);
    // console.log(`저장 : ${value}`);
    // 다시 가져와서 상태 업데이트하기
    // const savedTheme = localStorage.getItem("theme");
    // setSelectedTheme(savedTheme);
  };

  // 유저의 경험치가 해당 레벨에 도달하지 않았을 경우 : 기본 설정으로 자물쇠 이미지 넣기
  // 유저 인포 가져와서 경험치로 레벨 확인하고나서 opened 여부 내려주기?
  // 경험치 별로 유저 레벨을 계산해놓고... idx 가 레벨보다 크면 setOpened(false)
  const [opened, setOpened] = useState(true);

  const themeList = ["default", "ocean", "desert", "forest", "space", "pet"];

  return (
    <>
      {themeList.map((el, idx) => {
        return (
          <ThemeBox className="ThemeBox" key={idx}>
            <span>Lv.{idx}</span>
            <span> {el}</span>
            <Theme className="Theme">
              <ThemeCircle
                value={`${el}Light`}
                onClick={() => handleThemeChange(`${el}Light`)}
                role="none"
                eachTheme={`${el}Light`}
                opened={opened}>
                {`${el}Light`}
              </ThemeCircle>
              <ThemeCircle
                value={`${el}Dark`}
                onClick={() => handleThemeChange(`${el}Dark`)}
                role="none"
                eachTheme={`${el}Dark`}
                opened={opened}>
                {`${el}Dark`}
              </ThemeCircle>
            </Theme>
          </ThemeBox>
        );
      })}
    </>
  );
}

const ThemeBox = styled.div`
  & > span {
    text-transform: uppercase;
  }
  & > :nth-child(2n) {
    font-weight: bold;
  }
`;
const Theme = styled.div`
  height: 280px;
  background-color: ${props => props.theme.white};
  border: ${props => props.theme.borderBold};
  border-radius: 20px;
  margin: 10px 20px 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
