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
  // => 기본이미지로 변경되어도 프리뷰에 보이게 하려면?
  const { state } = useLocation();
  const item = state?.item;
  const [userProfile, payload] = useUploadImg(item?.profileImage);

  const [nickName] = useInput(item.nickName);
  const [email] = useInput(item.email);
  const [currentPassword] = useInput("");
  const [newPassword] = useInput("");
  const [checkNewPassword] = useInput("");
  const [successAlert, setSuccessAlert] = useState("");
  const navigate = useNavigate();

  // 회원탈퇴 확인 모달
  const [modal, openModal, closeModal] = useModal(false);
  // 비밀번호 유효성 검사
  const [failAlert, setFailAlert] = useState("");

  // * 수정 버튼 클릭 시 유저 데이터 수정

  // 프로필 이미지 수정
  // 이미지 수정을 눌렀을 때 payload 를 보내기
  const submitImg = e => {
    e.preventDefault();
    if (!payload) {
      setFailAlert("이미지를 추가해 주세요.");
    } else {
      getImagesUrl(payload).then(res =>
        updateData(res.result, "/members/profile-image", "patch")
          .then(res => {
            // console.log(res);
            setSuccessAlert("프로필 이미지 수정이 완료되었습니다.");
          })
          .catch(err => console.log(err))
      );
    }
  };

  // 닉네임 수정
  const submitNickname = e => {
    e.preventDefault();
    // console.log(nickName);
    updateData(nickName.value, "/members/change-nickname", "patch").then(
      res => {
        // console.log(res);
        setSuccessAlert("닉네임 수정이 완료되었습니다.");
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
    // console.log(`passwordPayload ${passwordPayload}`);
    // 세 값이 다 들어가 있지 않으면 값을 입력해주세요 뜨기
    if (
      !(currentPassword.value && newPassword.value && checkNewPassword.value)
    ) {
      setFailAlert("값을 입력해주세요.");
      // console.log("값 다 안 들어감");
    } else {
      // console.log("값 다 들어감");
      // 변경할 비밀번호 일치 여부 확인하기
      setFailAlert(pwAlertCondition(newPassword.value, checkNewPassword.value));
      // console.log(`failAlert : ${failAlert}`);

      if (failAlert === "") {
        // console.log("비밀번호 수정 요청 전송");
        setSuccessAlert("");
        await updateData(passwordPayload, "/members/change-password", "patch")
          .then(res => {
            // console.log(res);
            setSuccessAlert("비밀번호가 성공적으로 변경되었습니다.");
          })
          .catch(error => {
            // console.log(error.response.data.status);
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
            {successAlert && <SuccessMsg>{successAlert}</SuccessMsg>}
            {failAlert && <AlertMsg>{failAlert}</AlertMsg>}
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
