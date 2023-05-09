import styled from "styled-components";
import { AiFillGithub } from "react-icons/ai";
import { RxNotionLogo } from "react-icons/rx";
import WaveSvg from "../assets/images/WaveSvg.jsx";
import ship from "../assets/images/imgShip.png";

export default function Footer() {
  return (
    <FooterWrap>
      <SvgWrap>
        <WaveSvg />
      </SvgWrap>
      <FooterContainer>
        <FooterContent>
          <p>Copyright ⓒ 2023 Code Traveler ALL RIGHTS RESERVED.</p>
          <p>FE: 유채원, 이현진, 조용주, 황설현</p>
          <p>BE: 김석현, 윤지민, 이동근</p>
          <LinkBox>
            <a href="https://github.com/codestates-seb/seb43_main_005">
              <AiFillGithub />
              github
            </a>
            <a href="https://codestates.notion.site/5f81b2a8f9c74ba7bdae616f46dd378b?v=ec51e24bbb7e48389129c508081eb106&p=6dc1a7150e464e0095f569e66bae353c&pm=s">
              <RxNotionLogo />
              Notion
            </a>
          </LinkBox>
        </FooterContent>
      </FooterContainer>
    </FooterWrap>
  );
}

const FooterWrap = styled.footer`
  padding-top: 42px;
`;
const SvgWrap = styled.div`
  transform: rotate(180deg);
  position: relative;
  z-index: -1;
  &:after {
    transform: rotate(180deg);
    position: absolute;
    left: 7%;
    top: 15px;
    width: 80px;
    height: 80px;
    content: "";
    display: block;
    background-image: url(${ship});
    background-repeat: no-repeat;
    background-size: contain;
    @media ${props => props.theme.mediaQuery.mobile} {
      width: 60px;
      height: 60px;
    }
  }
`;
const FooterContainer = styled.div`
  background-color: ${props => props.theme.color.main};
  text-align: center;
  color: ${props => props.theme.color.white};
  font-family: "GmarketSansLight";
`;
const FooterContent = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 20px 0 40px;
  font-size: 0.875em;
  p {
    line-height: 20px;
  }
  p:first-of-type {
    margin-bottom: 1rem;
  }
  @media ${props => props.theme.mediaQuery.desktop} {
    max-width: 1375px;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    padding: 10px 0 20px;
    font-size: 0.8em;
  }
`;
const LinkBox = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  a {
    color: ${props => props.theme.color.white};
    display: flex;
    & * {
      margin-right: 0.3rem;
    }
  }
  a:hover {
    text-decoration: underline;
  }
  @media ${props => props.theme.mediaQuery.desktop} {
    a:after {
      content: "바로가기";
      padding-left: 2px;
    }
  }
`;
