import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import Card from "../components/Mypage/Card.jsx";
import kshQR from "../assets/images/QRcode/kshQR.png";
import YJMQR from "../assets/images/QRcode/YJMQR.png";
import LDGQR from "../assets/images/QRcode/LDGQR.png";
import YCWQR from "../assets/images/QRcode/YCWQR.png";
import LHJQR from "../assets/images/QRcode/LHJQR.png";
import CYJQR from "../assets/images/QRcode/CYJQR.png";
import HSHQR from "../assets/images/QRcode/HSHQR.png";

export default function EditMypage() {
  const teammateInfo = [
    {
      name: "김석현",
      nameENG: "SEOK HYEON",
      febe: "백엔드",
      febeENG: "BACK END",
      gitQR: kshQR,
      gitAddress: "https://github.com/Gonue",
      blogAddress: "",
      job: "BE 팀장",
      work: "멤버, 토론, 보안, 인프라",
      imgURL: "https://i.ibb.co/XCqjr8N/kkobuk.jpg",
    },
    {
      name: "윤지민",
      nameENG: "JI MIN",
      febe: "백엔드",
      febeENG: "FRONT END",
      gitQR: YJMQR,
      gitAddress: "https://github.com/Yoon-JM",
      blogAddress: "https://wlals3591.tistory.com/",
      job: "BE 팀원",
      work: "학습상세, 진행",
      imgURL:
        "https://s3.orbi.kr/data/file/united/251cc0d1434cc0aed00afe93082bb25a.jpeg",
    },
    {
      name: "이동근",
      nameENG: "DONG KEUN",
      febe: "백엔드",
      febeENG: "BACK END",
      gitQR: LDGQR,
      gitAddress: "https://github.com/stge35",
      blogAddress: "",
      job: "BE 팀원",
      work: "OX퀴즈, OX결과",
      imgURL: "https://i.ibb.co/fNpzKn6/pngwing-com.png",
    },
    {
      name: "유채원",
      nameENG: "CHAE WON",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: YCWQR,
      gitAddress: "https://github.com/ychae1997",
      blogAddress: "https://ychae1997.github.io/",
      job: "FE 팀장",
      work: "디자인, 메인페이지, 어드민 CRUD, 학습, 공통컴포넌트",
      imgURL: "https://i.ibb.co/bbw8mNM/image.webp",
    },
    {
      name: "이현진",
      nameENG: "HYUN JIN",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: LHJQR,
      gitAddress: "https://github.com/lhj5924",
      blogAddress: "https://velog.io/@lhj5924",
      job: "FE 팀원",
      work: "마이페이지, 팀원 소개 페이지, 404오류 페이지",
      imgURL:
        "https://scontent-lax3-1.xx.fbcdn.net/v/t31.18172-8/11236475_1094175240594869_7891370429642893989_o.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9267fe&_nc_ohc=iPHkV1KZ_ugAX8NS_bx&_nc_ht=scontent-lax3-1.xx&oh=00_AfALLjW8gvq1J8aPhrGzujh0UDLVgYvAPmxgs0nToQPWHA&oe=64956469",
    },
    {
      name: "조용주",
      nameENG: "Cho Yong Ju",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: CYJQR,
      gitAddress: "https://github.com/pizzaYami",
      blogAddress: "https://cho9407.tistory.com/",
      job: "FE 팀원",
      work: "로그인, 회원가입, 토론, 토론상세",
      imgURL: "https://i.ibb.co/2P51rw3/image.jpg",
    },
    {
      name: "황설현",
      nameENG: "Hwang sul Hyeon",
      febe: "프론트엔드",
      febeENG: "FRONT END",
      gitQR: HSHQR,
      gitAddress: "https://github.com/soulhn",
      blogAddress: "https://velog.io/@xxoixo",
      job: "FE 팀원",
      work: "MBTI 테스트, OX 퀴즈",
      imgURL: "https://i.ibb.co/7YHLBBV/pangpang.jpg",
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
  grid-gap: 20px;
  box-sizing: border-box;
  position: relative;
  @media ${props => props.theme.mediaQuery.tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 700px;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    display: flex;
    flex-direction: column;
  }
`;
