import React, { useState } from "react";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import AuthInput from "../components/AuthInput.jsx";

export default function FindPassword() {
  let [emailAlert, setEmailAlert] = useState("");

  return (
    <PageContainer>
      <LoginWrap>
        <h2>
          Find <br />
          password
        </h2>
        <Information>
          가입한 이메일 주소를 입력해주세요. <br />
          비밀번호 재설정을 위한 코드를 보내드리겠습니다.
        </Information>
        <AuthInput
          type="email"
          id="email"
          placeholder="이메일"
          alertMessage={emailAlert}
        />

        <ButtonGroup>
          <button type="submit">이메일 보내기</button>
        </ButtonGroup>
      </LoginWrap>
    </PageContainer>
  );
}

const LoginWrap = styled.div`
  max-width: 445px;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;
  box-sizing: border-box;
`;

const Information = styled.div`
  height: 150px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  align-items: center;
  line-height: 2em;
`;

const ButtonGroup = styled.div`
  button {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    margin: 10px 0px;
    background-color: ${({ theme }) => theme.color.whiteOp50};
    color: ${({ theme }) => theme.color.black};
    border: 1px solid black;
    cursor: pointer;
    margin-bottom: 50px;
  }
`;
