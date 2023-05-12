import styled from "styled-components";
import PageContainer from "../common/PageContainer.jsx";
import Profile from "../components/Mypage/Profile.jsx";
import Level from "../components/Mypage/Level.jsx";
import CustomButton from "../common/CustomButton.jsx";

export default function Mypage() {
  return (
    <PageContainer>
      <MyContainer>
        <Profile />
        <Level />
      </MyContainer>
      <BtnContainer>
        <CustomButton text="대시보드" />
        <CustomButton text="내가 쓴 토론 글" />
        <CustomButton text="설정" />
      </BtnContainer>
    </PageContainer>
  );
}

const MyContainer = styled.main`
  width: 100%;
  display: flex;
  @media ${props => props.theme.mediaQuery.mobile} {
    flex-direction: column;
  }
`;
const BtnContainer = styled.article`
  background-color: aliceblue;
`;
