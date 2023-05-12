import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { TbHandFinger } from "react-icons/tb";
import memoji from "../assets/images/memoji.png";

// text  넣고싶은 문구
// rounded  true 넣으면 둥금
// reverse 색상
// onClick
// path 이동 "./asd"
export default function CustomButton({
  text,
  onClick,
  path = undefined,
  reverse = false,
  feat = "square",
}) {
  // feat = 'round' | 'square' | 'tag' | 'course'  | 'login' | 'article'
  const navigate = useNavigate();
  const handlePath = () => path && navigate(path);

  return (
    <StyledButton onClick={onClick || handlePath} feat={feat} reverse={reverse}>
      <span>{text}</span>
      {(feat === "course" || feat === "article") && (
        <TbHandFinger className="icon-finger" />
      )}
    </StyledButton>
  );
}
const StyledButton = styled.button`
  text-transform: uppercase;
  box-sizing: border-box;
  font-size: 0.875em;
  border: ${({ feat, theme }) =>
    feat === "course" || feat === "login" || feat === "article"
      ? theme.color.borderBold
      : theme.color.borderMain};
  .icon-finger {
    position: absolute;
    transform: rotate(90deg);
    font-size: 1.25em;
    color: ${({ theme }) => theme.color.text};
  }
  /* --- common --- */

  ${({ feat }) =>
    feat === "round" &&
    css`
      width: 110px;
      height: 40px;
      border-radius: 29px;
      color: ${({ theme }) => theme.color.main};
      background-color: ${({ theme }) => theme.color.white};
    `}
  // round

  ${({ feat }) =>
    feat === "square" &&
    css`
      width: 150px;
      height: 50px;
      color: ${({ theme }) => theme.color.main};
      background-color: ${({ theme }) => theme.color.white};
    `}
  // square

  ${({ feat }) =>
    feat === "tag" &&
    css`
      padding: 12px 15px;
      border-radius: 2px;
      color: ${({ theme }) => theme.color.main};
    `}
  // tag

  ${({ feat }) =>
    feat === "course" &&
    css`
      width: 100%;
      padding: 12px 15px;
      line-height: 1rem;
      border-radius: 29px;
      color: ${({ theme }) => theme.color.text};
      position: relative;
      text-align: left;
      .icon-finger {
        top: 11px;
        right: 15px;
      }
    `}
  // course

  ${({ feat }) =>
    feat === "login" &&
    css`
      width: 100%;
      height: 50px;
      border-radius: 10px;
      color: ${({ theme }) => theme.color.text};
      background-color: ${({ theme }) => theme.color.whiteOp50};
      &:hover {
        border: ${({ theme }) => theme.color.borderMain};
        color: ${({ theme }) => theme.color.white};
        background-color: ${({ theme }) => theme.color.main};
      }
    `}
  // login

  ${({ feat }) =>
    feat === "article" &&
    css`
      width: 100%;
      padding: 60px 20px;
      position: relative;
      border-radius: 20px;
      color: ${({ theme }) => theme.color.text};
      background-color: ${({ theme }) => theme.color.whiteOp50};
      text-align: left;
      display: flex;
      align-items: center;
      span {
        display: block;
        position: relative;
        padding-left: 120px;
      }
      span:before {
        content: "";
        display: block;
        width: 100px;
        height: 100px;
        top: calc(50% - 55px);
        left: 0px;
        position: absolute;
        background-image: url(${memoji});
        background-repeat: no-repeat;
      }
      &:last-of-type span:before {
        background-position-x: -100px;
      }
      .icon-finger {
        bottom: 20px;
        right: 20px;
      }
    `}
  // article
  
  ${({ reverse }) =>
    reverse &&
    css`
      color: ${({ theme }) => theme.color.white};
      background-color: ${({ theme }) => theme.color.main};
      &:hover {
        background-color: ${({ theme }) => theme.color.mainHover} !important;
      }
    `}
  // reverse
  /* --- default --- */

  &:hover {
    background-color: ${({ feat, theme }) =>
      (feat === "round" || feat === "square" || feat === "tag") &&
      theme.color.mainHoverLight};
  }
  /* --- hover --- */

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    font-size: ${({ feat }) =>
      feat === "square" ||
      feat === "course" ||
      feat === "login" ||
      feat === "article"
        ? "1em"
        : "0.875em"};

    ${({ feat }) =>
      feat === "course" &&
      css`
        padding: 18px 20px;
        .icon-finger {
          top: 16px;
          right: 20px;
        }
      `}
    // course

    ${({ feat }) =>
      feat === "article" &&
      css`
        padding: 70px 30px;
        span {
          padding-left: 130px;
        }
        span:before {
          top: calc(50% - 50px);
        }
        .icon-finger {
          bottom: 20px;
          right: 50px;
          transition-duration: 0.5s;
        }
        &:hover {
          background-color: ${({ theme }) => theme.color.white};
          .icon-finger {
            right: 30px;
          }
        }
      `}
  // article
  }
`;
