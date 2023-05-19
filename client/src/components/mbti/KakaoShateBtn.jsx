import React, { useEffect } from "react";
import styled from "styled-components";
import kakaoIcon from "../../assets/images/icon_sns_kakao.svg";
const { Kakao } = window;
function KakaoShateBtn({ resultData }) {
  const url = process.env.REACT_APP_HOSTING_URL;
  const testUrl = url + "/mbti";
  const resultUrl = window.location.href;
  console.log(window.location.href);

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  const handleClick = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "CODE TRAVELER MBTI 결과",
        description: resultData.mbti,
        imageUrl: url + resultData.image,
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
      buttons: [
        {
          title: "MBTI 테스트 해보기",
          link: {
            webUrl: testUrl,
            mobileWebUrl: testUrl,
          },
        },
      ],
    });
  };

  return <KakaoStyleBtn onClick={handleClick}></KakaoStyleBtn>;
}
const KakaoStyleBtn = styled.button`
  background: url(${kakaoIcon}) no-repeat center center;
  border: 1px solid black;
  width: 60px;
  height: 60px;
  border-radius: 30px;

  :hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;
export default KakaoShateBtn;
