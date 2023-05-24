import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import AuthInput from "../components/common/AuthInput.jsx";
import { updateData } from "../api/apiUtil.js";
import Loading from "../components/common/Loading.jsx";
export default function FindPassword() {
  const navigate = useNavigate();
  const [emailAlert, setEmailAlert] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let data = { email };
  const onSubmitHandler = event => {
    event.preventDefault();
    setIsLoading(false);
    if (email === "") {
      setEmailAlert("이메일을 입력해주세요.");
    } else {
      updateData(data, "/members/password-reset-request", "post")
        .then(res => {
          setIsLoading(true);
          navigate("/user/findpw/2");
        })
        .catch(err => {
          console.error(err);
          setEmailAlert("이메일을 확인해주세요.");
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
        <Information>
          가입한 이메일 주소를 입력해주세요. <br />
          비밀번호 재설정을 위한 코드를 보내드리겠습니다.
        </Information>
        <InputBundle onSubmit={onSubmitHandler}>
          <AuthInput
            type="email"
            id="email"
            placeholder="이메일"
            alertMessage={emailAlert}
            value={setEmail}
          />
          <ButtonGroup type="submit">이메일 보내기</ButtonGroup>
        </InputBundle>
        <LoginNavigate>
          비밀번호가 생각났나요?
          <span
            onClick={() => {
              navigate("/user/login");
            }}
            aria-hidden="true">
            로그인
          </span>
        </LoginNavigate>
      </LoginWrap>
      {isLoading ? null : <Loading />}
    </PageContainer>
  );
}
const LoginWrap = styled.div`
  max-width: 445px;
  padding: 0 10px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  line-height: 2em;
  height: 150px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.white};
`;

const InputBundle = styled.form`
  & > :nth-child(1) {
    margin-bottom: ${({ emailAlert }) => (emailAlert === "" ? "0px" : "40px")};
  }}
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
