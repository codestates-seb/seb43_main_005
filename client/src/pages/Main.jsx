import styled from "styled-components";
import earth from "../assets/images/imgEarth.png";
import Banner from "../components/Main/Banner.jsx";
import CustomCourse from "../components/common/CustomCourse.jsx";
import CustomButton from "../components/common/CustomButton.jsx";
import AttendanceModal from "../components/Mypage/AttendanceModal.jsx";

export default function Main() {
  const login = true;
  const course = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const article = [
    {
      id: 1,
      title: "요즘 취업하려면 타입스크립트는 필수로 배워야 한다던데..?",
    },
    { id: 2, title: "상태관리 라이브러리 리덕스 말고 더 좋은 게 없을까요?" },
  ];
  // 임시 변수

  return (
    <>
      <MainContainer>
        <VisualArea>
          <h2>
            Set Sail on <br /> Your Coding Voyage!
          </h2>
          <img src={earth} alt="icon" />
        </VisualArea>
        <Banner />
        {login && (
          <LoginArea>
            <Myinfo />
            <Dashboard>
              <Title>
                <p>아직 완료하지 못한 강의가 있어요!</p>
                <a href="/" className="h3">
                  Go to Dashboard
                </a>
              </Title>
              <Content>
                <CustomCourse feat="progress" />
              </Content>
            </Dashboard>
          </LoginArea>
        )}

        <ContentsArea>
          <Title>
            <h3>Roadmap</h3>
            <p>이제 막 개발을 시작한 Code Traveler들을 위한 개발자 안내서!</p>
          </Title>
          <Content className="course">
            {course.map(el => (
              <CustomCourse key={el.id} />
            ))}
          </Content>
        </ContentsArea>
        <ContentsArea>
          <Title>
            <h3>Discussion</h3>
            <p>뜨거운 논쟁을 즐기는 열정적인 Code Traveler 위한 토론방</p>
          </Title>
          <Content>
            {article.map(el => (
              <CustomButton key={el.id} text={el.title} feat="article" />
            ))}
          </Content>
        </ContentsArea>
      </MainContainer>
      <AttendanceModal />
    </>
  );
}
const MainContainer = styled.main`
  padding-bottom: 180px;
`;
// Container Fin

const VisualArea = styled.section`
  width: 90%;
  margin: 0 auto;
  text-align: center;
  h2 {
    margin-bottom: 50px;
    font-family: "Shrikhand", cursive;
    color: ${props => props.theme.color.white};
    -webkit-text-stroke: 2px ${props => props.theme.color.textBold}; // chrome, safari
    text-shadow: 3.5px 3.5px 0 ${props => props.theme.color.textBold};
    line-height: 1.2em;
    font-weight: normal;
  }
  @media ${props => props.theme.mediaQuery.desktop} {
    padding-top: 220px;
    padding-bottom: 150px;
    h2 {
      font-size: 5.5em;
    }
  }
  @media ${props => props.theme.mediaQuery.tablet} {
    padding-top: 220px;
    padding-bottom: 150px;
    h2 {
      font-size: 3.5em;
    }
    img {
      width: 80px;
      height: 80px;
    }
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    padding-top: 170px;
    padding-bottom: 100px;
    h2 {
      font-size: 2.7em;
      -webkit-text-stroke-width: 1px;
    }
    img {
      width: 60px;
      height: 60px;
    }
  }
`;
// VisualArea Fin

const ContentsArea = styled.section`
  width: 90%;
  margin: 0 auto;
  @media ${props => props.theme.mediaQuery.desktop} {
    max-width: 1375px;
    padding-top: 150px;
  }
  @media ${props => props.theme.mediaQuery.tablet} {
    padding-top: 110px;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    padding-top: 110px;
  }
`;
const Title = styled.div`
  margin-bottom: 30px;
  & > :first-child {
    margin-bottom: 10px;
  }
  h3,
  .h3 {
    color: ${props => props.theme.color.textBold};
    font-family: "Shrikhand", cursive;
    font-size: 1.875em;
    font-weight: normal;
  }
  .h3:hover {
    color: ${({ theme }) => theme.color.main};
  }
  .h3:after {
    content: "→";
    padding-left: 10px;
    transition-duration: 0.5s;
  }
  .h3:hover:after {
    padding-left: 30px;
  }
  p {
    font-family: "GmarketSansLight", cursive;
    font-size: 0.875em;
    line-height: 1.2rem;
  }
`;
const Content = styled.div`
  display: flex;

  @media ${props => props.theme.mediaQuery.desktop} {
    gap: 20px;
  }
  @media ${props => props.theme.mediaQuery.tablet} {
    gap: 15px;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    flex-direction: column;
    gap: 15px;
    &.course {
      gap: 40px;
    }
  }
`;
// ContentsArea Fin

const LoginArea = styled(ContentsArea)`
  display: flex;
  justify-content: space-between;
`;
const Myinfo = styled.article`
  width: 50%;
  background-color: red;
`;
const Dashboard = styled.article`
  width: 41%;
  padding: 60px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.whiteOp50};
`;
// LoginArea Fin
