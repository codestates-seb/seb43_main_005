import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "../components/common/CustomButton.jsx";
import PageContainer from "../components/common/PageContainer.jsx";
import { getData, updateData, deleteData } from "../api/apiUtil.js";
import CustomInput from "../components/common/CustomInput.jsx";
import Dialog from "../components/common/Dialog.jsx";
import useModal from "../hooks/useModal.js";
import useInput from "../hooks/useInput.js";

export default function EditMypage() {
  const [profileImage, setProfileImage] = useInput("default");
  const [nickName, setNickName] = useInput("default");
  const [email, setEmail] = useInput("default@gmail.com");
  const [currentPassword, setCurrentPassword] = useInput("");
  const [newPassword, setPassword] = useInput("");
  const [checkNewPassword, setPasswordConfirm] = useInput("");
  const [edited, setEdited] = useState(false);
  const navigate = useNavigate();

  // 수정 페이지 최초 진입 시 유저 정보(userInfo) 받아와서 상태에 저장하기
  function getUserInfo() {
    getData("/members/info").then(res => {
      console.log(res.result);
      setProfileImage(res.result.profileImage);
      setNickName(res.result.nickName);
      setEmail(res.result.email);
      setCurrentPassword(res.result.password);
    });
  }
  useEffect(() => {
    getUserInfo();
  }, [edited]); // 최초 렌더링 + 수정 완료 시 불러오기

  // 입력 값 받아오기
  const onChange = e => {
    const {
      target: { name, value },
    } = e;
    if (name === "nickName") {
      setNickName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "newPassword") {
      setPassword(value);
    } else if (name === "checkNewPassword") {
      setPasswordConfirm(value);
    }
  };

  // * 수정 버튼 클릭 시 유저 데이터 수정

  // 프로필 이미지 수정

  // 닉네임 수정
  const submitNickname = e => {
    e.preventDefault();
    updateData(nickName, "/members/change-nickname", "patch").then(res =>
      console.log(res)
    );
  };
  // 비밀번호 수정
  const passwordPayload = {
    currentPassword,
    newPassword,
    checkNewPassword,
  };
  const submitPW = e => {
    e.preventDefault();
    updateData(passwordPayload, "/members/change-password", "patch").then(res =>
      console.log(res)
    );
  };

  const [modal, openModal, closeModal] = useModal(false);
  // 회원 탈퇴
  const handleSignOffBtnClick = e => {
    e => e.preventDefault();
    openModal(true);
  };
  const signOff = () => {
    deleteData("/members/withdrawal");
    console.log("탈퇴 완료");
    () => navigate("/");
  };

  return (
    <PageContainer>
      <MyContainer>
        <InfoBox className="ImgContainer">
          <form>
            <CustomInput
              name="profileImage"
              text="프로필 사진"
              type="img"
              feat="mypage"
              value={profileImage}
              onChange={onChange}
            />
            <CustomButton
              text="이미지 수정"
              reverse="true"
              // onClick={submitImg}
            />
          </form>
        </InfoBox>
        <InfoBox className="InfoBox">
          <form>
            <InputBox className="InputBox">
              <CustomInput
                name="nickName"
                text="닉네임"
                type="text"
                feat="mypage"
                bind
                // value={nickName}
                // onChange={onChange}
              />
              <CustomInput
                name="email"
                text="이메일"
                type="email"
                feat="mypage"
                disabled="true"
                bind
                // value={email}
                // onChange={onChange}
              />
            </InputBox>
            <CustomButton
              text="닉네임 수정"
              reverse="true"
              onClick={submitNickname}
            />
          </form>
          <form>
            <InputBox>
              <CustomInput
                name="currentPassword"
                text="현재 비밀번호"
                type="password"
                feat="mypage"
                bind
                // value={currentPassword}
                // onChange={onChange}
              />
              <CustomInput
                name="newPassword"
                text="변경할 비밀번호"
                type="password"
                feat="mypage"
                bind
                // value={newPassword}
                // onChange={onChange}
              />
              <CustomInput
                name="checkNewPassword"
                text="비밀번호 확인"
                type="password"
                feat="mypage"
                bind
                // value={checkNewPassword}
                // onChange={onChange}
              />
            </InputBox>
            <CustomButton
              text="비밀번호 수정"
              reverse="true"
              onClick={submitPW}
            />
          </form>
        </InfoBox>
        <BtnBox className="delete">
          <CustomButton
            text="회원탈퇴"
            feat="underline"
            onClick={e => handleSignOffBtnClick(e)}
          />
          {modal && (
            <Dialog
              feat="탈퇴하기"
              text={["정말로 탈퇴하시겠습니까?"]}
              closeDialog={closeModal}
            />
          )}
        </BtnBox>
        <CancelBtnBox>
          <CustomButton text="취소" onClick={() => navigate("/")} />
        </CancelBtnBox>
      </MyContainer>
    </PageContainer>
  );
}

const MyContainer = styled.article`
  background-color: ${props => props.theme.color.white};
  padding: 50px;
  @media ${props => props.theme.mediaQuery.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const InfoBox = styled.div`
  & > form {
    display: grid;
    grid-template-columns: 2fr 1fr;
    @media ${props => props.theme.mediaQuery.mobile} {
      display: flex;
      flex-direction: column;
      padding-bottom: 30px;
      & > button {
        align-self: center;
      }
    }
  }
  & > form > div {
    display: grid;
    grid-template-rows: repeat(auto 1fr);
    grid-row-gap: 30px;
  }
`;
const InputBox = styled.div`
  display: flex;
  padding-bottom: 30px;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const CancelBtnBox = styled(BtnBox)`
  justify-content: center;
`;
