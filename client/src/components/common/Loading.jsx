import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../redux/features/user/userSlice.js";
import useScrollTop from "../../hooks/useScroll.js";

export default function Loading() {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
      // useScrollTop(0);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <LoadingContainer>
      <h1>
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>!</span>
      </h1>
    </LoadingContainer>
  );
}

const bounce = keyframes`
  100% {
    top: -20px;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
      0 5px 0 #ccc, 0 6px 0 #ccc, 0 7px 0 #ccc, 0 8px 0 #ccc, 0 9px 0 #ccc,
      0 50px 25px rgba(0, 0, 0, 0.2);
  }
`;
const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.main};
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;

  h1 {
    height: 100px;
    display: flex;
    gap: 10px;
  }

  h1 span {
    position: relative;
    top: 20px;
    display: inline-block;
    animation: ${bounce} 0.3s ease infinite alternate;
    font-family: "Shrikhand", cursive;
    font-size: 100px;
    color: #fff;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
      0 5px 0 #ccc, 0 6px 0 transparent, 0 7px 0 transparent,
      0 8px 0 transparent, 0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
  }

  h1 span:nth-child(2) {
    animation-delay: 0.1s;
  }
  h1 span:nth-child(3) {
    animation-delay: 0.2s;
  }
  h1 span:nth-child(4) {
    animation-delay: 0.3s;
  }
  h1 span:nth-child(5) {
    animation-delay: 0.4s;
  }
  h1 span:nth-child(6) {
    animation-delay: 0.5s;
  }
  h1 span:nth-child(7) {
    animation-delay: 0.6s;
  }
  h1 span:nth-child(8) {
    animation-delay: 0.7s;
  }

  @media ${props => props.theme.mediaQuery.mobile} {
    h1 span {
      font-size: 60px;
    }
  }
`;
