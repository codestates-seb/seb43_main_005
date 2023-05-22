import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import useModal from "../../hooks/useModal.js";
//이미지를 불러옵니다.
import chatbot from "../../assets/images/chatbot.png";

function ChatBot(props) {
  const [resultData, setResultData] = useState("");
  const [inputData, setInput] = useState("");

  const handleChange = e => {
    setInput(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault(); // prevent the default form submit action
    try {
      await axios
        .post("http://13.124.42.111:8080/chat", {
          message: inputData,
        })
        .then(res => {
          const response = res.data.result.choices[0].message.content;
          // console.log(response.data);
          setResultData(response);
          console.log(response);
          // console.log(response.result.choices.message);
        });
      // handle success
      setInput(""); // clear the input field
    } catch (error) {
      // handle error
    }
  };
  return (
    <>
      <ModalBtn>
        <img src={chatbot} alt="chatbotImg" />
      </ModalBtn>
      <ModalPage>
        <ModalHeader>Code Travler 챗봇</ModalHeader>
        <ModalContent>{resultData}</ModalContent>
        <Form onSubmit={handleSubmit}>
          <ModalInput value={inputData} onChange={handleChange}></ModalInput>
        </Form>
      </ModalPage>
    </>
  );
}

// 모달이 열렸을 때 보이는 페이지
const ModalPage = styled.button`
  border: 1px solid black;
  width: 400px;
  height: 400px;
  background-color: ${props => props.theme.white};
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));
  display: flex;
  /* align-items: center; */
  justify-content: center;
  position: fixed;
  right: 50px;
  bottom: 150px;
  flex-direction: column;
`;

const Form = styled.form`
  display: contents;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 20%;
  border: 1px solid red;
`;

const ModalInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 20%;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 80%;
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
