import styled from "styled-components";
import { useState } from "react";
import CustomButton from "../common/CustomButton.jsx";
import Dashbord from "./Dashbord.jsx";
import MyDebate from "./MyComment.jsx";
import Setting from "./Setting.jsx";

export default function BtnTab() {
  const [currentTab, setCurrentTab] = useState(0);
  const menuArr = [
    { name: "대시보드", content: <Dashbord /> },
    { name: "내가 쓴 토론 글", content: <MyDebate /> },
    { name: "설정", content: <Setting /> },
  ];

  const selectMenuHandler = index => {
    setCurrentTab(index);
    console.log(index);
  };

  return (
    <>
      <BtnTabBox>
        {menuArr.map((ele, index) => {
          return (
            <CustomButton
              feat="tag"
              reverse={currentTab === index ? true : false}
              key={index}
              onClick={() => selectMenuHandler(index)}
              text={ele.name}
            />
          );
        })}
      </BtnTabBox>
      <div>
        <div>{menuArr[currentTab].content}</div>
      </div>
    </>
  );
}

const BtnTabBox = styled.div`
  & > button:not(:last-child) {
    margin-right: 15px;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    display: flex;
    justify-content: space-around;
    margin-right: 10px;
  }
`;
