import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextContainer from "./TextContainer";

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
      <ProfileBtn onClick={() => navigate("/mypage/edit")}>
        프로필 수정
      </ProfileBtn>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  width: 580px;
  height: 300px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 500px) {
    width: 350px;
    height: 350px;
    margin: 0 auto;
    text-align: center;
  }
`;
const InnerBox = styled.div`
  display: flex;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
const ProfileImage = styled.div`
  width: 145px;
  height: 145px;
  background-image: url("https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80");
  background-size: 100%;
  border-radius: 5rem;
  margin: 30px;
  @media screen and (max-width: 500px) {
    width: 110px;
    height: 110px;
    margin: 20px auto 0;
  }
`;

const ProfileBtn = styled.button`
  align-self: flex-end;
  border: 1px solid ${props => props.theme.color.main};
  border-radius: 32px;
  color: ${props => props.theme.color.main};
  padding: 13px 19px;
  margin: 30px;
  @media screen and (max-width: 500px) {
    align-self: center;
  }
  &:hover {
    background-color: ${props => props.theme.color.main};
    color: ${props => props.theme.color.white};
    border: 1px solid ${props => props.theme.color.white};
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }
  &:active {
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
  }
`;
