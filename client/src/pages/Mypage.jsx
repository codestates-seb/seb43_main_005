import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import Profile from "../components/Mypage/Profile.jsx";
import Level from "../components/Mypage/Level.jsx";
import BtnTabContainer from "../components/Mypage/BtnTabContainer.jsx";

export default function Mypage() {
  return (
    <PageContainer>
      <MyContainer>
        <Profile />
        <Level />
      </MyContainer>
      <BtnTabContainer />
    </PageContainer>
  );
}

const MyContainer = styled.main`
  width: 100%;
  display: flex;
  margin-bottom: 110px;
  @media ${props => props.theme.mediaQuery.mobile} {
    flex-direction: column;
    margin-bottom: 50px;
  }
`;
