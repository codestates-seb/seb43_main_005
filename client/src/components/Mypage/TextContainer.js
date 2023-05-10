// * styled component / My page / TextContainer
import styled from "styled-components";

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  @media screen and (max-width: 500px) {
    margin-left: 0;
  }
  & > div {
    color: ${props => props.theme.color.gray100};
    margin-top: 32px;
    @media screen and (max-width: 500px) {
      margin-top: 16px;
    }
  }
  & > p,
  input {
    margin-top: 16px;
  }
`;
export default TextContainer;
