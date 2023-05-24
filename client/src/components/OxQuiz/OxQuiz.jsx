import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomProgressBar from "../common/CustomProgressBar.jsx";
import O from "../../assets/images/O.png";
import X from "../../assets/images/X.png";
import resultImg from "../../assets/images/resultImg.png";
import axios from "axios";
import CustomButton from "../common/CustomButton.jsx";
import useModal from "../../hooks/useModal.js";
import Dialog from "../common/Dialog.jsx";

function OxQuiz(props) {
  const [isFinished, setisFinished] = useState(false); // 초기 상태를 체크된 상태로 설정
  const [QuizData, setQuizData] = useState(null);
  const [QuizCount, setQuizCount] = useState(0); //퀴즈가 몇번 째 문제인지
  const token = localStorage.getItem("access_token");
  // Admin button
  const { userRole } = useSelector(state => state.user);
  const admin = userRole === "ADMIN";
  const item = QuizData && QuizData[QuizCount];
  const QuizId = item?.quizId;
  const apiUrl = `/contents/${1}/quizzes/${QuizId}`; // 수정 및 삭제 api url
  const editPath = `/admin/edit/course/${1}/quiz/${QuizId}`; // 퀴즈 수정페이지 경로
  const [dialog, openDialog, closeDialog] = useModal();

  const { id } = useParams();
  // console.log(id);
  const handleQuizClick = () => {
    if (QuizCount < QuizData.length - 2) {
      setQuizCount(QuizCount + 1);
    } else {
      setisFinished(true);
      console.log("다풀었네요");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://13.124.42.111:8080/contents/${id}/quizzes`
        );
        setQuizData(response.data.result.content);
      } catch (error) {
        console.error("Quiz Data 오류입니다.", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(QuizData);
    console.log(token);
  }, [QuizData]);

  if (!QuizData) {
    return <div>Loading...</div>;
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

          <Quiz
            dangerouslySetInnerHTML={{ __html: QuizData[QuizCount]?.detail }}
          />

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
            <div
              dangerouslySetInnerHTML={{
                __html: QuizData[QuizCount].commentary,
              }}></div>
          </QuizSolution>
          {admin && (
            <AdminWrap>
              <CustomButton
                text="게시글 수정"
                feat="tag"
                mode="patch"
                path={editPath}
                item={item}
                reverse
              />
              <CustomButton
                text="게시글 삭제"
                feat="tag"
                onClick={openDialog}
              />
            </AdminWrap>
          )}
          {dialog && (
            <Dialog
              feat="삭제하기"
              path={apiUrl}
              text={["게시을 삭제하시겠습니까?"]}
              closeDialog={closeDialog}
            />
          )}
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

const AdminWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
`;
