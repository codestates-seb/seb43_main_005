import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import KakaoShateBtn from "../components/mbti/KakaoShateBtn.jsx";
// 이미지를 불러옵니다.
import kakaoIcon from "../assets/images/icon_sns_kakao.svg";

// 결과 데이터를 불러옵니다.
import { mbtiResultData } from "../assets/data/mbtiResultData.js";
//url에서 mbti 값을 가져오기 위함
import { useSearchParams, useNavigate } from "react-router-dom";
function MbtiResult(props) {
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mbti = searchParams.get("mbti");
  //mbti state
  const [resultData, setResultData] = useState({});

  useEffect(() => {
    const mbtiResultObj = mbtiResultData.find(el => el.mbti === mbti);
    console.log(mbtiResultObj);
    setResultData(mbtiResultObj);
  }, [mbti]);

  return (
    <PageContainer>
      <Container>
        <h2>Test Result</h2>
        <ResultMbtiImg src={resultData.image} alt="entp 이미지" />
        <MbtiHeading>{resultData.mbti}</MbtiHeading>
        <MbtiSubText>{resultData.mbtiSubText}</MbtiSubText>
        <WhiteBox>
          추천 컨텐츠: <BoldText>{resultData.recommendedContent}</BoldText>
        </WhiteBox>
        <RecommendedStudyMethod>
          <BoldText>공부법</BoldText>
          {/* {resultData.studyMethods.map((studyMethod, i) => (
            <p key={i}>{studyMethod}</p>
          ))} */}
          {resultData?.studyMethods?.map((studyMethod, i) => (
            <p key={i}>{studyMethod}</p>
          ))}
        </RecommendedStudyMethod>

        <KakaoStyleBtn />
        {/* <img src={kakaoIcon} alt="카카오 아이콘" /> */}
      </Container>
    </PageContainer>
  );
}

export default MbtiResult;

const Container = styled.div`
  max-width: 678px;
  margin: 0 auto;
  display: flex;
  flex-direction: column; //세로 정렬
  justify-content: center;
  text-align: center; //인라인 요소와 텍스트 중앙 정렬
  align-items: center;
`;

const ResultMbtiImg = styled.img`
  width: 350px;
  height: 350px;
`;

const MbtiHeading = styled.div`
  /* 폰트 설정 */
  font-family: "Shrikhand", cursive;
  color: ${props => props.theme.color.gray100};
  -webkit-text-stroke: 1px ${props => props.theme.color.textBold}; // chrome, safari
  text-shadow: 2.5px 2.5px 0 ${props => props.theme.color.textBold};
  font-size: 3em;
  font-weight: 700;
  margin-bottom: 15px;
`;

const MbtiSubText = styled.div`
  font-size: 1em;
  margin-bottom: 15px;
`;

const WhiteBox = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.color.black};
  background-color: ${props => props.theme.color.white};
  margin-bottom: 15px;
  box-sizing: border-box;
  padding: 35px;
`;

const RecommendedStudyMethod = styled(WhiteBox)`
  text-align: left;
  & > * {
    margin-bottom: 10px; // 원하는 간격으로 조정하세요
  }
`;

const BoldText = styled.span`
  display: inline-block;
  font-size: 1.25em;
  font-weight: bold;
`;

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
