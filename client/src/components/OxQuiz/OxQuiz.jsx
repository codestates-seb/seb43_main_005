import React from "react";
import styled from "styled-components";
import CustomProgressBar from "../common/CustomProgressBar.jsx";
import O from "../../assets/images/O.png";
import X from "../../assets/images/X.png";

function OxQuiz(props) {
  return (
    <QuizContainer>
      <h2>OX퀴즈</h2>

      {/* progress, marginBottom, feat */}
      <CustomProgressBar progress={80} feat={"simple"} />
      <Quiz>자바스크립트는 객체 지향 언어이다.</Quiz>
      <AnswerContainer>
        <Answer>
          <StyledImage src={O} alt="O"></StyledImage>
        </Answer>
        <Answer>
          <StyledImage src={X} alt="X"></StyledImage>
        </Answer>
      </AnswerContainer>
    </QuizContainer>
  );
}

export default OxQuiz;

const QuizContainer = styled.div`
  padding: 50px;
  box-sizing: border-box;
  /* border: 1px solid black; */
  max-width: 1020px;
  width: 90%;
  margin: 0 auto;
  > h2 {
    margin-bottom: 30px;
  }
`;

const Quiz = styled.div`
  border: 1px solid black;
  width: 1028px;
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
  width: 1028px;
  /* border: 3px solid blue; */
`;

const Answer = styled.div`
  width: 500px;
  height: 222px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
`;
