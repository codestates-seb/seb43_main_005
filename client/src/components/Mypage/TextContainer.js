// * styled component / My page / TextContainer
import styled from "styled-components";

const TextContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  word-break: break-word;

  max-width: ${props => props.maxWidth || "auto"};
  flex-direction: ${props => props.flexDirection || "column"};
  justify-content: ${props => props.justifyContent || "none"};
  align-items: ${props => props.alignItems || "none"};
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin};

  @media ${props => props.theme.mediaQuery.mobile} {
    margin: 0;
    padding: 0;
  }
  & > div {
    color: ${props => props.theme.color.gray100};
    margin-top: ${props => props.divMargin || "32px"};
    @media ${props => props.theme.mediaQuery.mobile} {
      margin-top: 16px;
    }
  }
  & > p,
  input {
    font-size: ${props => props.pFontSize};
    color: ${props => props.color};
    margin-top: 16px;
  }
`;
export default TextContainer;
