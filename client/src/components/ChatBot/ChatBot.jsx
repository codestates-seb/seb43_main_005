import React from "react";
import styled from "styled-components";
import useModal from "../../hooks/useModal.js";
//이미지를 불러옵니다.
import chatbot from "../../assets/images/chatbot.png";

function ChatBot(props) {
  return (
    <>
      <ModalBtn>
        <img src={chatbot} alt="chatbotImg" />
      </ModalBtn>
      <ModalPage>
        <ModalHeader></ModalHeader>
      </ModalPage>
    </>
  );
}

// 모달이 열렸을 때 보이는 페이지
const ModalPage = styled.button`
  width: 400px;
  height: 400px;
  background-color: ${props => props.theme.white};
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 50px;
  bottom: 150px;
`;

const ModalHeader = styled.div`
  width: 100%;
  border: 1px solid red;
`;

// 모달 오픈 버튼
const ModalBtn = styled.button`
  cursor: pointer;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${props => props.theme.white};
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 50px;
  bottom: 150px;

  &:hover {
    transform: scale(1.1);
  }
  > img {
    width: 70px;
  }
`;

export default ChatBot;
