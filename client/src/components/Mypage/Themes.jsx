import styled from "styled-components";
import ThemeCircle from "./ThemeCircle.jsx";
import { useState, useEffect } from "react";
import { getData, updateData } from "../../api/apiUtil.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../redux/features/theme/themeSlice.js";
import useModal from "../../hooks/useModal.js";
import Modal from "./Modal.jsx";

const themeList = [
  { name: "default", level: 0 },
  { name: "ocean", level: 1 },
  { name: "desert", level: 2 },
  { name: "forest", level: 3 },
  { name: "space", level: 4 },
  { name: "pet", level: 5 },
];

export default function Themes() {
  // * 유저 레벨 별로 테마 잠금 풀리기
  const [userLv, setUserLv] = useState(0);
  const [openedThemes, setOpenedThemes] = useState([]);
  const [modal, openModal, closeModal] = useModal();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleThemeChange = value => {
    const payload = { memberTheme: value };
    dispatch(setTheme(value));
    updateData(payload, "/members/theme", "patch")
      .then(res => {
        console.log(res);
        openModal();
        location.reload();
      })
      .catch(error => {
        console.log(error);
        dispatch(setTheme("defaultLight"));
      });
  };

  // === * 유저 레벨 별로 테마 잠금 풀리기 ===
  // 유저 레벨 불러오기
  useEffect(() => {
    getData("/members/info").then(res => {
      setUserLv(res.result.level);
    });
  }, []);
  // 유저레벨 이하의 테마 불러오기(최초 렌더링 시 + 레벨 변경 시)
  useEffect(() => {
    const updatedOpenedThemes = themeList.map(theme => ({
      ...theme,
      opened: userLv >= theme.level,
    }));
    setOpenedThemes(updatedOpenedThemes);
  }, [userLv]);

  return (
    <>
      {modal && (
        <Modal
          feat="테마변경"
          text="테마가 적용되었습니다."
          closeModal={closeModal}
        />
      )}
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
