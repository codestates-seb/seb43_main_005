import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import Card from "../components/Mypage/Card.jsx";

export default function EditMypage() {
  const teammateInfo = [
    {
      name: "김석현",
      nameENG: "SEOK HYEON",
      febe: "백엔드",
      febeENG: "BACK END",
      gitQR: "/", // 생략해주셔도 됩니다
      gitAddress: "https://github.com/Gonue",
      blogAddress: "",
      job: "BE 팀장",
      work: ["멤버", "토론", "보안", "인프라"],
    },
    {
      name: "윤지민",
      nameENG: "JI MIN",
      febe: "백엔드",
      febeENG: "FRONT END",
      gitQR: "https://ifh.cc/v-SshmJ9", // 생략해주셔도 됩니다
      gitAddress: "https://github.com/Yoon-JM",
      blogAddress: "https://wlals3591.tistory.com/",
      job: "BE 팀원",
      work: ["학습상세", "진행"],
    },
    {
      name: "이동근", //
      nameENG: "Cho Yong Ju",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: "/", // 생략해주셔도 됩니다
      gitAddress: "https://github.com/pizzaYami",
      blogAddress: "https://cho9407.tistory.com/",
      job: "FE 팀원",
      work: ["로그인", "회원가입", "토론", "토론상세"],
    },
    {
      name: "유채원",
      nameENG: "CHAE WON",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: "/", // 생략해주셔도 됩니다
      gitAddress: "https://github.com/ychae1997",
      blogAddress: "https://ychae1997.github.io/",
      job: "FE 팀장",
      work: ["디자인", "메인페이지", "어드민 CRUD", "학습", "공통컴포넌트"],
    },
    {
      name: "이현진",
      nameENG: "HYUN JIN",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: "/", // 생략해주셔도 됩니다
      gitAddress: "https://github.com/lhj5924",
      blogAddress: "https://velog.io/@lhj5924",
      job: "FE 팀원",
      work: ["마이페이지", "팀원 소개 페이지", "404오류 페이지"],
    },
    {
      name: "조용주",
      nameENG: "Cho Yong Ju",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: "/", // 생략해주셔도 됩니다
      gitAddress: "https://github.com/pizzaYami",
      blogAddress: "https://cho9407.tistory.com/",
      job: "FE 팀원",
      work: ["로그인", "회원가입", "토론", "토론상세"],
    },
    {
      name: "황설현",
      nameENG: "Hwang sul Hyeon",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: "/", // 생략해주셔도 됩니다
      gitAddress: "https://github.com/soulhn",
      blogAddress: "https://velog.io/@xxoixo",
      job: "FE 팀원",
      work: ["MBTI 테스트", "OX 퀴즈"],
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
