import styled, { css } from "styled-components";
// eslint-disable-next-line import/no-unresolved
import Tool from "../../assets/images/Tool.svg";
import Good from "../../assets/images/good.svg";
import { useState } from "react";

// 죄측에 프로필 사진이 뜨게하는 유무
// 상단 중단 하단 글 뜨게하는거 2개 or 3개
// 하단은 흐리게 하게 해야됨
// 우측엔 댓글 또는 추천 수 뜨게하거나 수정하기 버튼나오게하거나 굳추천수 나오게하거나
// function SettingTool() {
//   return (

//   );
// }

export default function Comment({ profile, twoline }) {
  const [dropdown, setDropdown] = useState(false);
  return (
    <CommentContainer>
      {/* 프로필 나중에 서버에서 받아와서 만들자 */}
      <Profile profile={profile} />
      <Body twoline={twoline}>
        <div>최상단!!!</div>
        <div>중단!!!!!</div>
        <div>2023.07.20</div>
      </Body>

      <Side>
        {/* img 추가하면 왜 커짐? */}
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
          <img src={Good} alt="good" /> 34
        </div>
      </Side>
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  display: flex;
  height: 120px;
  border-bottom: solid 1px ${({ theme }) => theme.color.gray100};
  background-color: ${({ theme }) => theme.color.white};
  margin: 30px;
`;

const Profile = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 50%;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;
  img {
    cursor: pointer;
  }
`;

const Modal = styled.ul`
  position: absolute;
  right: 20px;
  top: 40px;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 90px;
  height: 45px;
  border-radius: 10px;
  border: solid 1px ${({ theme }) => theme.color.gray100};
  padding: 10px 0px 10px 30px;
  // 상단에 뜨게하기
  z-index: 1;
  /* transform: translate(-50%, -50%); */
`;
