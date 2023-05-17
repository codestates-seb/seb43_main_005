import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import AuthInput from "../components/AuthInput.jsx";
import google from "../assets/images/icon_sns_google.svg";
import kakao from "../assets/images/icon_sns_kakao.svg";
import naver from "../assets/images/icon_sns_naver.svg";
import { updateData } from "../api/apiUtil.js";

export default function Signup() {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPW, setCheckPW] = useState("");
  const [essentialAlert, setEssentialAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState(
    "4~12자, 숫자와 소문자 영어를 포함해야합니다."
  );

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
  console.log(data);
  // 비밀번호 조건
  const isPasswordValid = pw => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9]).{4,12}$/;
    return passwordRegex.test(pw);
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

  const onSubmitHandler = async event => {
    // 버튼만 누르면 리로드 되는것을 막아줌
    event.preventDefault();

    // alert
    setEssentialAlert(
      nickName === "" || email === "" ? "필수 정보 입니다." : ""
    );
    setPasswordAlert(pwAlertCondition(password, checkPW));

    // 알람이 빈값이면 서버에 post보내기
    if (essentialAlert === "" && passwordAlert === "") {
      try {
        await updateData(data, `/members`, "post");

        navigate("/user/login");
      } catch (error) {
        console.error(error);
        if (passwordAlert === "") {
          setPasswordAlert("이메일과 비밀번호를 확인해주세요");
        }
      }
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
          <ButtonGroup type="submit">
            <button>회원가입</button>
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

  & > :nth-child(4) {
    margin-bottom: ${({ passwordAlert }) =>
      passwordAlert === "" ? "0px" : "40px"};
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
