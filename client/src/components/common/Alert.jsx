import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Alert({ closeAlert }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      closeAlert();
      navigate("/");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AlertBack>
      <AlertContainer>
        <p>토큰이 만료되었습니다.</p>
        <p className="ment">다시 로그인 해주세요</p>
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
  background-color: ${props => props.theme.color.blackOp50};
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
  background-color: ${({ theme }) => theme.color.red};
  animation: ${shakeText} 0.2s 0.05s alternate linear infinite;

  p {
    line-height: 1.5em;
    color: ${({ theme }) => theme.color.white};
  }
  .ment:after {
    content: "｡°(°.◜ᯅ◝°)°｡";
    padding-left: 10px;
  }
`;
