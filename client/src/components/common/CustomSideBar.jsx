import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CustomProgressBar from "./CustomProgressBar.jsx";
import { IoIosArrowBack } from "react-icons/io";
import Checkbox from "./CheckBox.jsx";
import TodoList from "./Todolist.jsx";

function CustomSideBar(props) {
  const [checkboxStatuses, setCheckboxStatuses] = useState([]);

  const [titles, setTitles] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Learn styled-components" },
    { id: 3, text: "Build a todo app" },
  ]);
  useEffect(() => {
    // titles 배열을 기반으로 체크박스 상태 초기화
    const initialStatuses = titles.map(title => ({
      id: title.id,
      checked: false,
    }));
    setCheckboxStatuses(initialStatuses);
  }, [titles]);

  const handleCheckChange = id => {
    setCheckboxStatuses(prevStatuses =>
      prevStatuses.map(status =>
        status.id === id ? { ...status, checked: !status.checked } : status
      )
    );
  };

  return (
    <SideBarContainer>
      <h2>
        <IoIosArrowBack /> Redux
      </h2>
      <CustomProgressBar progress={50} feat={"simple"} />
      <Checkbox />
      {checkboxStatuses.map(status => (
        <Checkbox
          key={status.id}
          text={status.id}
          checked={status.checked}
          onCheck={() => handleCheckChange(status.id)}
        />
      ))}
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
