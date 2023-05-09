import React from "react";

import PageContainer from "../common/PageContainer.jsx";
//컴포넌트
import CustomProgressBar from "../components/CustomProgressBar.jsx";
import styled from "styled-components";

function MbtiTest() {
  return (
    <PageContainer>
      <Container>
        <h2>MBTI TEST</h2>
        <CustomProgressBar progress={(1 / 13) * 100} />
        <Quiz>새로운 장소(모임, 수업, 회사)에 가게 된 나는?</Quiz>
        <AnswerBtnContainer>
          <AnswerBtn>옆자리 사람에게 먼저 해맑게 인사한다.</AnswerBtn>
          <AnswerBtn>눈이 마주치면 조심스럽게 인사한다.</AnswerBtn>
        </AnswerBtnContainer>
      </Container>
    </PageContainer>
  );
}

const Container = styled.div`
  max-width: 678px;
  margin: 0 auto;
  display: flex;
  flex-direction: column; //세로 정렬
  justify-content: center;
  text-align: center; //인라인 요소와 텍스트 중앙 정렬
  align-items: center;
`;

const Quiz = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25em;
  //가로 세로
  width: 100%;
  height: 371px;
  box-sizing: border-box;
  margin-bottom: 40px;
  //테두리와 배경색
  border-radius: 5px;
  border: 1px solid ${props => props.theme.color.black};
  background-color: ${props => props.theme.color.white};
`;

const AnswerBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AnswerBtn = styled.button`
  //가로 세로
  font-size: 1em;
  background-color: ${props => props.theme.color.white};
  width: 100%;
  height: 73px;
  border: 1px solid ${props => props.theme.color.black};
  border-radius: 5px;
  margin-bottom: 20px;
`;

export default MbtiTest;
