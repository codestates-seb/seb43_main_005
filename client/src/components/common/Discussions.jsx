import styled from "styled-components";
import { useNavigate } from "react-router-dom";
export default function Discusstions({ body }) {
  if (!body) {
    return null;
  }
  const navigate = useNavigate();
  let title = body.title;
  let createdAt = body.createdAt.slice(0, 10);
  let view = body.viewCount;
  let commentCount = body.commentCount;
  let id = body.articleId;

  return (
    <StyledDiscusstions>
      <Body>
        <div
          onClick={() => {
            navigate(`/discussion/${id}`);
          }}
          aria-hidden="true">
          {title}
        </div>
        <p>
          {createdAt} | 조회 {view}
        </p>
      </Body>
      <Comment>댓글{commentCount}</Comment>
    </StyledDiscusstions>
  );
}

const StyledDiscusstions = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100px;
  border: 1px solid ${props => props.theme.black};
  border-radius: 10px;
  margin: 15px 0px;
  background-color: ${props => props.theme.white};
`;

const Body = styled.div`
  padding: 20px;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  div {
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 20px;
  }

  p {
    color: ${props => props.theme.gray200};
  }
`;

const Comment = styled.div`
  min-width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: ${props => props.theme.sub};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px;
  font-size: 0.75em;
`;
