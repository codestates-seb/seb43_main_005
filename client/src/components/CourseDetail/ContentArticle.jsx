import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CustomButton from "../common/CustomButton.jsx";
import useModal from "../../hooks/useModal.js";
import Dialog from "../common/Dialog.jsx";
import { getData, updateData } from "../../api/apiUtil.js";
import Alert from "../common/Alert.jsx";
import Loading from "../common/Loading.jsx";
import { useLocation } from "react-router-dom";

export default function ContentArticle({ courseId, learnChecks }) {
  // admin
  const { userRole } = useSelector(state => state.user);
  const admin = userRole === "ADMIN";
  const [dialog, openDialog, closeDialog] = useModal();
  // item
  const [index, setIndex] = useState(0);
  const { length } = learnChecks;
  const { learnId, learnCheckId } = learnChecks[index];
  const apiUrl = `/contents/${courseId}/learns/${learnId}`;
  const editPath = `/admin/edit/course/${courseId}/content/${learnId}`;
  const [item, setItem] = useState(null);
  // Next button
  const [text, setText] = useState("다음");
  // Error
  const [error, openError, closeError] = useModal();

  // ! Get 학습데이터
  const sliceData = async () => {
    try {
      const { result } = await getData(apiUrl);
      setItem(result);
    } catch {
      openError();
    }
  };
  useEffect(() => {
    sliceData();
    if (index === length - 1) setText("학습완료");
  }, [index]);

  // ! Post LearnCheck
  const postLearnCheck = async data => {
    updateData(data, `${apiUrl}/learnCheck/${learnCheckId}`, "patch");
  };

  // ! handleNext
  const handleNext = () => {
    postLearnCheck({ completed: true });
    if (text === "학습완료") return;
    if (index < length) {
      setIndex(prev => prev + 1);
    }
  };

  // ! error 처리
  if (!item) return <Loading />;
  if (error) return <Alert closeAlert={closeError} />;
  return (
    <ContentWrap>
      <Content>
        <h1>{item?.title}</h1>
        <span dangerouslySetInnerHTML={{ __html: item?.content }} />
      </Content>
      <ButtonWrap>
        <CustomButton text={text} feat="tag" onClick={handleNext} />
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
      </ButtonWrap>

      {dialog && (
        <Dialog
          feat="삭제하기"
          path={apiUrl}
          text={["게시을 삭제하시겠습니까?"]}
          closeDialog={closeDialog}
        />
      )}
    </ContentWrap>
  );
}
const ContentWrap = styled.div`
  padding: 30px 10px;
  max-width: 1027px;
  width: 90%;
  margin: 0 auto;
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
const Content = styled.div`
  min-height: calc(100vh - 210px);
`;
const ButtonWrap = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;
const AdminWrap = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;
