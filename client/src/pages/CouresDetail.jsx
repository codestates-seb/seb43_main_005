import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CustomSideBar from "../components/common/CustomSideBar.jsx";
import Header from "../components/Header/Header.jsx";
import ContentArticle from "../components/CourseDetail/ContentArticle.jsx";
import { getData } from "../api/apiUtil.js";
import { useParams } from "react-router-dom";
import Loading from "../components/common/Loading.jsx";
import OxQuiz from "../components/OxQuiz/OxQuiz.jsx";
import CustomButton from "../components/common/CustomButton.jsx";

export default function CouresDetail({ feat }) {
  const [lnb, setLnb] = useState(true);
  const { userInfo } = useSelector(state => state.user);
  const { id } = useParams();
  const [learnChecks, setLearnChecks] = useState(null);

  // ! Get LearnChecks
  const sliceLearnChecks = async () => {
    const { result } = await getData(`/contents/${id}/learns/learnChecks`);
    const { content } = result;
    setLearnChecks(content);
  };
  useEffect(() => {
    sliceLearnChecks();
  }, [id]);

  if (!learnChecks) return <Loading />;
  return (
    <Container>
      <Header course setLnb={setLnb} userInfo={userInfo} />
      <Body>
        {/* {lnb && <CustomSideBar />} */}
        {feat === "content" && (
          <ContentArticle courseId={id} learnChecks={learnChecks} />
        )}
        {feat === "quiz" && <OxQuiz />}

        {/* !! 퀴즈페이지 이동을 위한 임시 버튼 !! */}
        <CustomButton text="퀴즈로 이동" path={`/course/${id}/quiz`} />
        {/* !! 퀴즈페이지 이동을 위한 임시 버튼 !! */}
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
`;
