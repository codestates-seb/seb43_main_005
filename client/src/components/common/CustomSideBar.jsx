import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CustomProgressBar from "./CustomProgressBar.jsx";
import { IoIosArrowBack } from "react-icons/io";
import CustomCheckBox from "./CustomCheckBox.jsx";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getData } from "../../api/apiUtil.js";
import { useDispatch } from "react-redux";
import { setLearnId } from "../../redux/features/user/learnSlice.js";
import { FaBook } from "react-icons/fa";

export default function CustomSideBar({ onClickCheck, courseId, learnChecks }) {
  const [progress, setProgress] = useState();
  const [title, setTitle] = useState();

  // ! Get Progress
  const getProgress = async () => {
    const { result } = await getData(`/contents/${courseId}/progress`);
    const { progress, content } = result;
    setProgress(progress);
    setTitle(content?.title);
  };

  // ! quizClick
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [quizCheck, setQuizCheck] = useState(false);
  const quizClick = () => {
    setQuizCheck(true);
    navigate(`/course/${courseId}/quiz`);
    // window.location.reload();
  };

  // ! Get Quiz
  const [quizzes, setQuizzes] = useState(null);
  const getQuiz = async () => {
    const { result } = await getData(`/contents/${courseId}/quizzes`);
    const { content } = result;
    setQuizzes(...content);
  };
  useEffect(() => {
    getProgress();
    getQuiz();
  }, []);

  // ! Get learn data
  const dispatch = useDispatch();
  const handleClickCheck = async (learnId, learnCheckId, index) => {
    dispatch(setLearnId(learnId));
    onClickCheck(learnId, learnCheckId, index);
  };

  // ! 뒤로가기
  const goBack = () => {
    if (location.state?.from) {
      navigate(location.state.from, { replace: true });
    } else {
      navigate("/course");
    }
  };

  return (
    <SideBarContainer>
      <InnerContainer>
        <h2 onClick={goBack} role="none">
          <IoIosArrowBack /> {title}
        </h2>
        <CustomProgressBar progress={progress} feat={"simple"} />
        {learnChecks?.map((status, index) => (
          <CustomCheckBox
            key={status.learnCheckId}
            text={status.title}
            checked={status.completed}
            // onCheck={() => handleCheckChange(status.learnId)}
            onClick={() =>
              handleClickCheck(status.learnId, status.learnCheckId, index)
            }
          />
        ))}
        {quizzes && (
          <OxContainer onClick={quizClick}>
            <IconWrapper>
              <FaBook />
            </IconWrapper>
            OX 퀴즈
          </OxContainer>
        )}
      </InnerContainer>
    </SideBarContainer>
  );
}

const IconWrapper = styled.div`
  margin-right: 15px;
`;

const SideBarContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  height: calc(100vh - 60px);
  width: 250px;

  box-sizing: border-box;
`;

const InnerContainer = styled.div`
  padding: 30px;
  height: calc(100% - 60px); // 100px을 빼줌으로써 상하에 각각 50px의 공백 생성
  border-right: 2px solid ${props => props.theme.main};
  overflow-y: scroll;
  > h2 {
    display: flex;
    align-items: center; // 아이템들을 세로축 중앙으로 정렬합니다.
    margin-bottom: 20px;
    cursor: pointer;
    line-height: 17px;
  }
`;

const OxContainer = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #f0f0f0;
  }
`;
