import React from "react";
import styled from "styled-components";
import CustomButton from "./CustomButton.jsx";

export default function Empty({ button, text = "데이터가 없습니다." }) {
  const admin = true; // 임시변수
  const feat = {
    course: "강의 등록",
    quiz: "퀴즈 등록",
    content: "학습 등록",
    article: "토론 등록",
  };
  return (
    <EmptyWrap>
      <span className="ment">{text}</span>
      {button && admin && (
        <CustomButton text={feat[button]} path={`/admin/write/${button}`} />
      )}
    </EmptyWrap>
  );
}

const EmptyWrap = styled.div`
  display: grid;
  justify-content: center;
  gap: 15px;
  /* padding-top: 50px; */

  .ment:after {
    content: "｡°(°.◜ᯅ◝°)°｡";
    padding-left: 10px;
  }
  button {
    margin: 0 auto;
  }
`;
