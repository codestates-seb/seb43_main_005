import { useEffect, useState } from "react";
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
import Modal from "../components/Mypage/Modal.jsx";

export default function EditMypage() {
  // 수정 페이지 최초 진입 시 유저 정보(userInfo) 받아와서 상태에 저장하기 => item 으로 받아오기
  const { state } = useLocation();
  const item = state?.item;
  const [userProfile, payload] = useUploadImg(item?.profileImage);
  // 수정 완료 알림 모달
  const [modifiedModal, openModifiedModal, closeModifiedModal] =
    useModal(false);
  // 회원탈퇴 확인 모달
  const [withdrawModal, openWithdrawModal, closeWithdrawModal] =
    useModal(false);

  const [nickName] = useInput(item.nickName);
  const [email] = useInput(item.email);
  const [currentPassword] = useInput("");
  const [newPassword] = useInput("");
  const [checkNewPassword] = useInput("");
  const [failAlert, setFailAlert] = useState("");
  const navigate = useNavigate();

  // === 수정 버튼 클릭 시 유저 데이터 수정 ===

  // 프로필 이미지 수정
  const submitImg = e => {
    e.preventDefault();
    if (!payload) {
      setFailAlert("이미지를 추가해 주세요.");
    } else {
      getImagesUrl(payload).then(res =>
        updateData(res.result, "/members/profile-image", "patch")
          .then(res => {
            setFailAlert("");
            openModifiedModal(true);
          })
          .catch(err => console.log(err))
      );
    }
  };

  // 닉네임 수정
  const submitNickname = e => {
    e.preventDefault();
    updateData(nickName.value, "/members/change-nickname", "patch").then(
      res => {
        setFailAlert("");
        openModifiedModal(true);
      }
    );
  };

  // 비밀번호 수정
  const passwordPayload = {
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
    checkNewPassword: checkNewPassword.value,
  };
  const submitPW = async e => {
    e.preventDefault();
    if (
      !(currentPassword.value && newPassword.value && checkNewPassword.value)
    ) {
      setFailAlert("값을 입력해주세요.");
    } else {
      setFailAlert(pwAlertCondition(newPassword.value, checkNewPassword.value));
      if (failAlert === "") {
        await updateData(passwordPayload, "/members/change-password", "patch")
          .then(res => {
            setFailAlert("");
            openModifiedModal(true);
          })
          .catch(error => {
            setFailAlert("현재 비밀번호를 재확인 해주세요.");
          });
      }
    }
  };

  // 비밀번호 조건
  const isPasswordValid = pw => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9]).{4,12}$/;
    return passwordRegex.test(pw);
  };

  // 새 비밀번호 유효성검사 => 에러별 경고문구
  const pwAlertCondition = (newPassword, checkNewPassword) => {
    if (newPassword && isPasswordValid(newPassword) === false) {
      return "비밀번호는 4~12자, 숫자와 소문자 영어를 포함해야합니다.";
    } else if (newPassword !== checkNewPassword) {
      return "비밀번호가 일치하지 않습니다.";
    } else {
      return "";
    }
  };

  // 회원 탈퇴
  const handleSignOffBtnClick = e => {
    e => e.preventDefault();
    openWithdrawModal(true);
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
            {/* {successAlert && <SuccessMsg>{successAlert}</SuccessMsg>} */}
            {failAlert && <AlertMsg>{failAlert}</AlertMsg>}
          </form>
        </InfoBox>
        {modifiedModal && <Modal feat="수정" closeModal={closeModifiedModal} />}
        <BtnBox className="delete">
          <CustomButton
            text="회원탈퇴"
            feat="underline"
            onClick={e => handleSignOffBtnClick(e)}
          />
          {withdrawModal && (
            <Dialog
              feat="탈퇴하기"
              text={["정말로 탈퇴하시겠습니까?"]}
              closeDialog={closeWithdrawModal}
            />
          )}
        </BtnBox>
        <CancelBtnBox>
          <CustomButton text="완료" onClick={() => navigate("/")} />
        </CancelBtnBox>
      </MyContainer>
    </PageContainer>
  );
}

const MyContainer = styled.article`
  background-color: ${props => props.theme.white};
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
const AlertMsg = styled.p`
  color: ${props => props.theme.red};
`;
const SuccessMsg = styled(AlertMsg)`
  color: ${props => props.theme.main};
`;
