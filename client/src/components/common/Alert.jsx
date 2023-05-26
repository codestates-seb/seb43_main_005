import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Alert({
  closeAlert,
  ment = ["로그인이 필요한 서비스입니다."],
  redirect = true,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      closeAlert();
      redirect && navigate("/");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AlertBack>
      <AlertContainer>
        {ment?.map((el, i) => (
          <p key={i}>{el}</p>
        ))}
      </AlertContainer>
    </AlertBack>
  );
}

const AlertBack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.blackOp50};
`;

const shakeText = keyframes`
  from{
    transform: rotate(3deg) ;
  }
  to{
    transform: rotate(-3deg);
  }
`;

const AlertContainer = styled.div`
  max-width: 500px;
  width: 90%;
  padding: 20px 0;
  text-align: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.red};
  animation: ${shakeText} 0.2s 0.05s alternate linear infinite;

  p {
    line-height: 1.5em;
    color: ${({ theme }) => theme.white};
    &:last-of-type:after {
      content: "｡°(°.◜ᯅ◝°)°｡";
      padding-left: 10px;
    }
  }
`;
