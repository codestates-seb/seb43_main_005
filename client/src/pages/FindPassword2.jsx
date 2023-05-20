import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import AuthInput from "../components/AuthInput.jsx";
import { updateData } from "../api/apiUtil.js";
export default function FindPassword() {
  const navigate = useNavigate();
  const [Alert, setAlert] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let data = { token: code, newPassword };
  const isPasswordValid = pw => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9]).{4,12}$/;
    return passwordRegex.test(pw);
  };
  const pwAlertCondition = (code, newPassword) => {
    if (code === "" || newPassword === "") {
      return "코드 또는 패스워드를 입력해주세요";
    } else if (isPasswordValid(newPassword) === false) {
      return "4~12자, 숫자와 소문자 영어를 포함해야합니다.";
    } else {
      return "";
    }
  };

  // 핸들러
  const onSubmitHandler = event => {
    event.preventDefault();

    const passwordAlertMessage = pwAlertCondition(code, newPassword);
    setAlert(passwordAlertMessage);

    if (passwordAlertMessage === "") {
      updateData(data, `/members/password-reset`, "post")
        .then(res => {
          console.log(res);
          navigate("/");
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
            value={setCode}
          />
          <AuthInput
            type="text"
            id="text"
            placeholder="새로운 비밀번호"
            alertMessage={Alert}
            value={setNewPassword}
          />
          <ButtonGroup>
            <button type="submit">이메일 보내기</button>
          </ButtonGroup>
        </InputBundle>
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

const ButtonGroup = styled.div`
  button {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    margin: 10px 0px;
    background-color: ${({ theme }) => theme.color.whiteOp50};
    color: ${({ theme }) => theme.color.black};
    border: 1px solid black;
    margin-bottom: 50px;
  }
`;

const InputBundle = styled.form`
  & > :nth-child(2) {
    margin-bottom: ${({ codeAlert }) => (codeAlert === "" ? "0px" : "40px")};
  }}

`;
