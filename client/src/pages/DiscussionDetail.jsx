import React from "react";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import CustomButton from "../components/common/CustomButton.jsx";
import Comment from "../components/Discusstion/Comment.jsx";
export default function DiscussionDetail() {
  return (
    <PageContainer>
      <h2>Discussion</h2>
      <Bar>
        {/* 어드민만 보이도록 */}
        <CustomButton text="토론글 수정" feat="round" reverse="true" />
        <CustomButton text="토론글 삭제" feat="round" />
      </Bar>
      <Subject>
        <div>title</div>
        <div>body</div>
      </Subject>
      {/* 탭으로 만들어야한다. 누르면 색깔 변하게 */}
      <CommitBar>
        <div>댓글 3</div>
        <button>등록순</button>
        <button>최신순</button>
        <button>추천순</button>
      </CommitBar>
      <Comments>
        <Comment profile="true" feat="count" />
        <Comment profile="false" />
        <Comment profile="true" twoline="true" />
        <Comment profile="false" twoline="true" feat="tool" />
        <Comment profile="false" twoline="true" feat="count" />
        <Comment profile="false" twoline="true" feat="like" />
        <CommentInput>
          <textarea
            maxLength="200"
            placeholder="댓글을 입력하세요."
            type="text"></textarea>
          <div>댓글등록</div>
        </CommentInput>
      </Comments>
      <MoveList>
        <CustomButton text="목록보기" feat="round" path="/discussion" />
      </MoveList>
    </PageContainer>
  );
}

const Bar = styled.div`
  display: flex;
`;

const Subject = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.white};
  margin: 30px 0px;
  border-radius: 10px;
  border: solid 1px ${({ theme }) => theme.color.black};

  & > :nth-child(1) {
    padding: 30px;
    height: 100px;
  }

  & > :nth-child(2) {
    border-top: solid 1px ${({ theme }) => theme.color.black};
    padding: 30px;
    min-height: 150px;
    word-break: break-all;
  }
`;

const CommitBar = styled.div`
  display: flex;

  div {
    margin-right: 20px;
  }
  & > :nth-child(3) {
    ::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 8px;
      margin-right: 10px;
      border-right: 1px solid ${props => props.theme.color.gray100};
    }
    ::after {
      content: "";
      display: inline-block;
      width: 10px;
      height: 8px;
      margin-right: 10px;
      border-right: 1px solid ${props => props.theme.color.gray100};
    }
  }
`;

const Comments = styled.div`
  margin-top: 15px;
  margin-bottom: 50px;
  border-radius: 10px;
  border: solid 1px ${({ theme }) => theme.color.gray100};
  background-color: ${({ theme }) => theme.color.white};
`;

const CommentInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 50px;
  margin: 30px;
  padding: 20px;
  border: solid 1px ${({ theme }) => theme.color.gray100};
  border-radius: 10px;
  textarea {
    flex-grow: 1;
    border: none;
    // input 눌렀을 떄 테두리 제거
    :focus {
      outline: none;
    }
  }
  div {
    color: ${({ theme }) => theme.color.mainHover};
    text-align: right;
  }
`;

const MoveList = styled.div`
  text-align: right;
`;
