import styled from "styled-components";

export default function Sparkle() {
  return (
    <SvgWrap
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 16"
      preserveAspectRatio="xMidYMid meet">
      <g>
        <path d="M76 127 c-3 -15 -17 -32 -29 -37 l-22 -9 22 -6 c12 -4 24 -19 28 -33 l7 -27 10 26 c5 15 19 30 31 34 l22 8 -22 4 c-15 3 -26 15 -31 36 l-8 32 -8 -28z" />
      </g>
    </SvgWrap>
  );
}

const SvgWrap = styled.svg`
  width: 17px;
  height: 16px;
  & g {
    transform: translate(0, 16px) scale(0.1, -0.1);
    fill: ${props => props.theme.color.textBold};
    stroke: none;
  }
`;
