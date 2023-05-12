import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import Profile from "../components/Mypage/Profile.jsx";
import Level from "../components/Mypage/Level.jsx";

export default function Mypage() {
  return (
    <PageContainer>
      <MyContainer>
        <Profile />
        <Level />
      </MyContainer>
    </PageContainer>
  );
}

const MyContainer = styled.main`
  background-color: aliceblue;
  width: 100%;
  display: flex;
  @media ${props => props.theme.mediaQuery.mobile} {
    flex-direction: column;
  }
`;
