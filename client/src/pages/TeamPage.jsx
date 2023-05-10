import styled from "styled-components";
import PageContainer from "../common/PageContainer.jsx";

export default function EditMypage() {
  return (
    <PageContainer>
      <MyContainer>TeamPage</MyContainer>
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
