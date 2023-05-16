import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import AuthInput from "../components/AuthInput.jsx";
// import axios from "axios";
import google from "../assets/images/icon_sns_google.svg";
import kakao from "../assets/images/icon_sns_kakao.svg";
import naver from "../assets/images/icon_sns_naver.svg";

export default function Signup() {
  const navigate = useNavigate();
  let [nickName, setNickName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [checkPW, setCheckPW] = useState("");
  let [essentialAlert, setEssentialAlert] = useState("");
  let [passwordAlert, setPasswordAlert] = useState("");
  let [passwordMatche, setPasswordMatche] = useState("");

  // 비밀번호 조건
  const isPasswordValid = pw => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return passwordRegex.test(pw);
  };

  const onSubmitHandler = event => {
    // 버튼만 누르면 리로드 되는것을 막아줌
    event.preventDefault();
    //닉네임과 이메일
    setEssentialAlert(
      nickName === "" || email === "" ? "필수 정보 입니다." : ""
    );
    // 비밀번호 조건
    console.log(isPasswordValid(password));
    setPasswordAlert(
      isPasswordValid(password) === false &&
        "8~16자 영문 대,소문자, 특수문자를 사용하세요"
    );
    // 비밀번호 빈값일 때
    setPasswordAlert(password === "" ? "비밀번호를 입력해주세요" : "");

    setPasswordMatche(
      password === checkPW ? "" : "비밀번호가 일치하지 않습니다."
    );
    // if (nickName === "" || email === "") return;
  };

  return (
    <PageContainer>
      <LoginWrap onSubmit={onSubmitHandler}>
        <h2>Sign up</h2>
        <InputBundle
          onSubmit={onSubmitHandler}
          essentialAlert={essentialAlert}
          passwordAlert={passwordAlert}
          passwordMatche={passwordMatche}>
          <AuthInput
            type="text"
            id="nickName"
            placeholder="닉네임"
            value={setNickName}
          />
          <AuthInput
            type="email"
            id="email"
            placeholder="이메일"
            alertMessage={essentialAlert}
            value={setEmail}
          />
          <AuthInput
            type="password"
            id="password"
            placeholder="비밀번호"
            alertMessage={passwordAlert}
            value={setPassword}
          />
          <AuthInput
            type="password"
            id="password"
            placeholder="비밀번호 확인"
            alertMessage={passwordMatche}
            value={setCheckPW}
          />
          <ButtonGroup type="submit">
            <button>회원가입</button>
            {/* 로그인 실패시 뜨게할 창 */}
            {/* <p className={loginFailed}>Login failed</p> */}
          </ButtonGroup>
        </InputBundle>

        <AuthButton>
          <div className="line">SNS 계정으로 회원가입</div>
          <form>
            <img src={google} alt="googleLogo" />
            <img src={kakao} alt="kakaoLogo" />
            <img src={naver} alt="naverLogo" />
          </form>
          <div>
            이미 계정이 있으세요?{" "}
            <span
              onClick={() => {
                navigate("/user/login");
              }}
              // 이거 안넣으면 오류뜸
              aria-hidden="true">
              로그인
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

const InputBundle = styled.form`
  & > :nth-child(2) {
    margin-bottom: ${({ essentialAlert }) =>
      essentialAlert === "" ? "0px" : "40px"};
  }}


  & > :nth-child(3) {
    margin-bottom: ${({ passwordAlert }) =>
      passwordAlert === "" ? "0px" : "40px"};
  }}

  & > :nth-child(4) {
    margin-bottom: ${({ passwordMatche }) =>
      passwordMatche === "" ? "0px" : "40px"};
  }}
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
