import React, { useState } from "react";
import styled from "styled-components";
import CustomProgressBar from "./CustomProgressBar.jsx";
import { IoIosArrowBack } from "react-icons/io";
import Checkbox from "./CheckBox.jsx";

function CustomSideBar(props) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = event => {
    setChecked(event.target.checked);
  };

  return (
    <SideBarContainer>
      <h2>
        <IoIosArrowBack /> Redux
      </h2>
      <CustomProgressBar progress={50} feat={"simple"} />
      <Checkbox
        className={"asd"}
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span>Label Text</span>
    </SideBarContainer>
  );
}

export default CustomSideBar;

const SideBarContainer = styled.div`
  padding: 30px;
  /* position: fixed; */
  /* left: 0;
  top: 0; */
  height: calc(100vh - 60px);
  width: 250px;
  border: 5px solid blue;
  box-sizing: border-box;
  > h2 {
    display: flex;
    align-items: center; // 아이템들을 세로축 중앙으로 정렬합니다.
    margin-bottom: 15px;
  }
`;
