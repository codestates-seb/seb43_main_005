import React, { useState } from "react";
import styled from "styled-components";
import PageContainer from "../common/PageContainer.jsx";
import AuthInput from "../components/AuthInput.jsx";
// import axios from "axios";
import google from "../assets/images/icon_sns_google.svg";
import kakao from "../assets/images/icon_sns_kakao.svg";
import naver from "../assets/images/icon_sns_naver.svg";

export default function Signup() {
  let [emailAlert, setEmailAlert] = useState("");
  let [passwordAlert, setPasswordAlert] = useState("");
  let [passwordMatche, setPasswordMatche] = useState("");

  return (
    <PageContainer>
      <LoginWrap>
        <h2>Sign up</h2>
        <AuthInput type="text" id="nickName" placeholder="닉네임" />
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
        <AuthInput
          type="password"
          id="password"
          placeholder="비밀번호 확인"
          alertMessage={passwordMatche}
        />
        <ButtonGroup>
          <button type="submit">회원가입</button>
          {/* 로그인 실패시 뜨게할 창 */}
          {/* <p className={loginFailed}>Login failed</p> */}
        </ButtonGroup>
        <AuthButton>
          <div className="line">SNS 계정으로 회원가입</div>
          <form>
            <img src={google} alt="googleLogo" />
            <img src={kakao} alt="kakaoLogo" />
            <img src={naver} alt="naverLogo" />
          </form>
          <div>
            이미 계정이 있으세요? <span>로그인</span>
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

const ButtonGroup = styled.div`
  button {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    margin: 20px 0px 10px 0px;
    background-color: ${({ theme }) => theme.color.whiteOp50};
    color: ${({ theme }) => theme.color.black};
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
    font-size: 0.875rem;
    margin: 8px 0px;
    color: ${({ theme }) => theme.color.black};
    margin-bottom: 30px;
  }
  .line::before {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: ${props => props.theme.color.black};
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
  .line::after {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: ${props => props.theme.color.black};
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
  form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 50px;
  }

  img {
    padding: 0px 20px;
  }

  div {
    white-space: normal;
    font-size: 0.875em;
    text-align: center;
    color: ${({ theme }) => theme.color.gray100};
  }

  span {
    text-decoration: underline;
    color: ${({ theme }) => theme.color.black};
    cursor: pointer;
  }
`;
