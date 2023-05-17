import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { getData } from "../api/apiUtil.js";
import useInput from "../hooks/useInput.js";
import PageContainer from "../components/common/PageContainer.jsx";
import CustomButton from "../components/common/CustomButton.jsx";
import CustomCourse from "../components/common/CustomCourse.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import Empty from "../components/common/Empty.jsx";

export default function Course() {
  const admin = true;
  // 임시변수
  const [searchValue, searchReset] = useInput("");
  const [courses, setCourses] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCourse, setTotalCourse] = useState(0);

  // ! get 로직
  const sliceData = async () => {
    const { result } = await getData("/contents?size=20&page=0");
    const { content, totalPage, totalElements } = result;
    setCourses(content);
    setTotalCourse(totalElements);
    setTotalPage(totalPage);
  };
  useEffect(() => {
    sliceData();
  }, []);

  // ! sorted 로직
  const [selected, setSelected] = useState("default");
  const handleSorted = sort => {
    setSelected(sort);
  };

  // ! search 로직
  const handleSearch = e => {
    e.preventDefault();
    console.log(searchValue.value);
  };

  return (
    <PageContainer>
      <h2>Roadmap</h2>
      <TopGroup onSubmit={handleSearch}>
        <Sorted>
          <CustomButton
            type="button"
            text="최신순"
            onClick={e => handleSorted("default")}
            feat="round"
            reverse={selected === "default"}
          />
          <CustomButton
            type="button"
            text="등록순"
            onClick={e => handleSorted("old")}
            feat="round"
            reverse={selected === "old"}
          />
        </Sorted>
        <SearchBar value={searchValue} />
      </TopGroup>
      <CourseContainer>
        {courses?.map(course => (
          <CustomCourse key={course.contentId} item={course} />
        ))}
      </CourseContainer>
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
