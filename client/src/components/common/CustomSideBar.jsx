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

export default function CustomSideBar({
  onClickCheck,
  courseId,
  learnChecks,
  quizzes,
  setQuizzes,
}) {
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
  const quizClick = () => navigate(`/course/${courseId}/quiz`);

  // ! Get Quiz
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
      <ProgressWrap>
        <Title>
          <IoIosArrowBack className="iconBack" />
          <h2 onClick={goBack} role="none">
            {title}
          </h2>
        </Title>
        <CustomProgressBar
          marginBottom="0"
          progress={progress}
          feat={"simple"}
        />
      </ProgressWrap>
      <InnerContainer>
        {learnChecks?.map((status, index) => (
          <CustomCheckBox
            key={status.learnCheckId}
            text={status.title}
            checked={status.completed}
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

const SideBarContainer = styled.div`
  height: 100%;
  width: 250px;
  position: sticky;
  top: 60px;
  background-color: ${({ theme }) => theme.white};
  border-right: 2px solid ${({ theme }) => theme.main};
  padding: 30px;
  box-sizing: border-box;
  overflow-y: auto;
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    position: fixed;
    width: 90%;
    top: 50px;
    z-index: 111;
  }
`;

const ProgressWrap = styled.div`
  margin-bottom: 30px;
`;
const Title = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  & .iconBack {
    color: ${({ theme }) => theme.text};
    font-size: 25px;
  }
  & h2 {
    line-height: 25px;
    font-size: 18px;
    word-break: break-all;
    flex: 1;
  }
`;
const InnerContainer = styled.div`
  padding: 20px 0;
  height: calc(100vh - 240px);
  overflow-y: scroll;
`;

const OxContainer = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const IconWrapper = styled.div`
  margin-right: 15px;
`;
