import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CustomButton from "./common/CustomButton.jsx";
import useModal from "../hooks/useModal.js";
import Dialog from "../components/common/Dialog.jsx";
import { getData } from "../api/apiUtil.js";

export default function ContentArticle({ id, item }) {
  const { userRole } = useSelector(state => state.user);
  const admin = userRole !== "ADMIN";
  const [dialog, openDialog, closeDialog] = useModal();

  // ! content API path
  const editPath = `/admin/edit/course/${id}/content/${item?.learnId}`;
  const deletePath = `/contents/${id}/learns/${item?.learnId}`;

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
    </ContentWrap>
  );
}
const ContentWrap = styled.div`
  padding-bottom: 30px;
  h1 {
    font-size: 2.3em;
    margin-bottom: 40px;
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
    color: ${({ theme }) => theme.blue};
    text-decoration: underline;
  }
  img {
    max-width: 100%;
  }
  blockquote {
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.disabeld};
    position: relative;
    line-height: 1.2em;
    &:before {
      content: "";
      display: block;
      width: 10px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: ${({ theme }) => theme.main};
    }
  }
  ul li {
    padding: 5px 0;
  }
  strong {
    font-family: "GmarketSansBold", cursive;
  }
`;
const AdminWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;
