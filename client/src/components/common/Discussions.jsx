import styled from "styled-components";
import PageContainer from "./PageContainer.jsx";
export default function Discusstions({
  title, // 제목
  createdAt, // 생성일
  view, // 조회수
  commentCount, // 댓글수
}) {
  return (
    <StyledDiscusstions>
      <BodyContainer>
        <Body>
          <div>{title}</div>
          <p>
            {createdAt} | 조회 {view}
          </p>
        </Body>
      </BodyContainer>
      <Comment>{commentCount}</Comment>
    </StyledDiscusstions>
  );
}

const StyledDiscusstions = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100px;
  margin: 10px 0px;
  background-color: ${props => props.theme.color.white};
  border: 1px solid ${props => props.theme.color.black};
`;

const BodyContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Body = styled.div`
  padding: 20px;

  div {
    width: 100%;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 20px;
  }

  p {
    color: ${props => props.theme.color.gray200};
  }
`;

const Comment = styled.div`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${props => props.theme.color.sub};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px;
`;
