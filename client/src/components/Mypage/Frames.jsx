import styled from "styled-components";

export default function Frames() {
  return (
    <>
      <Frame />
      <Frame />
      <Frame />
      <Frame />
      <Frame />
      <Frame />
    </>
  );
}

const Frame = styled.div`
  width: 124px;
  height: 124px;
  background-color: ${props => props.theme.color.white};
  border: 2px solid black;
  border-radius: 100px;
  margin: 35px auto;
  &:hover {
    transform: scale(1.1);
    transition-duration: 0.5s;
  }
`;
