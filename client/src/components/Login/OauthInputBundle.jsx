import React from "react";
import styled from "styled-components";
import google from "../../assets/images/icon_sns_google.svg";
import kakao from "../../assets/images/icon_sns_kakao.svg";
import naver from "../../assets/images/icon_sns_naver.svg";
export default function Oauth() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  return (
    <AuthButton>
      <div className="line">SNS 계정으로 로그인</div>
      <div>
        <a href={`${baseUrl}oauth2/authorization/google`}>
          <img src={google} alt="googleLogo" />
        </a>
        <a href={`${baseUrl}oauth2/authorization/kakao`}>
          <img src={kakao} alt="kakaoLogo" />
        </a>
        <a href={`${baseUrl}oauth2/authorization/naver`}>
          <img src={naver} alt="naverLogo" />
        </a>
      </div>
    </AuthButton>
  );
}

const AuthButton = styled.div`
  .line {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    font-size: 0.875em;
    margin: 8px 0px;
    color: ${({ theme }) => theme.black};
    margin-bottom: 30px;
  }
  .line::before {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: ${props => props.theme.black};
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
  .line::after {
    content: "";
    flex-grow: 1;
    margin: 0px 16px;
    background: ${props => props.theme.black};
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }

  img {
    padding: 0px 20px;
  }

  & > :nth-child(2) {
    text-align: center;
    margin-bottom: 30px;
  }
`;
