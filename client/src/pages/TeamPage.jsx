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
      imgURL:
        "https://file.notion.so/f/s/0e60aca2-85e2-4426-9532-108cf57cd25c/%E1%84%81%E1%85%A9%E1%84%87%E1%85%AE%E1%84%80%E1%85%B5.jpeg?id=b1809117-1a14-4de3-beaa-7eccb6fa2c02&table=block&spaceId=82d63a72-8254-4cde-bf1e-b2597b7c099c&expirationTimestamp=1684983501593&signature=-Eha21Yup2tglH2ExwwkaehoFstaZuKeqzvuLG5VlS0&downloadName=%E1%84%81%E1%85%A9%E1%84%87%E1%85%AE%E1%84%80%E1%85%B5.jpeg",
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
      imgURL:
        "https://s3.orbi.kr/data/file/united/251cc0d1434cc0aed00afe93082bb25a.jpeg",
    },
    {
      name: "이동근",
      nameENG: "DONG KEUN",
      febe: "백엔드",
      febeENG: "BACK END",
      gitQR: "/", // 생략해주셔도 됩니다
      gitAddress: "https://github.com/stge35",
      blogAddress: "",
      job: "BE 팀원",
      work: ["OX퀴즈", "OX결과"],
      imgURL:
        "https://file.notion.so/f/s/cced3b8b-bf23-4b8b-9ff3-56f1ac89b7f3/pngwing.com.png?id=58d3b831-1d7a-4ed6-9357-74c603dd7b16&table=block&spaceId=82d63a72-8254-4cde-bf1e-b2597b7c099c&expirationTimestamp=1684994589768&signature=1BLuO13gxLLq3Idj_jXe0dVeUfTrNTqgvniEqFKupCs&downloadName=pngwing.com.png",
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
      imgURL:
        "https://file.notion.so/f/s/0137561b-f62c-48ee-9806-03356b5f2e7d/%E1%84%86%E1%85%A6%E1%84%90%E1%85%A1%E1%84%86%E1%85%A9%E1%86%BC.webp?id=a1cf994b-329d-467e-ae0e-c02da0fe439b&table=block&spaceId=82d63a72-8254-4cde-bf1e-b2597b7c099c&expirationTimestamp=1684994606117&signature=J_AZ6Cwo9uurq-rHetUW7S-728u2_AAjZQhSN8Jm-lA&downloadName=%E1%84%86%E1%85%A6%E1%84%90%E1%85%A1%E1%84%86%E1%85%A9%E1%86%BC.webp",
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
      imgURL:
        "https://scontent-lax3-1.xx.fbcdn.net/v/t31.18172-8/11236475_1094175240594869_7891370429642893989_o.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9267fe&_nc_ohc=iPHkV1KZ_ugAX8NS_bx&_nc_ht=scontent-lax3-1.xx&oh=00_AfALLjW8gvq1J8aPhrGzujh0UDLVgYvAPmxgs0nToQPWHA&oe=64956469",
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
      imgURL:
        "https://file.notion.so/f/s/73ee2a63-535d-468e-8dc3-d6a2d848b817/%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%85%E1%85%B5.jpeg?id=a88894b3-9c24-4432-8a66-2634f1c05c53&table=block&spaceId=82d63a72-8254-4cde-bf1e-b2597b7c099c&expirationTimestamp=1684994627950&signature=v7ct09MdsY1VHdcKk7vsz5JMMdFZD3OtUuFXCNu7f4c&downloadName=%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%85%E1%85%B5.jpeg",
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
      imgURL:
        "https://file.notion.so/f/s/e239b463-5300-4e7d-a740-26bcfed93a6b/pangpang.jpeg?id=5eade385-347f-496f-9f25-3259202b84eb&table=block&spaceId=82d63a72-8254-4cde-bf1e-b2597b7c099c&expirationTimestamp=1684994639475&signature=JswR0saGmyvpQIaojP9GdF9l5x3UbtPK3FXk_VnLTOE&downloadName=pangpang.jpeg",
    },
  ];

  return (
    <PageContainer>
      <MyContainer>
        {teammateInfo.map(function (each, idx) {
          return <Card teammateInfo={each} key={idx} />;
        })}
      </MyContainer>
    </PageContainer>
  );
}

const MyContainer = styled.article`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  grid-template-rows: 4 minmax(300px, auto);
  grid-gap: 10px;
  box-sizing: border-box;
  position: relative;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;
