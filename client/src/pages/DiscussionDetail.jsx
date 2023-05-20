import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import CustomButton from "../components/common/CustomButton.jsx";
import Comment from "../components/common/Comment.jsx";
import { getData, updateData } from "../api/apiUtil.js";
import useModal from "../hooks/useModal.js";
import Dialog from "../components/common/Dialog.jsx";

export default function DiscussionDetail() {
  const { userRole } = useSelector(state => state.user);
  const admin = userRole === "ADMIN";
  const [body, setBody] = useState([]);
  const [commentBody, setCommentBody] = useState([]);
  const [comment, setComment] = useState("");
  const [sortTool, setSortTool] = useState(1);
  const { id } = useParams();
  const [dialog, openDialog, closeDialog] = useModal();
  let data = { content: `<p>${comment}</p>` };
  useEffect(() => {
    getData(`article/${id}`)
      .then(data => {
        setBody(data.result);
      })
      .catch(error => {
        console.error(error);
      });
    getData(`article/${id}/articleComments`)
      .then(data => {
        setCommentBody(data.result.content);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  function CreactComment() {
    if (comment !== "") {
      updateData(data, `/article/${id}/articleComments`, "post")
        .then(res => {
          console.log(res);
          setComment("");
          window.location.reload();
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  function SortButton(sort) {
    getData(`article/${id}/articleComments?${sort}`)
      .then(data => {
        setCommentBody(data.result.content);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <PageContainer>
      <h2>Discussion</h2>

      {admin && (
        <Bar>
          <CustomButton
            text="토론글 수정"
            feat="round"
            reverse="true"
            path={`/admin/edit/article/${id}`}
            item={body}
          />
          <CustomButton text="토론글 삭제" feat="round" onClick={openDialog} />
          {dialog && (
            <Dialog
              feat="삭제하기"
              path={`/article/${id}`}
              // path={quizDeletePath}
              text={["토론글을 삭제하시겠습니까?"]}
              closeDialog={closeDialog}
            />
          )}
        </Bar>
      )}

      <Subject>
        <span dangerouslySetInnerHTML={{ __html: body.title }} />
        <span dangerouslySetInnerHTML={{ __html: body.content }} />
      </Subject>
      <CommitBar sortTool={sortTool}>
        <div>댓글 {body.commentCount}</div>
        <button
          onClick={() => {
            setSortTool(1);
            SortButton("");
          }}>
          작성순
        </button>
        <button
          onClick={() => {
            setSortTool(2);
            SortButton("sort=createdAt");
          }}>
          최신순
        </button>
        <button
          onClick={() => {
            setSortTool(3);
            SortButton("sort=likes");
          }}>
          추천순
        </button>
      </CommitBar>
      <Comments>
        {commentBody.map(item => {
          return (
            <Comment
              commentBody={item}
              profile="true"
              feat="tool"
              key={item.articleCommentId}
            />
          );
        })}
        <CommentInput>
          <textarea
            maxLength="200"
            placeholder="댓글을 입력하세요."
            type="text"
            onInput={e => {
              setComment(e.target.value);
            }}></textarea>
          <button onClick={CreactComment}>댓글등록</button>
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
  & > :nth-child(1) {
    margin-right: 15px;
  }
`;

const Subject = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.white};
  margin: 30px 0px;
  border-radius: 10px;
  border: solid 1px ${({ theme }) => theme.black};

  & > :nth-child(1) {
    font-size: 1.25em;
    padding: 30px;
    word-break: break-all;
  }

  & > :nth-child(2) {
    border-top: solid 1px ${({ theme }) => theme.black};
    padding: 30px;
    min-height: 100px;
    word-break: break-all;
  }
`;

const CommitBar = styled.div`
  display: flex;
  align-items: center;
  * {
    font-size: 1.25em;
  }
  div {
    margin-right: 20px;
  }

  & > :nth-child(2) {
    ${({ sortTool }) =>
      sortTool === 1 &&
      css`
        color: ${({ theme }) => theme.main};
        font-weight: bold;
      `};
  }

  & > :nth-child(3) {
    ${({ sortTool }) =>
      sortTool === 2 &&
      css`
        color: ${({ theme }) => theme.main};
        font-weight: bold;
      `};
    ::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 8px;
      margin-right: 10px;
      border-right: 1px solid ${props => props.theme.gray100};
    }
    ::after {
      content: "";
      display: inline-block;
      width: 10px;
      height: 8px;
      margin-right: 10px;
      border-right: 1px solid ${props => props.theme.gray100};
    }
  }
  & > :nth-child(4) {
    ${({ sortTool }) =>
      sortTool === 3 &&
      css`
        color: ${({ theme }) => theme.main};
        font-weight: bold;
      `};
  }
`;

const Comments = styled.div`
  margin-top: 15px;
  margin-bottom: 50px;
  border-radius: 10px;
  border: solid 1px ${({ theme }) => theme.gray100};
  background-color: ${({ theme }) => theme.white};
`;

const CommentInput = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 30px;
  margin: 30px;
  padding: 20px;
  border: solid 1px ${({ theme }) => theme.gray100};
  border-radius: 10px;
  textarea {
    width: 100%;
    border: none;
    resize: none;
    overflow: hidden;
    :focus {
      outline: none;
    }
  }
  button {
    color: ${({ theme }) => theme.mainHover};
    text-align: right;
  }
`;

const MoveList = styled.div`
  text-align: right;
`;
