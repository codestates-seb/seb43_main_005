import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "../../common/CustomButton.jsx";
import ProfileImage from "./ProfileImage.js";
import TextContainer from "./TextContainer.js";

export default function Mypage() {
  // 1. 유저의 닉네임, 이메일을 서버에서 받아와서 프로필에 보여줌(현재 임시 기본 값으로 설정해놓음)
  let [username, email] = ["firesuit", "firesuit005@gmail.com"];

  // 2. 프로필 수정 버튼을 누르면 회원정보 수정 페이지로 이동하기
  let navigate = useNavigate();

  return (
    <ProfileContainer>
      <InnerBox>
        <ProfileImage />
        <TextContainer>
          <div>Nickname</div>
          <p>{username} 님</p>
          <div>Email</div>
          <p>{email}</p>
        </TextContainer>
      </InnerBox>
      <CustomButton
        rounded="true"
        text="프로필 수정"
        onClick={() => navigate("/mypage/edit")}
      />
    </ProfileContainer>
  );
}

const ProfileContainer = styled.article`
  max-width: 580px;
  height: 300px;
  background-color: ${props => props.theme.color.white};
  border: ${props => props.theme.color.borderBold};
  display: flex;
  flex-direction: column;
  margin-right: 96px;
  & > button {
    align-self: flex-end;
    margin: 30px;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    min-width: 350px;
    width: 100%;
    height: 350px;
    margin: 0 auto;
    text-align: center;
    & > button {
      align-self: center;
      margin: 0;
    }
  }
`;
const InnerBox = styled.div`
  display: flex;
  margin-right: 52px;
  @media ${props => props.theme.mediaQuery.mobile} {
    flex-direction: column;
    margin: 10px 0 20px;
  }
`;
