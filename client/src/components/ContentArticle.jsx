import React from "react";
import styled from "styled-components";
import CustomButton from "./common/CustomButton.jsx";
import { useParams } from "react-router-dom";
import useModal from "../hooks/useModal.js";
import Dialog from "../components/common/Dialog.jsx";

export default function ContentArticle({ item }) {
  const admin = true; // 임시 변수
  const { id } = useParams();
  const editPath = `/admin/edit/course/${id}/content/${item?.learnId}`;
  const deletePath = `/contents/${id}/learns/${item?.learnId}`;
  const [dialog, openDialog, closeDialog] = useModal();

  // quiz Test
  const quiz = true;
  const quizEditPath = `/admin/edit/course/${id}/quiz/${item?.quizId}`;
  const quizDeletePath = `/contents/${id}/quizzes/${item?.quizId}`;

  return (
    <ContentWrap>
      <h1>{item?.title}</h1>

      <span dangerouslySetInnerHTML={{ __html: item?.content }} />
      {admin && (
        <AdminWrap>
          <CustomButton
            text="게시글 수정"
            feat="tag"
            mode="patch"
            path={editPath}
            item={item}
            reverse
          />
          <CustomButton text="게시글 삭제" feat="tag" onClick={openDialog} />
        </AdminWrap>
      )}
      {dialog && (
        <Dialog
          feat="삭제하기"
          path={deletePath}
          // path={quizDeletePath}
          text={["게시을 삭제하시겠습니까?"]}
          closeDialog={closeDialog}
        />
      )}
      {quiz && (
        <AdminWrap>
          <CustomButton
            text="퀴즈 수정"
            feat="tag"
            mode="patch"
            path={quizEditPath}
            item={item}
          />
          <CustomButton text="게시글 삭제" feat="tag" onClick={openDialog} />
        </AdminWrap>
      )}
    </ContentWrap>
  );
}
const ContentWrap = styled.div`
  max-width: 1020px;
  width: 90%;
  margin: 0 auto;
  padding-top: 70px;
  h1 {
    font-size: 2.3em;
  }
  h2 {
    font-size: 1.8em;
    margin: 20px 0;
  }
  h3 {
    font-size: 1.3em;
    margin: 20px 0;
  }
  p {
    font-size: 1em;
    line-height: 1.5em;
  }
  a {
    color: ${({ theme }) => theme.color.blue};
    text-decoration: underline;
  }
  img {
    max-width: 100%;
  }
`;
const AdminWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;
