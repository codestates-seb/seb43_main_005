import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "../common/CustomButton.jsx";
import ProfileImage from "../common/ProfileImage.jsx";
import TextContainer from "./TextContainer.js";

export default function Mypage({ userInfo }) {
  // 1. 유저의 닉네임, 이메일을 서버에서 받아와서 프로필에 보여줌(현재 임시 기본 값으로 설정해놓음)
  let [username, email] = [userInfo.nickName, userInfo.email];

  // 2. 프로필 수정 버튼을 누르면 회원정보 수정 페이지로 이동하기
  let navigate = useNavigate();

  return (
    <ProfileContainer className="ProfileContainer">
      <InnerBox className="InnerBox">
        <ProfileImage profileImg={userInfo.profileImage} feat="mypage" />
        {/* <ProfileImage feat="mypage" /> */}
        <TextContainer margin="0 10px 0 0" fontSize="0.8rem" pFontSize="1rem">
          <div>Nickname</div>
          <StyledSpan>
            <span>{username}</span>
            <span>님</span>
          </StyledSpan>
          <div>Email</div>
          <p>{email}</p>
        </TextContainer>
      </InnerBox>
      <BtnBox>
        <CustomButton
          feat="round"
          text="프로필 수정"
          onClick={() => navigate("/mypage/edit")}
        />
      </BtnBox>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.article`
  width: 100%;
  min-width: 400px;
  min-height: 300px;
  background-color: ${props => props.theme.color.white};
  border: ${props => props.theme.color.borderBold};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-right: 96px;
  & > button {
    align-self: flex-end;
    margin: 30px;
  }
  @media ${props => props.theme.mediaQuery.tablet} {
    margin-right: 30px;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    align-items: center;
    min-width: 350px;
    width: 100%;
    min-height: 350px;
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
  width: 100%;
  & > button {
    align-self: center;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    flex-direction: column;
    margin: 10px 0 20px;
  }
`;
const StyledSpan = styled.span`
  margin-top: 16px;
  font-size: 1rem;
  & > :first-child {
    font-size: 1.2rem;
    margin-right: 1rem;
  }
`;
const BtnBox = styled.div`
  padding-right: 16px;
  align-self: flex-end;
  @media ${props => props.theme.mediaQuery.mobile} {
    align-self: center;
    padding-right: 0;
  }
`;
