import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";

export default function ErrorPage() {
  return (
    <PageContainer>
      <ErrorContainer>
        <SVGBox
          fill={props => props.theme.main}
          stroke={props => props.theme.green900}>
          <svg viewBox="0 0 1130 1080" fill="none">
            <g clipPath="url(#clip0_84_822)">
              <path
                d="M814.5 920.167H922.833V1028.5H814.5V920.167ZM814.5 486.833H922.833V811.833H814.5V486.833ZM868.125 216C569.125 216 327 458.667 327 757.667C327 1056.67 569.125 1299.33 868.125 1299.33C1167.67 1299.33 1410.33 1056.67 1410.33 757.667C1410.33 458.667 1167.67 216 868.125 216ZM868.667 1191C629.25 1191 435.333 997.083 435.333 757.667C435.333 518.25 629.25 324.333 868.667 324.333C1108.08 324.333 1302 518.25 1302 757.667C1302 997.083 1108.08 1191 868.667 1191Z"
                fill="#39896B"
              />
            </g>
          </svg>
        </SVGBox>
        <h2>404 Error</h2>
        <p>원하시는 페이지를 찾을 수 없습니다.</p>
        <p>입력하신 페이지의 주소가 정확한지 다시 한번 확인해주세요.</p>
      </ErrorContainer>
    </PageContainer>
  );
}

const ErrorContainer = styled.div`
  width: 100vw;
  overflow: hidden;

  @media screen and (max-width: 500px) {
    width: 90%;
  }
  & > h2 {
    font-size: 6.25rem;
    margin-bottom: 75px;
  }
  & > p {
    font-size: 2.5rem;
    margin-bottom: 20px;
    @media screen and (max-width: 500px) {
      font-size: 2rem;
    }
  }
`;
const SVGBox = styled.div`
  & > svg {
    height: 90vh;
    position: absolute;
    right: 0px;
    z-index: -1;
    fill: ${props => props.fill};
    stroke: ${props => props.stroke};
  }
`;
