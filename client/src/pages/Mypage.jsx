import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "../common/PageContainer.jsx";
import Profile from "../components/Mypage/Profile.js";
import TextContainer from "../components/Mypage/TextContainer.js";

export default function Mypage() {
  let navigate = useNavigate();
  // 로그인한 유저의 데이터 불러오기
  // 임시 데이터
  let myType = "고독을 즐기는 혼공러";
  let myLevel = "10";
  return (
    <PageContainer>
      <MyContainer>
        <Profile />
        <LevelContainer>
          <LvBox>
            <div>
              <img src="/" alt="img" />
              lv.{myLevel}
            </div>
            <TextContainer color="#fff">
              <div>내 학습유형</div>
              <p>{myType}</p>
            </TextContainer>
            <TestContainer>
              <div>학습유형 테스트 하러가기</div>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="30"
                  width="30"
                  height="30"
                  transform="rotate(90 30 0)"
                  fill="url(#pattern0)"
                />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1">
                    <use xlinkHref="#image0_76_1824" transform="scale(0.01)" />
                  </pattern>
                  <image
                    id="image0_76_1824"
                    width="100"
                    height="100"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </TestContainer>
          </LvBox>
          <ExpBox>100exp</ExpBox>
        </LevelContainer>
      </MyContainer>
    </PageContainer>
  );
}

const TestContainer = styled.div`
  flex-direction: row;
  background-color: beige;
`;

const MyContainer = styled.article`
  background-color: aliceblue;
  width: 100%;
  display: flex;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
const LevelContainer = styled.article`
  width: 100%;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-evenly;
  padding: 0 20px 0 96px;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;
const LvBox = styled.div`
  background-color: darkcyan;
  max-width: 700px;
  height: 100%;
`;
const ExpBox = styled(LvBox)`
  background-color: gainsboro;
`;
