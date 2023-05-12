import React from "react";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
// 이미지를 불러옵니다.
import entpImage from "../assets/images/mbtiResultImg/entp.png";
import kakaoIcon from "../assets/images/icon_sns_kakao.svg";

function MbtiResult(props) {
  return (
    <PageContainer>
      <Container>
        <h2>Test Result</h2>
        <ResultMbtiImg src={entpImage} alt="entp 이미지" />
        <MbtiHeading>ENTP</MbtiHeading>
        <MbtiSubText>뜨거운 논쟁을 즐기는 변론가, 발명가형</MbtiSubText>
        <WhiteBox>
          추천 컨텐츠: <BoldText>토론 컨텐츠</BoldText>
        </WhiteBox>
        <RecommendedStudyMethod>
          <BoldText>공부법</BoldText>
          <p>1. 체계적이고 집중적</p>
          <p>2. 내용이 개념적</p>
          <p>3. 관심을 사로 잡거나 지적인 도전을 할 수 있는 내용</p>
          <p>4. 다양한 예시</p>
          <p>5. 빠른 수업 진도</p>
        </RecommendedStudyMethod>

        <img src={kakaoIcon} alt="카카오 아이콘" />
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
