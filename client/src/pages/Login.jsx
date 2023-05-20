import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import AuthInput from "../components/AuthInput.jsx";
import google from "../assets/images/icon_sns_google.svg";
import kakao from "../assets/images/icon_sns_kakao.svg";
import naver from "../assets/images/icon_sns_naver.svg";
import { updateData } from "../api/apiUtil.js";

export default function Login() {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [loginAlert, setLoginAlert] = useState("");
  let data = { email, password };
  // 로그인 버튼 핸들러
  const onSubmitHandler = event => {
    event.preventDefault();
    const newLoginAlert =
      email === "" || password === ""
        ? "아이디 또는 비밀번호를 입력해주세요"
        : "";
    setLoginAlert(newLoginAlert);
    // 성공하면 "/으로이동"
    if (newLoginAlert === "") {
      updateData(data, "/members/login", "post")
        .then(res => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.setItem("access_token", res.authorization);
          localStorage.setItem("refresh_token", res.refresh);
          console.log(res);
          navigate("/");
        })
        .catch(res => {
          console.error(res);
          setLoginAlert("아이디와 비밀번호를 확인해주세요");
          console.log(res.response.data.message);
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
            }}
            aria-hidden="true">
            비밀번호를 잊으셨나요?
          </PasswordFinder>
          <ButtonGroup>
            <button type="submit">로그인</button>
          </ButtonGroup>
        </form>
        <AuthButton>
          <div className="line">SNS 계정으로 로그인</div>
          <div>
            <button
              onClick={() => {
                navigate("/oauth2/authorization/google");
              }}>
              <img src={google} alt="googleLogo" />
            </button>
            <button
              onClick={() => {
                navigate("/oauth2/authorization/kakao");
              }}>
              <img src={kakao} alt="kakaoLogo" />
            </button>
            <button
              onClick={() => {
                navigate("/oauth2/authorization/naver");
              }}>
              <img src={naver} alt="naverLogo" />
            </button>
          </div>
          <div>
            아직 회원이 아니신가요?
            <span
              onClick={() => {
                navigate("/user/signup");
              }}
              // 이거 안넣으면 오류뜸
              aria-hidden="true">
              회원가입
            </span>
          </div>
        </AuthButton>
      </LoginWrap>
    </PageContainer>
  );
}

const LoginWrap = styled.div`
  max-width: 445px;
  width: 100%;
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

const ButtonGroup = styled.div`
  button {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 9px;
    background-color: ${({ theme }) => theme.whiteOp50};
    color: ${({ theme }) => theme.black};
    border: 1px solid black;
    cursor: pointer;
    margin-bottom: 50px;
  }
`;

const AuthButton = styled.div`
  .line {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    font-size: 0.875em;
    margin: 8px 0px;
    color: ${({ theme }) => theme.black};
    margin-bottom: 30px;
  }
  .line::before {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: ${props => props.theme.black};
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
  .line::after {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: ${props => props.theme.black};
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }

  img {
    padding: 0px 20px;
  }

  & > :nth-child(2) {
    white-space: normal;
    font-size: 0.875em;
    text-align: center;
    color: ${({ theme }) => theme.gray100};
    margin-bottom: 30px;
  }
  & > :nth-child(3) {
    white-space: normal;
    font-size: 0.875em;
    text-align: center;
    color: ${({ theme }) => theme.gray100};
  }

  span {
    text-decoration: underline;
    color: ${({ theme }) => theme.black};
    cursor: pointer;
    margin-left: 8px;
  }
`;
