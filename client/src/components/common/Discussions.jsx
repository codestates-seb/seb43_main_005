import styled from "styled-components";
import { useNavigate } from "react-router-dom";
export default function Discusstions({ body }) {
  let title = body.title;
  let createdAt = body.createdAt.slice(0, 10);
  let view = body.view;
  let commentCount = body.commentCount;
  let id = body.id;
  const navigate = useNavigate();
  return (
    <StyledDiscusstions>
      <BodyContainer>
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
