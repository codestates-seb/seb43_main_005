import styled from "styled-components";
import CustomCourse from "../common/CustomCourse.jsx";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getData } from "../../api/apiUtil.js";

export default function Dashbord() {
  // CustomCourse 에 item={} 으로 받아온 학습정보 넣어주기
  const [contentList, setContentList] = useState(null);
  const [body, setBody] = useState({});
  const [progress, setProgress] = useState(0);
  const [contentId, setContentId] = useState(1);
  // console.log(contentList);

  // GET - 컨텐츠 진행률 전체 조회
  // /contents/progress
  const getProgress = async () => {
    const { result } = await getData(`/contents/progress`);
    console.log(`getProgress`);
    console.log(result);
    const { content, totalPages, totalElements } = result;
    const contentList = result.content;
    setContentList(contentList);
  };

  // GET - 학습 여부 전체 조회
  // getData(`/contents/${1}/learns/learnChecks`) -> contentId??
  const getStudied = async () => {
    await getData(`/contents/${contentId}/learns/learnChecks`)
      .then(res => {
        const content = res.result.content;
        console.log(`getStudied`);
        // console.log(content);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProgress();
    // getStudied();
  }, []);

  // 콘텐츠리스트 progress, 내용 매핑 => body에 넣어서 item 으로 내려주기
  const studiedContents = () => {
    // console.log(contentList);
    // contentList.map(el => {
    //   console.log(el);
    //   // 학습 정보
    //   const contentProgressId = el.contentProgressId;
    //   const contentImg = el.contentImg;
    //   const title = el.title;
    //   setBody({ contentProgressId, contentImg, title });
    //   // 진도율 정보
    //   setProgress(el.progress);
    // });
  };
  studiedContents();

  return (
    <>
      <CourseBox>
        {contentList.map(el => {
          console.log(el);
          <CustomCourse feat="progress" item={body} />;
        })}
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
