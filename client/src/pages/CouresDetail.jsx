import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import CustomSideBar from "../components/common/CustomSideBar.jsx";
import Header from "../components/Header/Header.jsx";
import ContentArticle from "../components/CourseDetail/ContentArticle.jsx";
import { updateData } from "../api/apiUtil.js";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/common/Loading.jsx";

import {
  fetchLearnCheck,
  fetchLearnItem,
  setClear,
  setLearnId,
  setLearnIndex,
} from "../redux/features/user/learnSlice.js";
import OxQuiz from "../components/OxQuiz/OxQuiz.jsx";

export default function CouresDetail({ feat }) {
  const [lnb, setLnb] = useState(true); // navi handler
  const { userInfo } = useSelector(state => state.user); // header User
  const { id, learn } = useParams();
  const { loading, learnId, learnChecks } = useSelector(state => state.learn); // learn data

  // ! Current Index
  const dispatch = useDispatch();
  const currentIndex = () => {
    dispatch(setClear()); // data clear
    dispatch(setLearnId(learn)); // set 0 -> LearnId
    const index = learnChecks?.findIndex(el => el.learnId === Number(learn));
    dispatch(setLearnIndex(index));
  };
  useEffect(() => {
    learnChecks && currentIndex();
  }, [id]);

  // ! Get LearnData
  const MAX_RETRY_COUNT = 3; // 최대 재시도 횟수
  const learnApi = useCallback(
    async (retryCount = 0) => {
      if (retryCount >= MAX_RETRY_COUNT) {
        console.log("API 요청에 실패했습니다. 재시도 횟수를 초과했습니다.");
        return;
      }
      if (learnId) {
        try {
          const response = await dispatch(
            fetchLearnItem({ learnId, courseId: id })
          ); // getLearnItem Data
          if (response.error) {
            // Handle error case
            console.log("API 요청에 실패했습니다. 재시도합니다.");
            learnApi(retryCount + 1); // 재시도
          }
        } catch (error) {
          // Handle error case
          console.log("API 요청 중 오류가 발생했습니다. 재시도합니다.");
          learnApi(retryCount + 1); // 재시도
        }
      } else {
        console.log("API 요청을 위한 learnId가 유효하지 않습니다.");
        dispatch(setLearnId(learn)); // set 0 -> LearnId
      }
    },
    [learnId, id, dispatch]
  );

  useEffect(() => {
    dispatch(fetchLearnCheck(id)); // get learnCheckes Data
    learnApi();
  }, [id, learnId]);

  // ! Side Menu Handler & Post LearnCheck
  const [quizzes, setQuizzes] = useState(null); // quiz
  const navigate = useNavigate();
  const handleClickCheck = async (learnId, learnCheckId, index) => {
    dispatch(setLearnIndex(index));
    dispatch(setLearnId(learnId));
    const updateUrl = `/contents/${id}/learns/${learnId}/learnChecks/${learnCheckId}`;
    await updateData({ completed: true }, updateUrl, "patch");
    const pathLearnUrl = `/course/${id}/learn/${learnId}`;
    navigate(pathLearnUrl);
  };

  if (loading) return <Loading />;
  // if (!learnChecks) return <Loading />;
  return (
    <Container>
      <Header course setLnb={setLnb} userInfo={userInfo} />
      <Body>
        {lnb && (
          <CustomSideBar
            quizzes={quizzes}
            setQuizzes={setQuizzes}
            courseId={id}
            learnChecks={learnChecks}
            onClickCheck={handleClickCheck}
          />
        )}
        <ContentWrap>
          {feat === "content" && (
            <ContentArticle
              courseId={id}
              learnChecks={learnChecks}
              quizzes={quizzes}
            />
          )}
          {feat === "quiz" && <OxQuiz />}
        </ContentWrap>
      </Body>
    </Container>
  );
}
const Container = styled.div`
  background-color: ${({ theme }) => theme.white};
  min-height: 100vh;
`;
const Body = styled.section`
  display: flex;
  padding-top: 60px;
  position: relative;
`;
const ContentWrap = styled.div`
  width: calc(100% - 250px);
  margin: 0 auto;
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    width: 100%;
  }
`;
