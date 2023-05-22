import styled from "styled-components";
import CustomCourse from "../common/CustomCourse.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Dashbord() {
  // CustomCourse 서버 열리면 item={} 으로 받아온 학습정보 넣어주기

  // 컨텐츠 진행률과 학습 여부 불러오기

  return (
    <>
      <CourseBox>
        <CustomCourse feat="progress" />
        <CustomCourse feat="progress" />
        <CustomCourse feat="progress" />
        <CustomCourse feat="progress" />
        <CustomCourse feat="progress" />
        <CustomCourse feat="progress" />
      </CourseBox>
    </>
  );
}
const CourseBox = styled.article`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 30px;
  @media ${props => props.theme.mediaQuery.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
