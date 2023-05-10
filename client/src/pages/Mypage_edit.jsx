import styled from "styled-components";
import PageContainer from "../common/PageContainer.jsx";

export default function EditMypage() {
  return (
    <PageContainer>
      <MyContainer>
        <ImgBox></ImgBox>
        <InfoBox></InfoBox>
      </MyContainer>
    </PageContainer>
  );
}

const MyContainer = styled.article`
  background-color: aliceblue;
  width: 100%;
  display: flex;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
const ImgBox = styled.section`
  background-color: azure;
`;
const InfoBox = styled.section`
  background-color: rosybrown;
`;
