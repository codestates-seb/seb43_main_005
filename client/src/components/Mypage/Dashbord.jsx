import styled from "styled-components";
import CustomCourse from "../common/CustomCourse.jsx";

export default function Dashbord() {
  // 유저ID 가 한번이라도 수강한 강의 목록, 학습 진도 불러오기 - 토큰으로 겟
  // CustomCourse 매핑
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
  grid-template-columns: repeat(3, minmax(450px, 1fr));
  grid-gap: 20px;
`;
