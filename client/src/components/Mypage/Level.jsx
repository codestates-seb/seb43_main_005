import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextContainer from "./TextContainer";
import CustomProgressBar from "../common/CustomProgressBar.jsx";
import { TbHandFinger } from "react-icons/tb";

export default function Level({ userInfo }) {
  let navigate = useNavigate();
  let myType = userInfo.memberMbti;
  let myLevel = userInfo.level;
  let currentExp = userInfo.experience;
  let requiredExperience = userInfo.requiredExperience;
  let nextLevelExp = userInfo.requiredExperience + userInfo.experience;

  return (
    <LvExpContainer>
      <LevelContainer className="LevelContainer">
        <LvBox className="LvBox">
          <SVGBox>
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
            divColor={props => props.theme.black}
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
              <TbHandFinger className="finger" />
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
          <span>{requiredExperience}</span>
        </ExpNum>
      </ExpBox>
      <Link>
        <div>
          레벨업까지 {requiredExperience} 남았어요! 레벨업하면 새로운 테마가
          열려요!
        </div>
      </Link>
    </LvExpContainer>
  );
}
const LvExpContainer = styled.article`
  width: 100%;
  min-width: 250px;
  padding: 20px 0;
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
  & svg:not(.finger) {
    fill: ${props => props.theme.main};
    stroke: ${props => props.theme.green900};
  }
  & svg:not(.finger) > text {
    fill: ${props => props.theme.white};
    stroke: none;
  }
  .finger {
    transform: rotate(90deg);
    font-size: 1.4rem;
    color: ${({ theme }) => theme.text};
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
  & > div {
    color: ${props => props.theme.gray200};
  }
  & :hover {
    text-decoration: underline;
  }
`;
