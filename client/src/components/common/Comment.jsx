import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import Tool from "../../assets/images/Tool.svg";
import Like from "../../assets/images/Like.svg";
import noneLike from "../../assets/images/noneLike.svg";
import { updateData, deleteData } from "../../api/apiUtil.js";
// commentBody 데이터
// profile 프로필 사진
// twoline : content 보이게 할건지
// feat : Tool, count, like 있음
export default function Comment({ commentBody, profile, twoline, feat }) {
  const { id } = useParams();
  const [dropdown, setDropdown] = useState(false);
  const [like, setLike] = useState(noneLike);
  const [likeCount, setLikeCount] = useState(commentBody.like);
  let nikeName = commentBody.member.nickName;
  let content = commentBody.content;
  let createdAt =
    commentBody.createdAt.slice(0, 10) +
    " " +
    commentBody.createdAt.slice(11, 16);
  let commentId = commentBody.articleCommentId;
  let profileImg = commentBody.member.profileImage;
  function DeleteComment(articleCommentId) {
    deleteData(`/article/${id}/articleComments/${articleCommentId}`, "delete")
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  }

  function CommentLike(articleCommentId) {
    updateData({}, `articleComment/${articleCommentId}/likes`, "post")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }
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
          <ToolLike>
            <img
              src={like}
              alt="good"
              onClick={() => {
                if (like === noneLike) {
                  setLike(Like);
                  CommentLike(commentId);
                  setLikeCount(prevCount => prevCount + 1);
                } else {
                  setLike(noneLike);
                  setLikeCount(prevCount => prevCount - 1);
                }
              }}
              aria-hidden="true"
            />
            <div>{likeCount}</div>
          </ToolLike>
        </Side>
      )}
      {feat === "count" && <Count>{likeCount}</Count>}
      {feat === "like" && (
        <Count>
          <img src={Like} alt="good" /> 10
        </Count>
      )}
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  display: flex;
  max-width: 100%;
  height: 120px;
  border-bottom: solid 1px ${({ theme }) => theme.gray100};
  background-color: ${({ theme }) => theme.white};
  margin: 30px;
`;

const Profile = styled.img`
  width: 55px;
  height: 55px;
  margin-right: 15px;
  border-radius: 100%;
  border: solid 1px ${({ theme }) => theme.gray50};
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
    color: ${({ theme }) => theme.gray100};
  }

  & > :nth-child(2) {
    word-break: break-all;
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
  min-width: 40px;
  margin-left: 20px;
  img {
    cursor: pointer;
  }
`;

const Modal = styled.ul`
  position: absolute;
  right: 20px;
  top: 30px;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 90px;
  height: 45px;
  border-radius: 10px;
  border: 0.5px solid ${({ theme }) => theme.gray100};
  box-shadow: 0 1px 12px 0 rgb(0 0 0 / 6%);
  padding: 10px;
  text-align: center;
  z-index: 1;

  & > :nth-child(1),
  & > :nth-child(2) {
    cursor: pointer;
    list-style: none;

    :hover {
      background-color: ${({ theme }) => theme.gray50};
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
  border: solid 1px ${props => props.theme.black};
  background-color: ${props => props.theme.sub};
  margin-top: 20px;
`;

const ToolLike = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  & > :nth-child(2) {
    margin-top: 5px;
  }
`;
