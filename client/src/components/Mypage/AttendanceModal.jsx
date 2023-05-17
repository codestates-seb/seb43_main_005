import { useState } from "react";
import styled from "styled-components";
import CustomButton from "../common/CustomButton.jsx";
import useModal from "../../hooks/useModal.js";
import { getData, attendance } from "../../api/apiUtil.js";

export default function AttendanceModal({ attended }) {
  const [attendModal, openModal, closeModal] = useModal(false);
  const [attend, openAttend, closeAttend] = useModal(false);
  const handleAttend = () => {
    getUsername();
    openModal(true);
  };
  const closeModalF = () => {
    closeModal(false);
  };

  // 유저 이름받아오기
  const [userName, setUserName] = useState("guest");
  function getUsername() {
    getData("/members/info").then(res => {
      console.log(res.result.nickName);
      setUserName(res.result.nickName);
    });
  }

  // 출석하기 버튼
  function attendCheck() {
    attendance("/members/check-in", "post")
      .then(res => {
        console.log(res);
        // 출석체크 모달 닫기
        closeModal(false);
        // 출석 완료 및 경험치 얻음 모달 띄우기
        openAttend(true);
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      <div>
        <ModalBtn
          className="ModalBtn"
          onClick={handleAttend}
          attended={attended}>
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M2.06252 33H30.9379V28.875H2.06252V33ZM26.8128 16.4998H22.5228C21.4747 16.4998 20.6252 15.6503 20.6252 14.6023V13.9926C20.6252 12.2285 21.1976 10.5501 22.0084 8.9832C22.5956 7.84817 22.8399 6.50882 22.5917 5.0889C22.1554 2.58938 20.1122 0.532013 17.612 0.0969494C13.7042 -0.583039 10.3126 2.40569 10.3126 6.18719C10.3126 7.09986 10.5137 7.96225 10.8727 8.73828C11.7319 10.5978 12.3751 12.5488 12.3751 14.5978V14.6023C12.3751 15.6503 11.5256 16.4998 10.4776 16.4998H6.18757C2.77023 16.4998 0 19.27 0 22.6874V24.7499C0 25.8888 0.923624 26.8124 2.06252 26.8124H30.9379C32.0768 26.8124 33.0004 25.8888 33.0004 24.7499V22.6874C33.0004 19.27 30.2301 16.4998 26.8128 16.4998Z" />
          </svg>
        </ModalBtn>
      </div>
      {attendModal && (
        <ModalContainer className="ModalContainer" onClick={closeModalF}>
          <ModalView className="ModalView" onClick={e => e.stopPropagation()}>
            <div onClick={closeModalF} className="close-btn" role="none">
              &times;
            </div>
            <div className="desc">
              <p>어서오세요, {userName}님!</p>
              <p>출석 체크 하고 경험치(10xp) 받아가는 것을 잊지 마세요!</p>
              <AttendanceImgBox>
                <svg
                  width="82"
                  height="82"
                  viewBox="0 0 82 82"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.12506 82H76.8759V71.7499H5.12506V82ZM66.6258 40.9995H55.9656C53.3615 40.9995 51.2506 38.8886 51.2506 36.2845V34.7694C51.2506 30.3859 52.6728 26.2153 54.6876 22.3219C56.1466 19.5015 56.7536 16.1734 56.137 12.6451C55.0527 6.43422 49.9757 1.32197 43.7632 0.240905C34.0528 -1.44876 25.6253 5.97777 25.6253 15.3742C25.6253 17.6421 26.125 19.785 27.0171 21.7133C29.152 26.3339 30.7503 31.1818 30.7503 36.2733V36.2845C30.7503 38.8886 28.6395 40.9995 26.0353 40.9995H15.3752C6.88359 40.9995 0 47.8831 0 56.3747V61.4998C0 64.3298 2.29507 66.6248 5.12506 66.6248H76.8759C79.7059 66.6248 82.0009 64.3298 82.0009 61.4998V56.3747C82.0009 47.8831 75.1173 40.9995 66.6258 40.9995Z"
                    fill="#39896B"
                  />
                </svg>
              </AttendanceImgBox>
            </div>
            <CustomButton
              reverse="true"
              text="출석하기"
              onClick={() => attendCheck()}
            />
          </ModalView>
        </ModalContainer>
      )}
      {attend && (
        <ModalContainer className="ModalContainer" onClick={closeModalF}>
          <ModalView className="ModalView" onClick={e => e.stopPropagation()}>
            <div onClick={closeModalF} className="close-btn" role="none">
              &times;
            </div>
            <div className="desc">
              <p>출석 체크 완료!</p>
              <p>경험치(10xp) 가 적립되었습니다.</p>
              <AttendanceImgBox>
                <svg
                  width="82"
                  height="82"
                  viewBox="0 0 82 82"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.12506 82H76.8759V71.7499H5.12506V82ZM66.6258 40.9995H55.9656C53.3615 40.9995 51.2506 38.8886 51.2506 36.2845V34.7694C51.2506 30.3859 52.6728 26.2153 54.6876 22.3219C56.1466 19.5015 56.7536 16.1734 56.137 12.6451C55.0527 6.43422 49.9757 1.32197 43.7632 0.240905C34.0528 -1.44876 25.6253 5.97777 25.6253 15.3742C25.6253 17.6421 26.125 19.785 27.0171 21.7133C29.152 26.3339 30.7503 31.1818 30.7503 36.2733V36.2845C30.7503 38.8886 28.6395 40.9995 26.0353 40.9995H15.3752C6.88359 40.9995 0 47.8831 0 56.3747V61.4998C0 64.3298 2.29507 66.6248 5.12506 66.6248H76.8759C79.7059 66.6248 82.0009 64.3298 82.0009 61.4998V56.3747C82.0009 47.8831 75.1173 40.9995 66.6258 40.9995Z"
                    fill="#39896B"
                  />
                </svg>
              </AttendanceImgBox>
            </div>
          </ModalView>
        </ModalContainer>
      )}
    </>
  );
}

// 모달 오픈 버튼
const ModalBtn = styled.button`
  cursor: pointer;
  width: 70px;
  height: 70px;
  border: 8px solid
    ${props => (props.attended ? props.theme.color.bg : props.theme.color.main)};
  border-radius: 50%;
  background-color: ${props =>
    props.attended ? props.theme.color.main : props.theme.color.bg};
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 50px;
  bottom: 50px;
  &:hover {
    transform: scale(1.1);
  }
  & > svg > path {
    fill: ${props =>
      props.attended ? props.theme.color.bg : props.theme.color.main};
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.blackOp50};
  z-index: 9999;
`;

const ModalView = styled.div.attrs(props => ({
  role: "dialog",
}))`
  border-radius: 10px;
  background-color: #ffffff;
  width: 750px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media ${props => props.theme.mediaQuery.mobile} {
    min-width: 350px;
    width: 90%;
  }

  > div.close-btn {
    align-self: flex-end;
    font-size: 4rem;
    cursor: pointer;
    padding: 5px 12px 0;
  }

  > div.desc {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  > div.desc > p {
    font-size: 1.5rem;
    margin-bottom: 20px;
    @media ${props => props.theme.mediaQuery.mobile} {
      font-size: 1.2rem;
      margin-bottom: 15px;
    }
  }
  > button {
    margin-bottom: 40px;
    font-size: 1.5rem;
    @media ${props => props.theme.mediaQuery.mobile} {
      font-size: 1.2rem;
    }
  }
`;
// 출석 도장 이미지 박스
const AttendanceImgBox = styled.div`
  width: 140px;
  height: 140px;
  border: 16px solid ${props => props.theme.color.main};
  border-radius: 50%;
  background-color: ${props => props.theme.color.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));
`;
