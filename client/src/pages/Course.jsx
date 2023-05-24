import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { getData } from "../api/apiUtil.js";
import useInput from "../hooks/useInput.js";
import PageContainer from "../components/common/PageContainer.jsx";
import CustomButton from "../components/common/CustomButton.jsx";
import CustomCourse from "../components/common/CustomCourse.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import Empty from "../components/common/Empty.jsx";
import Pagination from "../components/common/Pagination.jsx";

export default function Course() {
  const { userRole } = useSelector(state => state.user);
  const admin = userRole === "ADMIN";
  const [courses, setCourses] = useState(null);
  const [totalCourse, setTotalCourse] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // ! get 로직 (pagenation)
  const sliceData = async () => {
    const { result } = await getData(`/contents?size=9&page=${page}`);
    const { content, totalPages, totalElements } = result;
    setCourses(content);
    setTotalCourse(totalElements);
    setTotalPages(totalPages);
  };
  useEffect(() => {
    sliceData();
  }, [page]);

  // ! sorted 로직
  const [selected, setSelected] = useState("old");
  const handleSorted = sort => {
    setSelected(sort);
  };
  useEffect(() => {
    const copyCourse = courses?.slice();
    const sortedCourse =
      selected === "old"
        ? copyCourse?.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        : copyCourse?.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
    courses && setCourses(sortedCourse);
  }, [selected]);

  // ! search 로직
  const [searchValue, searchReset] = useInput("");
  const handleSearch = async e => {
    const { result } = await getData(`/contents`);
    const { content } = result;
    e.preventDefault();
    console.log(searchValue.value);
    const searchCourse = content.filter(el =>
      el.title.toUpperCase().includes(searchValue.value.toUpperCase())
    );
    setCourses(searchCourse);
    searchReset();
  };

  return (
    <PageContainer>
      <h2>Roadmap</h2>
      <TopGroup onSubmit={handleSearch}>
        <Sorted>
          <CustomButton
            type="button"
            text="등록순"
            onClick={e => handleSorted("old")}
            feat="round"
            reverse={selected === "old"}
          />
          {/* <CustomButton
            type="button"
            text="최신순"
            onClick={e => handleSorted("recent")}
            feat="round"
            reverse={selected === "recent"}
          /> */}
        </Sorted>
        <SearchBar value={searchValue} />
      </TopGroup>
      <CourseContainer>
        {courses?.map(course => (
          <CustomCourse key={course.contentId} item={course} />
        ))}
      </CourseContainer>
      {!!totalCourse && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
      <BottomGroup totalCourse={totalCourse}>
        {!totalCourse && <Empty />}
        {admin && <CustomButton text="강의 등록" path="/admin/write/course" />}
      </BottomGroup>
    </PageContainer>
  );
}

const TopGroup = styled.form`
  display: flex;
  margin-bottom: 50px;
`;
const Sorted = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 15px;
`;
// top group

const CourseContainer = styled.article`
  display: grid;

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 15px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    grid-template-columns: unset;
    gap: 40px;
  }
`;
// content

const BottomGroup = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: row-reverse;
  ${({ totalCourse }) =>
    !totalCourse &&
    css`
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding-top: 50px;
      button {
        margin-top: 15px;
      }
    `}
`;
