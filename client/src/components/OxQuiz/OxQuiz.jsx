import React, { useState } from "react";
import styled from "styled-components";
import CustomProgressBar from "../common/CustomProgressBar.jsx";
import O from "../../assets/images/O.png";
import X from "../../assets/images/X.png";
import resultImg from "../../assets/images/resultImg.png";

function OxQuiz(props) {
  const [isFinished, setisFinished] = useState(false); // 초기 상태를 체크된 상태로 설정
  return (
    <QuizContainer>
      {isFinished ? (
        <>
          <h2>테스트 결과</h2>
          <StyledImage src={resultImg} alt="resultImg"></StyledImage>
          <Quiz>9 / 10 점</Quiz>
        </>
      ) : (
        <>
          <CustomProgressBar progress={80} feat={"simple"} />
          <h2>OX퀴즈</h2>

          <Quiz>자바스크립트는 클래스 기반 객체 지향 언어이다.</Quiz>

          <AnswerContainer>
            <Answer highlighted={true}>
              <StyledImage src={O} alt="O"></StyledImage>
            </Answer>
            <Answer highlighted={false}>
              <StyledImage src={X} alt="X"></StyledImage>
            </Answer>
          </AnswerContainer>
          <QuizSolution>
            <p>정답 : O</p>
            <br />
            <br />
            <br />
            <p>
              풀이 : 자바스크립트는 프로토타입 기반 객체 지향 프로그래밍
              언어입니다.
            </p>
          </QuizSolution>
        </>
      )}
    </QuizContainer>
  );
}

export default OxQuiz;

const QuizContainer = styled.div`
  padding: 50px;
  box-sizing: border-box;
  max-width: 1125px;
  width: 100%;
  margin: 0 auto;
  > h2 {
    margin-bottom: 30px;
  }
`;

const Quiz = styled.div`
  border: ${({ theme }) => theme.color.borderLight};
  border-radius: 8px;
  width: 100%;
  height: 126px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
`;

const Answer = styled.div`
  width: 500px;
  height: 222px;
  border: ${({ highlighted, theme }) =>
    highlighted ? `1px solid ${theme.color.blue}` : theme.color.borderLight};
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 150px;
  height: 150px;
`;

const QuizSolution = styled.div`
  width: 100%;
  height: 222px;
  border: ${({ theme }) => theme.color.borderLight};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 50px;
`;
