import styled from "styled-components";
import CustomCourse from "../common/CustomCourse.jsx";
import { useEffect, useState } from "react";
import { getData } from "../../api/apiUtil.js";

export default function Dashbord() {
  // CustomCourse 에 item={} 으로 받아온 학습정보 넣어주기
  const [contentList, setContentList] = useState([]);

  // GET - 컨텐츠 진행률 전체 조회
  const getProgress = async () => {
    const { result } = await getData(`/contents/progress`);
    // console.log(`getProgress`);
    const { content, pageable, sort, totalElements, totalPages } = result;
    // console.log(content);
    setContentList(content);
  };

  useEffect(() => {
    getProgress();
  }, []);

  // 콘텐츠리스트 progress, 내용 매핑 => body에 넣어서 item 으로 내려주기

  return (
    <>
      <CourseBox>
        {contentList.map((el, idx) => (
          <CustomCourse
            key={idx}
            feat="progress"
            item={el.content}
            progress={el.progress}
          />
        ))}
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
