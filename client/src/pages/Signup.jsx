import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { updateData } from "../api/apiUtil.js";
import PageContainer from "../components/common/PageContainer.jsx";
import AuthInput from "../components/common/AuthInput.jsx";
import Oauth from "../components/Login/OauthInputBundle.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPW, setCheckPW] = useState("");
  const [essentialAlert, setEssentialAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  let data = {
    email: email.trim(),
    password: password.trim(),
    checkPassword: checkPW.trim(),
    nickname: nickName.trim(),
  };
  // mbti 데이터 있는경우
  let mbtidata = localStorage.getItem("mbti");
  if (mbtidata) {
    data["memberMbti"] = mbtidata;
  }
  // 비밀번호 조건
  const isPasswordValid = password => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9]).{4,12}$/;
    return passwordRegex.test(password);
  };

  // 비밀번호 에러별 경고문구
  const pwAlertCondition = (password, checkPW) => {
    if (password === "" || checkPW === "") {
      return "비밀번호를 입력해주세요";
    } else if (isPasswordValid(password) === false) {
      return "4~12자, 숫자와 소문자 영어를 포함해야합니다.";
    } else if (password !== checkPW) {
      return "비밀번호가 일치하지 않습니다.";
    } else {
      return "";
    }
  };
  const passwordAlertMessage = pwAlertCondition(password, checkPW);
  const isEssentialInfoValid =
    nickName === "" || email === "" ? "닉네임과 이메일을 입력해주세요." : "";
  // 회원가입 핸들러
  const onSubmitHandler = event => {
    event.preventDefault();
    // 경고창과 비번조건 만족하면 post요청
    if (passwordAlertMessage === "" && isEssentialInfoValid === "") {
      updateData(data, `/members`, "post")
        .then(res => {
          navigate("/user/login");
        })
        .catch(error => {
          console.error(error);
          const errorMessage = error.response.data.message;
          errorMessage
            ? setPasswordAlert(`${errorMessage}합니다.`)
            : setPasswordAlert("이메일과 비밀번호를 확인해주세요");
        });
    } else {
      setEssentialAlert(isEssentialInfoValid);
      setPasswordAlert(passwordAlertMessage);
    }
  };

  return (
    <PageContainer>
      <LoginWrap>
        <h2>Sign up</h2>
        <InputBundle
          onSubmit={onSubmitHandler}
          essentialAlert={essentialAlert}
          passwordAlert={passwordAlert}>
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
            value={setPassword}
          />
          <AuthInput
            type="password"
            id="password"
            placeholder="비밀번호 확인"
            alertMessage={passwordAlert}
            value={setCheckPW}
          />
          <ButtonGroup type="submit">회원가입</ButtonGroup>
        </InputBundle>
        <Oauth />
        <LoginNavigate>
          이미 계정이 있으세요?
          <span
            onClick={() => {
              navigate("/user/login");
            }}
            aria-hidden="true">
            로그인
          </span>
        </LoginNavigate>
      </LoginWrap>
    </PageContainer>
  );
}

const LoginWrap = styled.div`
  max-width: 445px;
  margin: 0 auto;
`;

const InputBundle = styled.form`
  & > :nth-child(2) {
    margin-bottom: ${({ essentialAlert }) =>
      essentialAlert === "" ? "0px" : "40px"};
  }

  & > :nth-child(4) {
    margin-bottom: ${({ passwordAlert }) =>
      passwordAlert === "" ? "0px" : "40px"};
  }
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

const LoginNavigate = styled.div`
  white-space: normal;
  font-size: 0.875em;
  text-align: center;
  color: ${({ theme }) => theme.gray100};
  span {
    text-decoration: underline;
    color: ${({ theme }) => theme.black};
    cursor: pointer;
    margin-left: 8px;
  }
`;
