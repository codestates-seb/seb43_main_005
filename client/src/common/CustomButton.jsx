import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

export default function CustomButton({
  text,
  onClick,
  path = undefined,
  rounded = false,
  reverse = false,
}) {
  const navigate = useNavigate();
  const handlePath = () => path && navigate(path);

  return (
    <StyledButton
      onClick={onClick || handlePath}
      rounded={rounded}
      reverse={reverse}>
      {text}
    </StyledButton>
  );
}
const StyledButton = styled.button`
  width: ${props => (props.rounded ? "110px" : "150px")};
  border-radius: ${props => (props.rounded ? "20px" : "0px")};
  height: 40px;
  font-size: 1em;
  text-transform: uppercase;
  color: ${props => props.theme.color.main};
  border: 1px solid ${props => props.theme.color.main};
  background-color: ${props => props.theme.color.white};

  @media ${props => props.theme.mediaQuery.mobile} {
    width: ${props => (props.rounded ? "unset" : "150px")};
    height: 34px;
    padding: 0 8px;
    font-size: 0.8em;
  }

  ${props =>
    props.rounded &&
    css`
      &:hover {
        color: ${props.theme.color.white};
        background-color: ${props.theme.color.main};
      }
    `}

  ${props =>
    props.reverse &&
    css`
      color: ${props.theme.color.white};
      background-color: ${props.theme.color.main};
    `}
`;
