import styled from "styled-components";
const PageContainer = styled.section`
  width: 90%;
  margin: 0 auto;

  h2 {
    margin-bottom: 50px;
    font-family: "Shrikhand", cursive;
    color: var(--white);
    -webkit-text-stroke: 1px ${props => props.theme.color.textBold}; // chrome, safari
    text-shadow: 2.5px 2.5px 0 ${props => props.theme.color.textBold};
  }

  @media ${props => props.theme.mediaQuery.desktop} {
    max-width: 1375px;
    padding-top: 110px;
    padding-bottom: 150px;
    h2 {
      font-size: 3.5em;
    }
  }
  @media ${props => props.theme.mediaQuery.tablet} {
    padding-top: 110px;
    padding-bottom: 150px;
    h2 {
      font-size: 3.5em;
    }
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    padding-top: 60px;
    padding-bottom: 60px;
    h2 {
      font-size: 3em;
    }
  }
`;

export default PageContainer;
