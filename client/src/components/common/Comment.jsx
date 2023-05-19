import styled, { css } from "styled-components";
import Tool from "../../assets/images/Tool.svg";
import Good from "../../assets/images/good.svg";
import { useState } from "react";
// commentBody 데이터
// profile 프로필 사진
// twoline : content 보이게 할건지
// feat : Tool, count, like 있음
export default function Comment({
  commentBody,
  profile,
  twoline,
  feat,
  DeleteComment,
}) {
  const [dropdown, setDropdown] = useState(false);
  let nikeName = commentBody.member.nickName;
  let content = commentBody.content;
  let createdAt =
    commentBody.createdAt.slice(0, 10) +
    " " +
    commentBody.createdAt.slice(11, 16);
  let likeCount = commentBody.like;
  let commentId = commentBody.articleCommentId;
  let profileImg = commentBody.member.profileImage;
  return (
    <CommentContainer>
      {/* 프로필 나중에 서버에서 받아와서 만들자 */}
      <Profile profile={profile} src={profileImg} />
      <Body twoline={twoline}>
        <div dangerouslySetInnerHTML={{ __html: nikeName }} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <div dangerouslySetInnerHTML={{ __html: createdAt }} />
      </Body>
      {feat === "tool" && (
        <Side feat={feat}>
          <img
            src={Tool}
            alt="CommentTool"
            aria-hidden="true"
            onClick={() => {
              setDropdown(prev => !prev);
            }}
          />
          {dropdown && (
            <Modal>
              <li onClick={() => DeleteComment(commentId)} aria-hidden="true">
                삭제하기
              </li>
              <li>수정하기</li>
            </Modal>
          )}
          <div>
            <img src={Good} alt="good" /> {likeCount}
          </div>
        </Side>
      )}
      {feat === "count" && <Count>{likeCount}</Count>}
      {feat === "like" && (
        <Count>
          <img src={Good} alt="good" /> 12
        </Count>
      )}
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  display: flex;
  max-width: 100%;
  height: 120px;
  border-bottom: solid 1px ${({ theme }) => theme.color.gray100};
  background-color: ${({ theme }) => theme.color.white};
  margin: 30px;
`;

const Profile = styled.img`
  width: 55px;
  height: 55px;
  margin-right: 15px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.black};
  /* 나중에 이미지가 내려온다면 프로필 뜨게하는걸로 바꾸자. */
  ${({ profile }) =>
    profile === "false" &&
    css`
      display:none;
      }
    `}
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  margin-bottom: 40px;

  & > :nth-last-child(1) {
    color: ${({ theme }) => theme.color.gray100};
  }

  ${({ twoline }) =>
    twoline === "true" &&
    css`
      justify-content: space-around;
      & > :nth-child(2) {
        display: none;
      }
    `}
`;

const Side = styled.div`
  position: relative;
  margin-bottom: 40px;
  img {
    cursor: pointer;
  }

  div {
    margin-top: 30px;
  }
`;

const Modal = styled.ul`
  position: absolute;
  right: 20px;
  top: 30px;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 90px;
  height: 45px;
  border-radius: 10px;
  border: 0.5px solid ${({ theme }) => theme.color.gray100};
  box-shadow: 0 1px 12px 0 rgb(0 0 0 / 6%);
  padding: 10px;
  text-align: center;
  z-index: 1;

  & > :nth-child(1),
  & > :nth-child(2) {
    cursor: pointer;
    list-style: none;

    :hover {
      background-color: ${({ theme }) => theme.color.gray50};
      text-decoration: underline;
    }
  }
`;

const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: solid 1px ${props => props.theme.color.black};
  background-color: ${props => props.theme.color.sub};
  margin-top: 20px;
`;
