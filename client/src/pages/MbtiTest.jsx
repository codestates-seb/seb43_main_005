import React, { useState } from "react";
//페이지 이동
import { useNavigate } from "react-router-dom";

import PageContainer from "../components/common/PageContainer.jsx";
//컴포넌트
import CustomProgressBar from "../components/common/CustomProgressBar.jsx";
import styled from "styled-components";
//정적 데이터 불러오기
import { mbtiQuestionData } from "../assets/data/mbtiQuestionData.js";

function MbtiTest() {
  //문제의 총 길이
  const QUESTIONS_LENGTH = mbtiQuestionData.length;
  //현재 질문 번호
  const [questionNumber, setQuestionNumber] = useState(1);
  //mbti 도출을 위한 총합 객체
  const [totalScore, setTotalScore] = useState([
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 },
  ]);
  const navigate = useNavigate();

  const handleClickBtn = (score, type) => {
    const newScore = totalScore.map(indivScore =>
      indivScore.id === type
        ? { id: indivScore.id, score: indivScore.score + score }
        : indivScore
    );
    //객체값 확인
    setTotalScore(newScore);
    console.log(totalScore);

    if (QUESTIONS_LENGTH !== questionNumber + 1) {
      //다음 문항으로 넘어간다.
      setQuestionNumber(questionNumber + 1);
    } else {
      //결과 화면으로 넘기기
      navigate("/mbtiresult");
    }
  };

  return (
    <PageContainer>
      <Container>
        <h2>MBTI TEST</h2>
        <CustomProgressBar
          progress={(questionNumber / QUESTIONS_LENGTH) * 100}
        />
        <Quiz>{mbtiQuestionData[questionNumber - 1].quiz}</Quiz>
        <AnswerBtnContainer>
          <AnswerBtn
            onClick={() =>
              handleClickBtn(1, mbtiQuestionData[questionNumber - 1].type)
            }>
            {mbtiQuestionData[questionNumber - 1].answerA}
          </AnswerBtn>
          <AnswerBtn
            onClick={() =>
              handleClickBtn(0, mbtiQuestionData[questionNumber - 1].type)
            }>
            {mbtiQuestionData[questionNumber - 1].answerB}
          </AnswerBtn>
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
  @media ${props => props.theme.mediaQuery.mobile} {
    h2 {
      margin-bottom: 40px;
    }
  }
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
