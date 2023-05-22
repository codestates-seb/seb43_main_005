import React, { Fragment, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
//이미지를 불러옵니다.
import chatbot from "../../assets/images/chatbot.png";
import chatbotClose from "../../assets/images/chatbotClose.png";

function ChatBot(props) {
  const [resultData, setResultData] = useState({}); //최종 결과 데이터
  const [inputData, setInput] = useState(""); //사용자 질문
  const [openChatBot, setopenChatBot] = useState(false); //챗봇 열기 닫기

  const contentEndRef = useRef(null);

  useEffect(() => {
    contentEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [resultData]);

  const hadleChatbot = () => {
    setopenChatBot(!openChatBot);
  };

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
          // 질문과 답변을 result 상태에 추가
          const updatedResult = { ...resultData };
          const id = Object.keys(updatedResult).length + 1; // 새로운 아이디 생성
          updatedResult[id] = [{ question: inputData, answer: response }];
          setResultData(updatedResult);
          setInput(""); // clear the input field
        });
    } catch (error) {
      console.log("ChatBot 에러 발생");
    }
  };
  return (
    <>
      <ModalBtn onClick={hadleChatbot}>
        <img src={openChatBot ? chatbotClose : chatbot} alt="chatbotImg" />
      </ModalBtn>
      {openChatBot && (
        <ModalContainer>
          <ModalHeader>Code Travler 챗봇</ModalHeader>
          <ModalContent>
            {Object.keys(resultData).map(key => (
              <Fragment key={key}>
                <UserQuestion>
                  <strong>Question:</strong> {resultData[key][0].question}
                </UserQuestion>
                <ChatBotAnswer key={key}>
                  <strong>Answer:</strong> {resultData[key][0].answer}
                </ChatBotAnswer>
              </Fragment>
            ))}
            <div ref={contentEndRef} />
          </ModalContent>
          <Form onSubmit={handleSubmit}>
            <ModalInput value={inputData} onChange={handleChange}></ModalInput>
          </Form>
        </ModalContainer>
      )}
    </>
  );
}

// 모달이 열렸을 때 보이는 페이지
const ModalContainer = styled.button`
  /* border: 1px solid black; */
  border: ${({ theme }) => theme.borderBold};
  width: 400px;
  height: 55%;
  background-color: ${props => props.theme.white};
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));
  display: flex;
  /* align-items: center; */
  justify-content: center;
  position: fixed;
  right: 50px;
  bottom: 250px;
  flex-direction: column;
  /* border-radius: 10px; */
`;

const Form = styled.form`
  display: contents;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 15%;
  border: 1px solid red;
  /* border-radius: ; */
`;

const ModalInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 15%;
  border: ${({ theme }) => theme.borderBold};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 1.25em;
  box-sizing: border-box;
  padding: 10px;
`;

const UserQuestion = styled.div`
  width: 80%;
  border: 1px solid black;
  align-self: flex-end;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ChatBotAnswer = styled.div`
  align-self: flex-start;
  width: 80%;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
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
