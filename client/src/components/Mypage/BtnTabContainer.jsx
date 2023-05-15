import styled from "styled-components";
import BtnDropdown from "./BtnDropdown.jsx";
import BtnTab from "./BtnTab.jsx";
import { useEffect, useState } from "react";

export default function BtnTabContainer() {
  // 창 크기에 따라 버튼 탭(PC)/드롭다운(모바일) 변경하기
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // 이벤트리스너 지워주기
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return (
    <>
      <BtnBox>{windowSize.width < 767 ? <BtnDropdown /> : <BtnTab />}</BtnBox>
    </>
  );
}

const BtnBox = styled.div`
  & > div {
    margin-bottom: 40px;
  }
`;
