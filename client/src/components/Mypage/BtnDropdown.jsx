import styled from "styled-components";
import { useState } from "react";
import Dashbord from "./Dashbord.jsx";
import MyDebate from "./MyComment.jsx";
import Setting from "./Setting.jsx";
import Check from "../../assets/images/check_circle_green.png";

export default function BtnDropdown() {
  const [selected, setSelected] = useState("마이 페이지");
  const menuArr = [
    { name: "대시보드", content: <Dashbord /> },
    { name: "내가 쓴 토론 글", content: <MyDebate /> },
    { name: "설정", content: <Setting /> },
  ];

  const selectMenuHandler = e => {
    setSelected(e.target.value);
  };

  return (
    <>
      <BtnBox>
        <BtnDropBox onChange={selectMenuHandler}>
          {menuArr.map((ele, index) => {
            return (
              <>
                <StyledOption key={index} value={ele.name}>
                  {ele.name}
                </StyledOption>
              </>
            );
          })}
        </BtnDropBox>
      </BtnBox>
      {selected === "대시보드" && <Dashbord />}
      {selected === "내가 쓴 토론 글" && <MyDebate />}
      {selected === "설정" && <Setting />}
    </>
  );
}
const BtnBox = styled.div`
  background: url(Check) no-repeat 97% 50%/15px auto;
`;
const BtnDropBox = styled.select`
  width: 100%;
  border: 1px solid ${props => props.theme.color.main};
  color: ${({ theme }) => theme.color.mainHover};
  font-size: 1rem;
  line-height: 1.5;
  box-sizing: border-box;
  padding: 12px 15px;
  background-color: transparent;

  // 기본 select 화살표 없애기
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  & > button:not(:last-child) {
    margin-right: 15px;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    display: flex;
    justify-content: space-around;
    margin-right: 10px;
  }
`;
const StyledOption = styled.option`
  height: 50px;
  background-color: transparent;
  border-radius: 2px;
  color: ${({ theme }) => theme.color.mainHover};
`;
