import styled from "styled-components";
const PageContainer = styled.section`
  width: 90%;
  margin: 0 auto;

  h2 {
    font-family: "Shrikhand", cursive;
    color: ${props => props.theme.white};
    -webkit-text-stroke: 1px ${props => props.theme.textBold}; // chrome, safari
    text-shadow: 2.5px 2.5px 0 ${props => props.theme.textBold};
    text-transform: capitalize;
  }

  @media ${props => props.theme.mediaQuery.desktop} {
    max-width: 1375px;
    padding-top: 220px;
    padding-bottom: 150px;
    min-height: calc(100vh - 578px);
    h2 {
      font-size: 3.5em;
      margin-bottom: ${({ h2Margin }) => h2Margin || "50px"};
    }
  }
  @media ${props => props.theme.mediaQuery.tablet} {
    padding-top: 220px;
    padding-bottom: 150px;
    min-height: calc(100vh - 578px);
    h2 {
      font-size: 3.5em;
      margin-bottom: ${({ h2Margin }) => h2Margin || "50px"};
    }
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    padding-top: 160px;
    padding-bottom: 60px;
    min-height: calc(100vh - 397px);
    h2 {
      font-size: 2.5em;
      margin-bottom: ${({ h2Margin }) => h2Margin || "40px"};
    }
  }
`;

export default PageContainer;
