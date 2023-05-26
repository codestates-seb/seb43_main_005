import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../common/ProfileImage.jsx";

export default function MyDebateComments({ body }) {
  let title = body.articleTitle;
  let createdAt = body.createdAt.slice(0, 10);
  let like = body.like;
  let content = body.content;
  let id = body.articleId;
  let userProfileImage = body.member.profileImage;

  const navigate = useNavigate();
  return (
    <StyledDiscusstions>
      <ProfileImage profileImg={userProfileImage} feat="mycomment" />
      <Body>
        <div
          onClick={() => {
            navigate(`/discussion/${id}`);
          }}
          aria-hidden="true">
          {title}
        </div>
        <span dangerouslySetInnerHTML={{ __html: content }} />
        <p className="gray">
          {createdAt} | 좋아요 {like}
        </p>
      </Body>
    </StyledDiscusstions>
  );
}

const StyledDiscusstions = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 100px;
  margin: 10px 0px;
  background-color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.black};
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
    margin-top: 4px;
    margin-bottom: 18px;
  }
  p {
    color: ${props => props.theme.text};
  }
  p .gray {
    color: ${props => props.theme.gray100};
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
