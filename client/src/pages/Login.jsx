import React, { useState } from "react";
import styled from "styled-components";
import PageContainer from "../common/PageContainer.jsx";
import AuthInput from "../components/AuthInput.jsx";
// import axios from "axios";
export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  const [loginFailed, setLoginFailed] = useState("");
  // 이메일 핸들러
  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };
  // 비밀번호 핸들러
  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = event => {
    // 버튼만 누르면 리로드 되는것을 막아줌
    event.preventDefault();

    //빈값일 경우 에러창뜨게하기
    setEmailAlert(email === "" && "이메일을 입력해주세요");
    setPasswordAlert(password === "" && "비밀번호를 입력해주세요");
    if (email === "" || password === "") return;

    //아이디 비밀번호가 일치하지 않을때 에러창 뜨게하기
    let body = {
      email: email,
      password: password,
    };
    console.log(body);
  };
  return (
    <PageContainer>
      <h2>Log in</h2>
      <form onSubmit={onSubmitHandler}>
        <AuthInput
          type="email"
          id="email"
          placeholder="이메일"
          alertMessage={emailAlert}
        />
        <AuthInput
          type="password"
          id="password"
          placeholder="비밀번호"
          alertMessage={passwordAlert}
        />
        <ButtonGroup>
          <button type="submit">Log in</button>
          {/* 로그인 실패시 뜨게할 창 */}
          {/* <p className={loginFailed}>Login failed</p> */}
        </ButtonGroup>
      </form>
    </PageContainer>
  );
}

const ButtonGroup = styled.div`
  button {
    width: 445px;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 9px;
    background-color: ${props => props.theme.color.white};
    cursor: pointer;
  }
`;
