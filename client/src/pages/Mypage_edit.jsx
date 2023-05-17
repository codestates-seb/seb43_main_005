import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "../components/common/CustomButton.jsx";
import PageContainer from "../components/common/PageContainer.jsx";
import { updateData, deleteData, getImagesUrl } from "../api/apiUtil.js";
import CustomInput from "../components/common/CustomInput.jsx";
import Dialog from "../components/common/Dialog.jsx";
import useModal from "../hooks/useModal.js";
import useInput from "../hooks/useInput.js";
import useUploadImg from "../hooks/useUploadImg.js";

export default function EditMypage() {
  // 수정 페이지 최초 진입 시 유저 정보(userInfo) 받아와서 상태에 저장하기 => item 으로 받아오기
  const { state } = useLocation();
  const item = state?.item;
  const [userProfile, payload] = useUploadImg(item?.profileImage);

  // 프로필 이미지 수정
  // 이미지 수정을 눌렀을 때 payload 를 보내기
  const submitImg = e => {
    e.preventDefault();
    getImagesUrl(payload).then(res =>
      updateData(res.result, "/members/profile-image", "patch").then(res =>
        console.log(res)
      )
    );
    // 이미지 선택 안하고 이미지 수정 버튼 클릭시 500 에러 => 에러 처리 추가하기!
  };

  const [nickName] = useInput(item.nickName);
  const [email] = useInput(item.email);
  const [currentPassword] = useInput("");
  const [newPassword] = useInput("");
  const [checkNewPassword] = useInput("");
  const [edited, setEdited] = useState(false);
  const navigate = useNavigate();
  // 회원탈퇴 확인 모달
  const [modal, openModal, closeModal] = useModal(false);

  // * 수정 버튼 클릭 시 유저 데이터 수정

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

  // 회원 탈퇴
  const handleSignOffBtnClick = e => {
    e => e.preventDefault();
    openModal(true);
  };

  return (
    <PageContainer>
      <MyContainer>
        <InfoBox className="ImgContainer">
          <form>
            <CustomInput
              text="프로필 사진"
              type="img"
              feat="mypage"
              value={userProfile}
            />
            <CustomButton
              text="이미지 수정"
              reverse="true"
              onClick={submitImg}
            />
          </form>
        </InfoBox>
        <InfoBox className="InfoBox">
          <form>
            <InputBox className="InputBox">
              <CustomInput
                text="닉네임"
                type="text"
                feat="mypage"
                value={nickName}
              />
              <CustomInput
                text="이메일"
                type="email"
                feat="mypage"
                disabled
                value={email}
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
                text="현재 비밀번호"
                type="password"
                feat="mypage"
                value={currentPassword}
              />
              <CustomInput
                text="변경할 비밀번호"
                type="password"
                feat="mypage"
                value={newPassword}
              />
              <CustomInput
                text="비밀번호 확인"
                type="password"
                feat="mypage"
                value={checkNewPassword}
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
