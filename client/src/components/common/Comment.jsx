import styled, { css } from "styled-components";
// eslint-disable-next-line import/no-unresolved
import Tool from "../../assets/images/Tool.svg";
import Good from "../../assets/images/good.svg";
import { useState } from "react";

// commentBody 데이터
// profile 프로필 사진
// twoline : content 보이게 할건지
// feat : Tool, count, like 있음
export default function Comment({ commentBody, profile, twoline, feat }) {
  const [dropdown, setDropdown] = useState(false);
  let nikeName = commentBody.member.nickName;
  let content = commentBody.content;
  let createdAt = commentBody.createdAt.slice(0, 10);
  let likeCount = commentBody.like;

  return (
    <CommentContainer>
      {/* 프로필 나중에 서버에서 받아와서 만들자 */}
      <Profile profile={profile} />
      <Body twoline={twoline}>
        <div>{nikeName}</div>
        <div>{content}</div>
        <div>{createdAt}</div>
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
              <li>수정하기</li>
              <li>삭제하기</li>
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
  border-bottom: solid 1px ${({ theme }) => theme.gray100};
  background-color: ${({ theme }) => theme.white};
  margin: 30px;
`;

const Profile = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.black};
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
    color: ${({ theme }) => theme.gray100};
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
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 90px;
  height: 45px;
  border-radius: 10px;
  border: solid 1px ${({ theme }) => theme.gray100};
  padding: 10px 0px 10px 30px;
  // 상단에 뜨게하기
  z-index: 1;
  /* transform: translate(-50%, -50%); */
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
