import styled from "styled-components";
import { useState } from "react";
import CustomButton from "../common/CustomButton.jsx";
import Dashbord from "./Dashbord.jsx";
import MyDebate from "./MyComment.jsx";
import Setting from "./Themes.jsx";

export default function BtnTab({ menuArr, selected, setSelected }) {
  const selectMenuHandler = index => {
    setSelected(index);
  };

  return (
    <>
      <BtnTabBox>
        {menuArr.map((ele, index) => {
          return (
            <CustomButton
              feat="tag"
              reverse={selected === index ? true : false}
              key={index}
              onClick={() => selectMenuHandler(index)}
              text={ele.name}
            />
          );
        })}
      </BtnTabBox>
      <div>{menuArr[selected].content}</div>
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
