import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import CustomButton from "./CustomButton.jsx";

export default function Dialog({ feat, text, closeDialog }) {
  const clickBack = e => e.target.classList.contains("close") && closeDialog();
  const handleDialog = () => {
    /*
    feat === '로그아웃' && 로그아웃
    feat === '탈퇴하기' && 탈퇴
    feat === '삭제하기' && 게시글 삭제
  */
    closeDialog();
  };

  return (
    <DialogBack onClick={clickBack} className="close">
      <DialogContainer>
        <DialogClose onClick={closeDialog}>
          <AiOutlineClose />
        </DialogClose>
        <DialogText>
          {text && text.map((el, i) => <p key={i}>{el}</p>)}
        </DialogText>
        <DialogBtnGroup>
          <CustomButton onClick={handleDialog} text={feat} reverse={true} />
          <CustomButton onClick={closeDialog} text="취소" />
        </DialogBtnGroup>
      </DialogContainer>
    </DialogBack>
  );
}
const DialogBack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.color.blackOp50};
`;
const DialogContainer = styled.div`
  width: 90%;
  max-width: 500px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: ${props => props.theme.color.white};
`;
const DialogClose = styled.button`
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 0 0 auto;
  & * {
    font-size: 2em;
    color: ${props => props.theme.color.text};
  }
`;
const DialogText = styled.div`
  padding: 20px 0 40px 0;
  text-align: center;
  color: ${props => props.theme.color.text};
  p:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;
const DialogBtnGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;
