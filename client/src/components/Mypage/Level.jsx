import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextContainer from "./TextContainer";
import CustomProgressBar from "../common/CustomProgressBar.jsx";

export default function Level({ userInfo }) {
  let navigate = useNavigate();
  let myType = userInfo.memberMbti;
  let myLevel = userInfo.level;
  let currentExp = userInfo.experience;
  let nextLevelExp = userInfo.requiredExperience + userInfo.experience;

  return (
    <LvExpContainer>
      <LevelContainer className="LevelContainer">
        <LvBox className="LvBox">
          <SVGBox
            fill={props => props.theme.main}
            stroke={props => props.theme.green900}>
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M53.3952 29.6333L53.03 29.9906L53.3952 30.348L58.7839 35.6219L58.7839 35.6219L58.7899 35.6276C60.1063 36.8739 59.4906 39.0934 57.7676 39.5055L57.7676 39.5054L57.7603 39.5073L50.4185 41.3811L49.9205 41.5082L50.0613 42.0025L52.1303 49.2677C52.1304 49.2681 52.1305 49.2685 52.1306 49.269C52.6093 50.9832 50.9849 52.608 49.2713 52.1287C49.2711 52.1287 49.2709 52.1286 49.2707 52.1286L42.008 50.0588L41.5135 49.9179L41.3865 50.4161L39.5133 57.7604L39.5133 57.7604L39.5115 57.7677C39.0963 59.5053 36.8331 60.0827 35.639 58.7942L35.6391 58.7941L35.6297 58.7845L30.3575 53.3938L30.0001 53.0283L29.6426 53.3937L24.3702 58.7845L24.3702 58.7844L24.3644 58.7905C23.1445 60.08 20.9119 59.54 20.4884 57.7677L20.4884 57.7677L20.4866 57.7604L18.6134 50.4161L18.4864 49.9179L17.9919 50.0588L10.7292 52.1285C10.7288 52.1287 10.7285 52.1288 10.7281 52.1289C9.01489 52.6076 7.39049 50.9833 7.86929 49.2688C7.8694 49.2684 7.8695 49.2681 7.86961 49.2677L9.93863 42.0025L10.0794 41.5082L9.5814 41.3811L2.23959 39.5073L2.2396 39.5072L2.23224 39.5055C0.509818 39.0936 -0.106866 36.8743 1.20999 35.6277L1.21003 35.6277L1.21597 35.6219L6.60485 30.348L6.96998 29.9906L6.60485 29.6333L1.21597 24.3593L1.21602 24.3592L1.20998 24.3535C-0.106364 23.1074 0.509273 20.8878 2.23233 20.4758L2.23234 20.4759L2.2397 20.474L9.58152 18.6002L10.0795 18.4731L9.93875 17.9788L7.86972 10.7136C7.86962 10.7132 7.86951 10.7128 7.8694 10.7125C7.39069 8.99827 9.01462 7.37356 10.7282 7.85243C10.7286 7.85253 10.7289 7.85264 10.7293 7.85274L17.9921 9.92246L18.4866 10.0634L18.6137 9.56517L20.4868 2.22092L20.4869 2.22094L20.4886 2.21357C20.8963 0.507542 23.1537 -0.0893398 24.3647 1.19081L24.3646 1.19084L24.3692 1.19548L29.6413 6.62606L30.0001 6.99559L30.3588 6.62606L35.6311 1.19536L35.6311 1.19539L35.6356 1.1907C36.8582 -0.101684 39.1077 0.523585 39.5116 2.21346L39.5116 2.21348L39.5134 2.22081L41.3866 9.56505L41.5136 10.0633L42.0081 9.92234L49.2708 7.85263C49.2711 7.85254 49.2714 7.85245 49.2717 7.85237C50.9849 7.37353 52.6093 8.99761 52.1308 10.712C52.1307 10.7125 52.1305 10.713 52.1304 10.7135L50.0614 17.9786L49.9206 18.4729L50.4186 18.6L57.7604 20.4739L57.7604 20.4739L57.7678 20.4757C59.4902 20.8876 60.1069 23.1069 58.79 24.3535L58.79 24.3535L58.784 24.3593L53.3952 29.6333Z" />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central">
                Lv.{myLevel}
              </text>
            </svg>
          </SVGBox>
          <TextContainer
            divMargin="0"
            color={props => props.theme.black}
            fontSize="0.8rem"
            pFontSize="1.25rem">
            <div>내 학습유형</div>
            <p>{myType}</p>
          </TextContainer>
        </LvBox>
        <TextContainer
          maxWidth="700px"
          divMargin="0"
          flexDirection="row"
          justifyContent="flex-end">
          <StyledSpan onClick={() => navigate("/mbti")} role="none">
            <span>학습유형 테스트 하러가기</span>
            <SVGBox as="span" margin="0 10px">
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
            </SVGBox>
          </StyledSpan>
        </TextContainer>
      </LevelContainer>
      <ExpBox>
        <CustomProgressBar
          progress={(currentExp / nextLevelExp) * 100}
          marginBottom="0"
        />
        <ExpNum>
          <span>
            <span>exp </span>
            <span>{currentExp}</span>
          </span>
          <span>{nextLevelExp}</span>
        </ExpNum>
      </ExpBox>
      <Link>
        <a href="/">레벨업하면 보상!</a>
      </Link>
    </LvExpContainer>
  );
}
const LvExpContainer = styled.article`
  width: 100%;
  min-width: 250px;
  min-height: 130px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-evenly;
  @media ${props => props.theme.mediaQuery.mobile} {
    min-width: 350px;
    width: 100%;
    margin: 20px auto;
  }
`;
const LevelContainer = styled(LvExpContainer)`
  background-color: ${props => props.theme.white};
  border: ${props => props.theme.borderBold};
  @media ${props => props.theme.mediaQuery.mobile} {
    width: 100%;
    padding: 0;
  }
`;
const LvBox = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 110px 1fr;
  align-items: center;
  @media ${props => props.theme.mediaQuery.mobile} {
    grid-template-columns: 110px 1fr;
  }
`;
const StyledSpan = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  word-break: keep-all;
`;
const SVGBox = styled.div`
  margin: ${props => props.margin || "auto"};
  & svg {
    fill: ${props => props.fill};
    stroke: ${props => props.stroke};
  }
  & svg > text {
    fill: ${props => props.theme.white};
    stroke: none;
  }
`;
const ExpBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
`;
const ExpNum = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  & > span:first-child {
    color: ${props => props.theme.main};
    font-size: 0.6rem;
  }
  & > span > span:nth-child(2) {
    font-size: 1.2rem;
  }
`;
const Link = styled.span`
  display: flex;
  justify-content: flex-end;
  margin: 8px 0;
  & > a {
    color: ${props => props.theme.gray200};
  }
  & :hover {
    text-decoration: underline;
  }
`;
