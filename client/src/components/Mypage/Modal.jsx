import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import CustomButton from "../common/CustomButton.jsx";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal({ feat, path, text, payload, closeModal }) {
  const navigate = useNavigate();
  const clickBack = e => e.target.classList.contains("close") && closeModal();

  const handleDialog = () => {
    switch (feat) {
      case "수정":
        console.log("수정");
        break;
      case "테마변경":
        navigate("/");
        break;
      case "작성취소":
        navigate(-1);
        break;
    }
    closeModal();
  };

  return (
    <DialogBack onClick={clickBack} className="close">
      <DialogContainer>
        <DialogClose onClick={closeModal}>
          <AiOutlineClose />
        </DialogClose>
        <DialogText>
          {text ? <p>{text}</p> : <p>수정이 완료되었습니다.</p>}
        </DialogText>
        <DialogBtnGroup>
          {/* <CustomButton onClick={handleDialog} text={feat} reverse={true} /> */}
          <CustomButton onClick={closeModal} text="닫기" />
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
  background-color: ${props => props.theme.blackOp50};
`;
const show = keyframes`
  from{
    transform: scale(0);
  }
  to{
    transform: scale(1);
  }
`;
const DialogContainer = styled.div`
  width: 90%;
  max-width: 500px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: ${props => props.theme.white};
  animation: ${show} 0.2s 0s alternate linear 1;
`;
const DialogClose = styled.button`
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 0 0 auto;
  & * {
    font-size: 2em;
    color: ${props => props.theme.text};
  }
`;
const DialogText = styled.div`
  padding: 20px 0 40px 0;
  text-align: center;
  color: ${props => props.theme.text};
  p:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;
const DialogBtnGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;
