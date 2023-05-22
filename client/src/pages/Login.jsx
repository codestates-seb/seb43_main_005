import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import AuthInput from "../components/common/AuthInput.jsx";
import Oauth from "../components/Login/Oauth.jsx";

import { updateData } from "../api/apiUtil.js";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAlert, setLoginAlert] = useState("");
  // 로그인 핸들러
  const onSubmitHandler = event => {
    event.preventDefault();
    if (email === "" || password === "") {
      setLoginAlert("아이디 또는 비밀번호를 입력해주세요");
    } else {
      let data = { email, password };
      updateData(data, "/members/login", "post")
        .then(res => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.setItem("access_token", res.authorization);
          localStorage.setItem("refresh_token", res.refresh);
          navigate("/");
        })
        .catch(error => {
          console.error(error);
          setLoginAlert("아이디와 비밀번호를 확인해주세요");
        });
    }
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
            value={setEmail}
          />
          <AuthInput
            type="password"
            id="password"
            placeholder="비밀번호"
            alertMessage={loginAlert}
            value={setPassword}
          />
          <PasswordFinder
            onClick={() => {
              navigate("/user/findpw/1");
            }}>
            비밀번호를 잊으셨나요?
          </PasswordFinder>
          <ButtonGroup type="submit">로그인</ButtonGroup>
        </form>
        <Oauth />
      </LoginWrap>
    </PageContainer>
  );
}

const LoginWrap = styled.div`
  max-width: 445px;
  margin: 0 auto;
`;

const PasswordFinder = styled.div`
  text-align: right;
  text-decoration: underline;
  color: ${({ theme }) => theme.gray100};
  font-size: 0.875em;
  margin: 10px 0px;
  cursor: pointer;
`;

const ButtonGroup = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 9px;
  background-color: ${({ theme }) => theme.whiteOp50};
  color: ${({ theme }) => theme.black};
  border: 1px solid black;
  cursor: pointer;
  margin-bottom: 50px;
`;
