import styled, { css } from "styled-components";

export default function WaveSvg({ menu, course }) {
  return (
    <SvgWrap
      course={course}
      menu={menu}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewbox="0 0 100% 42px"
      preserveAspectRatio="xMidYMid meet">
      <g>
        <path d="M0 330 l0 -90 83 0 c162 0 293 -30 535 -124 225 -88 334 -108 572 -108 241 0 359 23 588 114 260 103 378 123 659 115 216 -6 299 -22 469 -87 323 -124 408 -143 659 -142 247 0 348 19 592 113 276 107 375 124 656 116 220 -6 302 -21 473 -88 319 -123 405 -141 654 -142 247 0 360 23 623 124 221 86 292 100 512 106 288 8 394 -11 670 -117 86 -33 193 -69 239 -80 196 -47 506 -45 697 4 52 13 153 47 226 75 260 100 364 121 611 121 248 -1 336 -18 594 -116 92 -35 205 -73 252 -84 196 -47 505 -45 697 4 52 13 164 51 249 84 229 88 307 104 532 110 275 7 397 -15 649 -114 78 -31 184 -67 236 -80 201 -51 515 -51 714 0 52 13 164 51 249 84 242 94 336 112 585 112 241 0 353 -22 605 -120 74 -29 177 -63 229 -76 185 -47 471 -51 678 -8 43 8 143 40 223 71 300 114 390 133 639 133 259 0 319 -13 716 -158 151 -55 274 -74 470 -75 250 0 346 19 608 119 242 93 300 105 550 111 l207 5 0 89 0 89 -9600 0 -9600 0 0 -90z" />
      </g>
    </SvgWrap>
  );
}

const SvgWrap = styled.svg`
  display: ${({ course }) => course && "none"};
  position: absolute;
  top: 0;
  width: 100%;
  height: 42px;
  transition-duration: 0.5s;
  & g {
    transition-duration: 0.35s;
    stroke: none;
    fill: ${props => props.theme.color.main};
  }

  /* open menu */
  ${props =>
    props.menu &&
    css`
      height: 90vh;
      bottom: 0;
      overflow: visible;
      background-color: ${props => props.theme.color.main};
      transition-duration: 0.5s;
      & g {
        transition-duration: 0.5s;
      }
    `}

  @media ${props => props.theme.mediaQuery.desktop} {
    & g {
      transform: translate(0, 42px) scale(0.1, -0.1);
    }
    ${props =>
      props.menu &&
      css`
        & g {
          transform: translate(0, calc(90vh + 40px)) scale(0.1, -0.1);
        }
      `}
  }

  @media ${props => props.theme.mediaQuery.tablet} {
    & g {
      transform: translate(0, 42px) scale(0.08, -0.1);
    }
    ${props =>
      props.menu &&
      css`
        & g {
          transform: translate(0, calc(90vh + 40px)) scale(0.08, -0.1);
        }
      `}
  }

  @media ${props => props.theme.mediaQuery.mobile} {
    & g {
      transform: translate(0, 40px) scale(0.06, -0.1);
    }
    ${props =>
      props.menu &&
      css`
        & g {
          transform: translate(0, calc(90vh + 40px)) scale(0.06, -0.1);
        }
      `}
  }
`;
