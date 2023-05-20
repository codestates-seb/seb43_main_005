import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CustomProgressBar from "../common/CustomProgressBar.jsx";
import O from "../../assets/images/O.png";
import X from "../../assets/images/X.png";
import resultImg from "../../assets/images/resultImg.png";
import axios from "axios";

function OxQuiz(props) {
  const [isFinished, setisFinished] = useState(false); // 초기 상태를 체크된 상태로 설정
  const [QuizData, setQuizData] = useState(null);
  const [QuizCount, setQuizCount] = useState(0); //퀴즈가 몇번 째 문제인지

  const handleQuizClick = () => {
    if (QuizCount < QuizData.length - 1) {
      setQuizCount(QuizCount + 1);
    } else {
      console.log("다풀었네요");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://13.124.42.111:8080/contents/1/quizzes"
        );
        setQuizData(response.data.result.content);
      } catch (error) {
        console.error("Quiz Data 오류입니다.", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(QuizData); // After state update, log the data
  }, [QuizData]);

  if (!QuizData) {
    return <div>Loading...</div>; // Render a loading div if data is not loaded yet
  }

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
          <CustomProgressBar
            progress={((QuizCount + 1) / QuizData.length) * 100}
            feat={"simple"}
          />
          <h2>OX퀴즈</h2>

          <Quiz>{QuizData[1].content}</Quiz>

          <AnswerContainer>
            <Answer
              onClick={handleQuizClick}
              highlighted={QuizData[QuizCount].correct ? true : false}>
              <StyledImage src={O} alt="O"></StyledImage>
            </Answer>
            <Answer
              onClick={handleQuizClick}
              highlighted={QuizData[QuizCount].correct ? false : true}>
              <StyledImage src={X} alt="X"></StyledImage>
            </Answer>
          </AnswerContainer>
          <QuizSolution>
            <p>정답 : {QuizData[QuizCount].correct ? "O" : "X"}</p>
            <br />
            <br />
            <br />
            {QuizData[QuizCount].commentary}
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
  border: ${({ theme }) => theme.borderLight};
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
    highlighted ? `1px solid ${theme.blue}` : theme.borderLight};
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.3s ease; /* optional for smooth transition */

  :hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* adjust as needed */
  }
`;

const StyledImage = styled.img`
  width: 150px;
  height: 150px;
`;

const QuizSolution = styled.div`
  width: 100%;
  height: 222px;
  border: ${({ theme }) => theme.borderLight};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 50px;
`;
