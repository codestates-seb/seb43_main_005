import React, { useState } from "react";
import styled from "styled-components";
import PageContainer from "../common/PageContainer.jsx";
import AuthInput from "../components/AuthInput.jsx";
// import axios from "axios";
import google from "../assets/images/icon_sns_google.svg";
import kakao from "../assets/images/icon_sns_kakao.svg";
import naver from "../assets/images/icon_sns_naver.svg";

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

    //로그인 처리
    // axios
    //   .post(
    //     '넘겨받은 주소',
    //     {
    //       email,
    //       password,
    //     }
    //   )
    //   .then((res) => {
    //     localStorage.setItem('access_token', res.headers.authorization);
    //     localStorage.setItem('refresh_token', res.headers.refresh);
    //     setLoginFailed('');
    //     navigate('/home');
    //   })
    //   .catch(() => {
    //     setLoginFailed('login-failed');
    //   });
  };
  return (
    <PageContainer>
      <LoginWrap>
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
          <div>비밀번호를 잊으셨나요?</div>
          <ButtonGroup>
            <button type="submit">로그인</button>
            {/* 로그인 실패시 뜨게할 창 */}
            {/* <p className={loginFailed}>Login failed</p> */}
          </ButtonGroup>
        </form>
        <form>
          <div>SNS 계정으로 로그인</div>
          <img src={google} alt="googleLogo" />
          <img src={kakao} alt="kakaoLogo" />
          <img src={naver} alt="naverLogo" />
        </form>
      </LoginWrap>
    </PageContainer>
  );
}

const ButtonGroup = styled.div`
  button {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 9px;
    background-color: ${props => props.theme.color.white};
    border: 1px solid black;
    cursor: pointer;
  }
`;

const LoginWrap = styled.div`
  max-width: 445px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;
