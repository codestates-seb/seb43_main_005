import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import CustomButton from "../components/common/CustomButton.jsx";
import CustomCourse from "../components/common/CustomCourse.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteData, getData } from "../api/apiUtil.js";

export default function Admin() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const item = state?.item;
  const id = item?.contentId;
  const [contents, setContents] = useState(null);
  const [quizzes, setQuizzes] = useState(null);

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

  // ! delete
  const deleteCourse = async () => {
    await deleteData(`/contents/${id}`);
    navigate("/");
  };

  return (
    <PageContainer>
      <Container>
        <CourseWrap>
          <BtnGroup>
            <CustomButton
              text="코스 수정"
              feat="round"
              reverse
              path={`/admin/edit/course/${id}`}
              item={item}
            />
            <CustomButton
              text="코스 삭제"
              feat="round"
              onClick={deleteCourse}
            />
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
                  <Link to={`/course/${id}/learn`}>{content.title}</Link>
                </li>
              ))}

              {quizzes && (
                <li>
                  <Link to={`/course/${id}/learn`}> OX 퀴즈</Link>
                </li>
              )}
            </Contents>
          ) : (
            <Contents as="div" className="empty">
              데이터가 없습니다
            </Contents>
          )}
        </ContentsWrap>
      </Container>
    </PageContainer>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BtnGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  &.btnGroup {
    flex-direction: row-reverse;
  }
`;
const CourseWrap = styled.article`
  width: 41%;
`;
const ContentsWrap = styled.article`
  width: 53%;
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
