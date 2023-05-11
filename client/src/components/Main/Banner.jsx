import styled, { keyframes } from "styled-components";
import Sparkle from "../../assets/images/Sparkle.jsx";

export default function Banner() {
  return (
    <BannerContainer>
      {bannerText.map((text, i) => (
        <BannerText key={i}>
          <Sparkle />
          <p>{text}</p>
        </BannerText>
      ))}
    </BannerContainer>
  );
}
const slidein = keyframes`
  from{
    transform: translateX(0px);
  }
  to{
    transform: translateX(-100%);
  }
`;
const BannerContainer = styled.ul`
  display: flex;
  padding: 20px 0;
  overflow: hidden;
  border-top: ${props => props.theme.color.borderBold};
  border-bottom: ${props => props.theme.color.borderBold};
  white-space: nowrap;
  @media ${props => props.theme.mediaQuery.mobile} {
    padding: 15px 0;
  }
`;
const BannerText = styled.li`
  display: flex;
  width: inherit;
  font-family: "GmarketSansLight", cursive;
  animation: ${slidein} 5s linear infinite;
  p {
    padding: 0 40px;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    p {
      padding: 0 25px;
      font-size: 0.875em;
    }
  }
`;
export const bannerText = [
  "Explore the World of Development with Tailored Learning Resources",
  "Unleash Your Potential with Personalized Learning Experiences",
  "Discover tailored learning paths in the world of development",
  "Customized Learning Paths Tailored for Your Unique Adventure",
  // "Personalized Learning Experiences for Aspiring Developers",
  // "Discover a World of Tailored Learning Experiences for Developers",
  // "Empowering Developers with Tailored Learning Experiences",
  // "Personalized Pathways for Aspiring Developers",
];
