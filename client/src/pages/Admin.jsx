import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import CustomButton from "../components/common/CustomButton.jsx";
import CustomCourse from "../components/common/CustomCourse.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteData, getData } from "../api/apiUtil.js";
import Empty from "../components/common/Empty.jsx";
import useModal from "../hooks/useModal.js";
import Dialog from "../components/common/Dialog.jsx";

export default function Admin() {
  const { state } = useLocation();
  const item = state?.item;
  const id = item?.contentId;
  const [contents, setContents] = useState(null);
  const [quizzes, setQuizzes] = useState(null);
  const [dialog, openDialog, closeDialog] = useModal();

  // ! get
  const sliceData = async path => {
    const { result } = await getData(`/contents/${id}/${path}`);
    const { content } = result;
    if (path === "quizzes") {
      setQuizzes(...content);
    } else {
      setContents(content);
    }
  };
  useEffect(() => {
    sliceData("learns");
    sliceData("quizzes");
  }, []);

  return (
    <PageContainer>
      <Container>
        <CourseWrap>
          <BtnGroup>
            <CustomButton
              text="강의 수정"
              feat="round"
              reverse
              path={`/admin/edit/course/${id}`}
              item={item}
            />
            <CustomButton text="강의 삭제" feat="round" onClick={openDialog} />
          </BtnGroup>
          <CustomCourse feat="admin" item={item} />
        </CourseWrap>
        <ContentsWrap>
          <BtnGroup className="btnGroup">
            <CustomButton
              text="학습등록"
              feat="round"
              path={`/admin/write/course/${id}/content`}
            />
            <CustomButton
              text="퀴즈 등록"
              feat="round"
              reverse
              path={`/admin/write/course/${id}/quiz`}
            />
          </BtnGroup>
          {contents?.length || quizzes ? (
            <Contents>
              {contents?.map(content => (
                <li key={content.learnId}>
                  <Link to={`/course/${id}`}>{content.title}</Link>
                </li>
              ))}

              {quizzes && (
                <li>
                  <Link to={`/course/${id}`}> OX 퀴즈</Link>
                </li>
              )}
            </Contents>
          ) : (
            <Contents as="div" className="empty">
              <Empty />
            </Contents>
          )}
        </ContentsWrap>
      </Container>
      {dialog && (
        <Dialog
          feat="삭제하기"
          path={`/contents/${id}`}
          text={["강의를 삭제하시겠습니까?"]}
          closeDialog={closeDialog}
        />
      )}
    </PageContainer>
  );
}

const Container = styled.div`
  display: grid;
  @media ${({ theme }) => theme.mediaQuery.desktop} {
    display: flex;
    justify-content: space-between;
  }
`;
const BtnGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  &.btnGroup {
    flex-direction: row-reverse;
  }
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    &.btnGroup {
      flex-direction: row;
    }
  }
`;
const CourseWrap = styled.article`
  max-width: 500px;
  width: 100%;
  @media ${({ theme }) => theme.mediaQuery.desktop} {
    width: 41%;
  }
`;
const ContentsWrap = styled.article`
  width: 100%;
  @media ${({ theme }) => theme.mediaQuery.desktop} {
    width: 53%;
    display: flex;
    flex-direction: column;
  }
  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin-top: 30px;
  }
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    margin-top: 60px;
  }
`;
const Contents = styled.ul`
  background-color: ${({ theme }) => theme.color.white};
  border: ${({ theme }) => theme.color.borderBold};
  border-radius: 20px;
  li {
    display: block;
    padding: 15px;
    font-size: 0.875em;
    a {
      color: ${({ theme }) => theme.color.text};
      &:hover {
        color: ${({ theme }) => theme.color.main};
        text-decoration: underline;
      }
    }
  }
  li:not(:last-of-type) {
    border-bottom: ${({ theme }) => theme.color.borderLight};
  }
  &.empty {
    display: flex;
    min-height: 250px;
    align-items: center;
    justify-content: center;
  }
`;
