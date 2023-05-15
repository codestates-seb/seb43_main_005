import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";

export default function EditMypage() {
  return (
    <PageContainer>
      <MyContainer>
        Teampage
        <Card>
          <Diagonal />
          <CircleBox>
            <Circle />
            <Circle />
            <Circle />
            <Circle />
            <Circle />
            <Circle />
            <Circle />
            <Circle />
          </CircleBox>
          <Diagonal className="bottom" />
        </Card>
      </MyContainer>
    </PageContainer>
  );
}

const MyContainer = styled.article`
  background-color: aliceblue;
  width: 100%;
  height: 100%;
  display: flex;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
const Card = styled.div`
  position: relative;
  width: 230px;
  height: 280px;
  background-color: ${props => props.theme.color.white};
  border: ${props => props.theme.color.borderBold};
  clip-path: polygon(100% 10%, 100% 90%, 90% 100%, 0 100%, 0 0, 90% 0);
`;
const Diagonal = styled.div`
  position: absolute;
  right: -18px;
  width: 80px;
  height: 1px;
  background-color: red;
  transform: rotate(51deg);
  & .bottom {
    // 왜 안먹히지?
    top: 100px;
    background-color: blue;
    transform: rotate(300deg);
  }
`;
const CircleBox = styled.ul`
  position: absolute;
  left: -14px;
`;
const Circle = styled.li`
  margin-top: 10px;
  width: 23px;
  height: 23px;
  background-color: ${props => props.theme.color.bg};
  border: ${props => props.theme.color.borderBold};
  border-radius: 50%;
  list-style: none;
`;
