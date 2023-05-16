import React, { useState } from "react";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import AuthInput from "../components/AuthInput.jsx";
import { updateData } from "../api/apiUtil.js";
export default function FindPassword() {
  const [codeAlert, setCodeAlert] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let data = { code, newPassword };
  const onSubmitHandler = async event => {
    event.preventDefault();

    setCodeAlert(code === "" ? "코드를 입력해주세요" : "");

    try {
      await updateData(data, `/members/password-reset`, "post");
      // 요청이 성공하면 페이지 이동
      // window.location.href = "/user/login";
    } catch (error) {
      // 요청이 실패한 경우 에러 처리
      console.error(error);
      setCodeAlert("코드를 확인해주세요");
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
            type="number"
            id="number"
            placeholder="코드"
            value={setCode}
          />
          <AuthInput
            type="text"
            id="text"
            placeholder="새로운 비밀번호"
            alertMessage={codeAlert}
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
