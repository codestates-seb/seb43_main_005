import React, { useState } from "react";
import styled from "styled-components";
import CustomSideBar from "../components/common/CustomSideBar.jsx";
import Header from "../components/Header/Header.jsx";
import ContentArticle from "../components/ContentArticle.jsx";

function CouresDetail(props) {
  const [lnb, setLnb] = useState(false);
  return (
    <Container>
      <Header course setLnb={setLnb} />
      <Body>
        {lnb && <CustomSideBar>사이드바 컴포넌트</CustomSideBar>}
        <ContentArticle>학습내용 컴포넌트</ContentArticle>
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

export default CouresDetail;
