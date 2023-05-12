import styled, { keyframes, css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal.js";
import HeaderUser from "./HeaderUser.jsx";
import WaveSvg from "../../assets/images/WaveSvg.jsx";
import ship from "../../assets/images/imgShip.png";

export default function Header() {
  const login = true; // 임시변수
  const [menu, openMenu, closeMenu] = useModal(false);
  const navigate = useNavigate();
  const handleLink = path => {
    navigate(path);
    closeMenu();
  };

  return (
    <HeaderWrap menu={menu}>
      <WaveSvg menu={menu} />
      <Wrap>
        <BurgerBtn
          className="burgerBtn"
          onClick={() => (menu ? closeMenu() : openMenu())}>
          <Burger className="burger" />
        </BurgerBtn>
        <Logo className="logo">
          <Link to="/">CODE TRAVELER</Link>
        </Logo>
        <UserWrap className="user">
          <HeaderUser login={login} />
        </UserWrap>
      </Wrap>
      <Nav className="nav">
        <ul>
          <li onClick={() => handleLink("/")} role="none">
            학습하기
          </li>
          <li onClick={() => handleLink("/")} role="none">
            토론하기
          </li>
        </ul>
        <button onClick={() => handleLink("/teampage")} className="author">
          만든사람들
        </button>
      </Nav>
    </HeaderWrap>
  );
}

const spinMenu = keyframes`
  from {
    transform: rotate(0deg);
  } 
  to {
    transform: rotate(90deg);
  }
`;
const spinMenu2 = keyframes`
  from {
    transform: rotate(0deg);
  } 
  to {
    transform: rotate(-45deg);
    top: 12px;
    left: 12px;
  }
`;
const shakeText = keyframes`
  from{
    transform: rotate(7deg) ;
  }
  to{
    transform: rotate(-7deg);
  }
`;
// animation
const HeaderWrap = styled.header`
  width: 100%;
  padding-top: 70px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 8888;
  height: unset;
  transition-duration: 0.5s;
  transition-delay: 0.4s;
  ${props =>
    !props.menu &&
    css`
      .burgerBtn:hover .burger {
        &::after,
        &::before {
          top: 0;
        }
        &::before {
          animation-name: ${spinMenu};
          animation-duration: 0.3s;
          animation-delay: 0.3s;
          animation-fill-mode: forwards;
        }
      }
    `}

  /* open menu */
  ${props =>
    props.menu &&
    css`
      padding-top: 30px;
      height: 100vh;
      background-color: ${props => props.theme.color.bg};
      .burger {
        animation-name: ${spinMenu2};
        animation-duration: 0.3s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
        &::after,
        &::before {
          top: 0;
          background-color: ${props => props.theme.color.white};
        }
        &::before {
          transform: rotate(90deg);
        }
      }
      .logo {
        color: ${props => props.theme.color.white};
      }
      .nav {
        height: calc(90vh - 90px);
        z-index: 111;
        opacity: 1;
        transform: scale(1);
        transition-delay: 0.3s;
      }
      .user {
        z-index: -1;
      }
    `}

  @media ${props => props.theme.mediaQuery.tablet} {
    padding-top: 60px;
    ${props =>
      props.menu &&
      css`
        padding-top: 30px;
      `}
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    padding-top: 50px;
    ${props =>
      props.menu &&
      css`
        padding-top: 20px;
      `}
  }
`;
const Wrap = styled.div`
  position: relative;

  @media ${props => props.theme.mediaQuery.desktop} {
    padding: 0 40px;
  }
  @media ${props => props.theme.mediaQuery.tablet} {
    width: 90%;
    margin: 0 auto;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    width: 90%;
    margin: 0 auto;
  }
`;
const Logo = styled.h1`
  font-size: 1.87em;
  line-height: 40px;
  font-family: "Shrikhand", cursive;
  text-align: center;
  a {
    color: ${props => props.theme.color.main};
  }

  @media ${props => props.theme.mediaQuery.mobile} {
    font-size: 1.2em;
    line-height: 34px;
  }
`;
const BurgerBtn = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 40px;
  left: 0;

  @media ${props => props.theme.mediaQuery.desktop} {
    left: 40px;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    width: 25px;
    height: 34px;
  }
`;
const Burger = styled.span`
  position: absolute;
  top: 18px;
  left: 0;
  width: 100%;
  height: 100%;
  &::after,
  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 4px;
    background-color: ${props => props.theme.color.main};
    border-radius: 2px;
    transition-duration: 0.3s;
  }
  &::after {
    top: 5px;
  }
  &::before {
    top: -5px;
  }

  @media ${props => props.theme.mediaQuery.mobile} {
    top: 15px;
  }
`;
const UserWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  @media ${props => props.theme.mediaQuery.desktop} {
    right: 40px;
  }
`;
// header
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 0;
  position: relative;
  transition-duration: 0.3s;
  transform: scale(0);
  &:after {
    position: absolute;
    bottom: -48px;
    width: 80px;
    height: 80px;
    content: "";
    display: block;
    background-image: url(${ship});
    background-repeat: no-repeat;
    background-size: contain;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    li {
      font-size: 3em;
      font-family: "GmarketSansBold";
      color: ${props => props.theme.color.white};
      cursor: pointer;
      -webkit-text-stroke: 1px ${props => props.theme.color.textBold}; // chrome, safari
      &:hover {
        text-shadow: 5px 5px 0px ${props => props.theme.color.textBold};
      }
    }
  }

  .author {
    font-family: "GmarketSansLight";
    position: absolute;
    bottom: -25px;
    color: ${props => props.theme.color.white};
    font-size: 1em;
  }
  .author:hover {
    animation: ${shakeText} 0.2s 0s alternate linear infinite;
  }

  @media ${props => props.theme.mediaQuery.desktop} {
    &:after {
      right: 15%;
    }
    .author {
      right: calc(15% + 90px);
    }
  }
  @media ${props => props.theme.mediaQuery.tablet} {
    &:after {
      right: 10%;
    }
    .author {
      right: calc(10% + 90px);
    }
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    ul {
      gap: 2rem;
    }
    ul a {
      font-size: 2.2em;
    }
    &:after {
      width: 60px;
      height: 60px;
      bottom: -70px;
    }
    .author {
      bottom: -10px;
    }
  }
`;
// nav
