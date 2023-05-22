import styled from "styled-components";
import ThemeCircle from "./ThemeCircle.jsx";
import { useState, useEffect } from "react";
import { getData, updateData } from "../../api/apiUtil.js";
import { useNavigate } from "react-router-dom";

const themeList = [
  { name: "default", level: 0 },
  { name: "ocean", level: 1 },
  { name: "desert", level: 2 },
  { name: "forest", level: 3 },
  { name: "space", level: 5 },
  { name: "pet", level: 6 },
];

export default function Themes() {
  const navigate = useNavigate();
  // 임시 로컬스테이지 저장 => 서버에 보내기 (/members/theme)
  const handleThemeChange = value => {
    localStorage.setItem("theme", value);
    const payload = { memberTheme: value };
    updateData(payload, "/members/theme", "patch").then(res => {
      console.log(res);
      alert("테마 수정됨.");
    });
    localStorage.getItem("theme");
    // 새로고침해서 적용되면 좋겠는데.. 아니면 모든 theme 을 바꿔줘야 하니까...
    // location.reload();
  };
  // 유저가 여러가지 골라보고 마이페이지에만 적용된 다음에, 적용 버튼 눌러서 저장하면 한번만 서버에 보내면 좋겠는데...
  // app.js 에서 서버 정보를 불러와서 내려주고, 여기서는 로컬에 저장하고 바로 불러와서 보여주기? 저장할때 로컬에서 삭제하고 서버에 patch 요청 보내고...
  // UI : 유저가 선택하고 있는 테마, 클릭한 테마에 이펙트

  // useEffect(() => {
  //   getData("/members/info").then(res => {
  //     // console.log(res.result.level);
  //     setUserLv(res.result.level);
  //   });
  // }, []);

  const [userLv, setUserLv] = useState(2);
  const [openedThemes, setOpenedThemes] = useState([]);

  useEffect(() => {
    const updatedOpenedThemes = themeList.map(theme => ({
      ...theme,
      opened: userLv >= theme.level,
    }));
    setOpenedThemes(updatedOpenedThemes);
  }, [userLv]);

  return (
    <>
      {openedThemes.map(({ name, opened }, idx) => {
        const themeKey = `theme_${idx}`;
        return (
          <ThemeBox className="ThemeBox_0" key={themeKey}>
            <span>Lv.{idx}</span>
            <span> {name}</span>
            <Theme className="Theme">
              <ThemeCircle
                value={`${name}Light`}
                onClick={() => {
                  handleThemeChange(`${name}Light`);
                }}
                role="none"
                eachTheme={`${name}Light`}
                opened={opened}>
                {`${name}Light`}
              </ThemeCircle>
              <ThemeCircle
                value={`${name}Dark`}
                onClick={() => {
                  handleThemeChange(`${name}Dark`);
                }}
                role="none"
                eachTheme={`${name}Dark`}
                opened={opened}>
                {`${name}Dark`}
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
