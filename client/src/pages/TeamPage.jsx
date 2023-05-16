import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import Card from "../components/Mypage/Card.jsx";

export default function EditMypage() {
  const teammateInfo = [
    {
      name: "유채원",
      nameENG: "CHAE WON",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: "/",
      gitAddress: "https://github.com/codestates-seb/seb43_main_005",
      blogAddress: "https://github.com/codestates-seb/seb43_main_005",
      job: "FE 팀장",
      // work: "디자인, 헤더, 푸터, 로딩, 메인페이지, Admin CRUD, 레벨업",
      work: ["디자인", "메인페이지"],
    },
    {
      name: "이현진",
      nameENG: "HYUN JIN",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: "/",
      gitAddress: "https://github.com/codestates-seb/seb43_main_005",
      blogAddress: "https://github.com/codestates-seb/seb43_main_005",
      job: "FE 팀원",
      work: ["마이페이지", "팀원소개페이지"],
    },
    {
      name: "3",
      nameENG: "HYUN JIN",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: "/",
      gitAddress: "https://github.com/codestates-seb/seb43_main_005",
      blogAddress: "https://github.com/codestates-seb/seb43_main_005",
      job: "FE 팀원",
      work: ["마이페이지", "팀원소개페이지"],
    },
    {
      name: "4",
      nameENG: "HYUN JIN",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: "/",
      gitAddress: "https://github.com/codestates-seb/seb43_main_005",
      blogAddress: "https://github.com/codestates-seb/seb43_main_005",
      job: "FE 팀원",
      work: ["마이페이지", "팀원소개페이지"],
    },
    {
      name: "5",
      nameENG: "HYUN JIN",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: "/",
      gitAddress: "https://github.com/codestates-seb/seb43_main_005",
      blogAddress: "https://github.com/codestates-seb/seb43_main_005",
      job: "FE 팀원",
      work: ["마이페이지", "팀원소개페이지"],
    },
    {
      name: "6",
      nameENG: "HYUN JIN",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: "/",
      gitAddress: "https://github.com/codestates-seb/seb43_main_005",
      blogAddress: "https://github.com/codestates-seb/seb43_main_005",
      job: "FE 팀원",
      work: ["마이페이지", "팀원소개페이지"],
    },
    {
      name: "7",
      nameENG: "HYUN JIN",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: "/",
      gitAddress: "https://github.com/codestates-seb/seb43_main_005",
      blogAddress: "https://github.com/codestates-seb/seb43_main_005",
      job: "FE 팀원",
      work: ["마이페이지", "팀원소개페이지"],
    },
  ];

  const mapping = teammateInfo.map(function (each, idx) {
    return <Card teammateInfo={each} key={idx} />;
  });
  return (
    <PageContainer>
      <MyContainer>{mapping}</MyContainer>
    </PageContainer>
  );
}

const MyContainer = styled.article`
  background-color: aliceblue;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  grid-template-rows: 4 minmax(300px, auto);
  grid-gap: 10px;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;
