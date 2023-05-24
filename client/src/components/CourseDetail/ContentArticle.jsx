import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../common/CustomButton.jsx";
import useModal from "../../hooks/useModal.js";
import Dialog from "../common/Dialog.jsx";
import { getData, updateData } from "../../api/apiUtil.js";
import Alert from "../common/Alert.jsx";
import Loading from "../common/Loading.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  setLearnId,
  setLearnIndex,
} from "../../redux/features/user/learnSlice.js";

export default function ContentArticle({ courseId, learnChecks }) {
  // item
  const { learnId, learnIndex, learnContent } = useSelector(
    state => state.learn
  );
  // admin
  const { userRole } = useSelector(state => state.user);
  const admin = userRole === "ADMIN";
  const [dialog, openDialog, closeDialog] = useModal();
  const apiUrl = `/contents/${courseId}/learns/${learnId}`;
  const editPath = `/admin/edit/course/${courseId}/content/${learnId}`;

  // ! Next button
  const [text, setText] = useState("다음");
  let nextLearId = learnChecks && learnChecks[learnIndex + 1]?.learnId;
  useEffect(() => {
    nextLearId ? setText("다음") : setText("학습완료");
  }, [learnId]);

  // ! handleNext
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const learnCheckId = learnChecks && learnChecks[learnIndex]?.learnCheckId;
  const handleNext = async () => {
    // Common 완료체크
    const updateUrl = `/contents/${courseId}/learns/${learnId}/learnChecks/${learnCheckId}`;
    await updateData({ completed: true }, updateUrl, "patch");
    // 마지막 페이지
    if (text === "학습완료" || !nextLearId) return;
    // 다음 학습으로 이동
    dispatch(setLearnIndex(learnIndex + 1));
    dispatch(setLearnId(nextLearId));
    const pathLearnUrl = `/course/${courseId}/learn/${nextLearId}`;
    navigate(pathLearnUrl);
  };

  return (
    <ContentWrap>
      <Content>
        <h1>{learnContent?.title}</h1>
        <span dangerouslySetInnerHTML={{ __html: learnContent?.content }} />
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
              item={learnContent}
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
          id={courseId}
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
