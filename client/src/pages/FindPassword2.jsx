import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import AuthInput from "../components/common/AuthInput.jsx";
import { updateData } from "../api/apiUtil.js";
export default function FindPassword() {
  const navigate = useNavigate();
  const [Alert, setAlert] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let data = { token, newPassword };
  const isPasswordValid = pw => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9]).{4,12}$/;
    return passwordRegex.test(pw);
  };

  // 핸들러
  const onSubmitHandler = event => {
    event.preventDefault();
    if (token === "" || newPassword === "") {
      setAlert("코드 또는 패스워드를 입력해주세요");
    } else if (!isPasswordValid(newPassword)) {
      setAlert("4~12자, 숫자와 소문자 영어를 포함해야합니다.");
    } else {
      updateData(data, "/members/password-reset", "post")
        .then(res => {
          navigate("/user/login");
        })
        .catch(error => {
          // 요청이 실패한 경우 에러 처리
          console.error(error);
          setAlert("코드를 확인해주세요");
        });
    }
  };
  return (
    <PageContainer>
      <LoginWrap>
        <h2>
          Find <br />
          password
        </h2>
        <InputBundle onSubmit={onSubmitHandler}>
          <AuthInput
            type="text"
            id="text"
            placeholder="코드 확인"
            value={setToken}
          />
          <AuthInput
            type="text"
            id="text"
            placeholder="새로운 비밀번호"
            alertMessage={Alert}
            value={setNewPassword}
          />
          <ButtonGroup type="submit">비밀번호 변경하기</ButtonGroup>
        </InputBundle>
        <LoginNavigate>
          비밀번호가 생각났나요?
          <span
            onClick={() => {
              navigate("/user/signup");
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
  padding: 0 10px;
  box-sizing: border-box;
`;

const ButtonGroup = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  margin-bottom: 50px;
  background-color: ${({ theme }) => theme.whiteOp50};
  color: ${({ theme }) => theme.black};
  cursor: pointer;
`;

const InputBundle = styled.form`
  & > :nth-child(2) {
    margin-bottom: 40px;
  }
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
