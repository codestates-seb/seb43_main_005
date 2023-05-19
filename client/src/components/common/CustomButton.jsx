import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { TbHandFinger } from "react-icons/tb";
import memoji from "../../assets/images/memoji.png";

/**
 * admin 수정시 item 속성 필수!
 *
 * @param text 버튼에 표시될 텍스트를 입력합니다. (** 생략불가  **)
 * @param type button tag 기본 속성입니다. (ex. <button type='submit' />)
 * @param onClick 페이지 경로 이동외 다른 Click 이벤트가 있는 경우 부모 컴포넌트의 속성이 우선 적용됩니다.
 * @param path 버튼의 기능이 단순 경로 이동만 있을 경우 사용합니다.
 * @param item 경로이동하면서 state로 같이 전달할 item
 * @param feat button style (상세설명 figma 참조)
 * ----- feat = 'round' | 'square' | 'tag' | 'course' | 'login' | 'article' | 'underline'
 * @param reverse 색상반전
 *
 */

export default function CustomButton({
  text,
  type,
  onClick,
  path = undefined,
  item = undefined,
  feat = "square",
  reverse = false,
  disabled = false,
}) {
  const navigate = useNavigate();
  const handlePath = () => path && navigate(path, { state: { item } });

  return (
    <StyledButton
      onClick={onClick || handlePath}
      feat={feat}
      reverse={reverse}
      type={type}
      disabled={disabled}>
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
      @media ${({ theme }) => theme.mediaQuery.mobile} {
        width: unset;
        height: unset;
        padding: 10px 15px;
      }
    `}
  // round
  
  ${({ feat }) =>
    feat === "square" &&
    css`
      width: 150px;
      height: 50px;
      color: ${({ theme }) => theme.color.main};
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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

  ${({ feat }) =>
    feat === "underline" &&
    css`
      color: ${({ theme }) => theme.color.main};
      border-width: 0 0 1px 0;
    `}
  // underline
  
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
