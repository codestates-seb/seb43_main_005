import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getData, attendance } from "../api/apiUtil";
import Banner from "../components/Main/Banner.jsx";
import CustomCourse from "../components/common/CustomCourse.jsx";
import CustomButton from "../components/common/CustomButton.jsx";
import AttendanceModal from "../components/Mypage/AttendanceModal.jsx";
import Level from "../components/Mypage/Level.jsx";
import earth from "../assets/images/imgEarth.png";
import ProfileImage from "../components/common/ProfileImage.jsx";
import Empty from "../components/common/Empty.jsx";
import today from "../components/common/Date.jsx";

export default function Main({ userInfo }) {
  const [course, setCourse] = useState(null);
  const [article, setArticle] = useState(null);
  const [dashboard, setDashboard] = useState(null);

  // ! Get main data
  const sliceData = async (path, slice = 2) => {
    const { result } = await getData(`/${path}?size=${slice}&page=0`);
    const { content } = result;

    if (path === "article") {
      setArticle(content);
    } else {
      setCourse(content);
      const [tempo] = content;
      setDashboard(tempo); // tempo
    }
  };

  // 출석 체크
  const [attended, setAttended] = useState(false);
  function attendanceCheck() {
    //메인 페이지에서 오늘 출석 여부 확인하기
    attendance("/members/check-in-date", "get").then(res => {
      let attendedDate = res.result;
      if (!attendedDate[0] === today) {
        localStorage.removeitem("attendance_date");
        console.log(res);
        console.log("출첵 아직");
        console.log(today);
      } else if (attendedDate[0] === today) {
        // 오늘 date와 일치하면 출석 버튼색상 반전하고 disabled 설정해놓기
        console.log(res);
        console.log("이미 출첵완료");
        setAttended(true);
      }
    });
  }

  useEffect(() => {
    sliceData("article");
    sliceData("contents", 3);
    userInfo && attendanceCheck();
  }, []);
  // useEffect(() => {
  //   // 유저 출석여부 확인
  //   // console.log(attended);
  //   attendanceCheck();
  // }, [attended]);

  return (
    <MainContainer>
      <VisualArea>
        <h2>
          Set Sail on <br /> Your Coding Voyage!
        </h2>
        <img src={earth} alt="icon" />
      </VisualArea>
      <Banner />
      {userInfo && (
        <LoginArea>
          <Myinfo>
            <ProfileWrap>
              <ProfileImgWrap>
                <ProfileImage
                  profileImg={userInfo?.profileImage}
                  width="2em"
                  margin="0px"
                />
              </ProfileImgWrap>
              <WelcomeMent>
                <p>
                  안녕하세요 <strong>{userInfo?.nickName}</strong> 님
                </p>
                <p>오늘도 레벨업을 위해 열심히 달려볼까요?</p>
              </WelcomeMent>
            </ProfileWrap>
            <Level userInfo={userInfo} />
          </Myinfo>

          <Dashboard>
            {dashboard ? (
              <>
                <Title>
                  <p>아직 완료하지 못한 강의가 있어요!</p>
                  <a href="/" className="h3">
                    Go to Dashboard
                  </a>
                </Title>
                <Content className="dashboard">
                  <CustomCourse feat="progress" item={dashboard} />
                </Content>
              </>
            ) : (
              <Empty text="아직 수강중인 강의가 없어요" />
            )}
          </Dashboard>
        </LoginArea>
      )}

      <ContentsArea>
        <Title>
          <h3>
            <Link to="/course">Course</Link>
          </h3>
          <p>이제 막 개발을 시작한 Code Traveler들을 위한 개발자 안내서!</p>
        </Title>
        <Content empty={!course?.length} className="course">
          {course?.map(el => (
            <CustomCourse key={el.contentId} item={el} />
          ))}
          {!course?.length && <Empty button="course" />}
        </Content>
      </ContentsArea>
      <ContentsArea>
        <Title>
          <h3>
            <Link to="/discussion">Discussion</Link>
          </h3>
          <p>뜨거운 논쟁을 즐기는 열정적인 Code Traveler 위한 토론방</p>
        </Title>
        <Content empty={!article?.length} className="article">
          {article?.map(el => (
            <CustomButton
              key={el.articleId}
              text={el.title}
              feat="article"
              path={`/discussion/${el.articleId}`}
              item={el}
            />
          ))}
          {!article?.length && <Empty button="article" />}
        </Content>
      </ContentsArea>
      {userInfo && <AttendanceModal attended={attended} />}
    </MainContainer>
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
    color: ${props => props.theme.white};
    -webkit-text-stroke: 2px ${props => props.theme.textBold}; // chrome, safari
    text-shadow: 3.5px 3.5px 0 ${props => props.theme.textBold};
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
    color: ${props => props.theme.textBold};
    font-family: "Shrikhand", cursive;
    font-size: 1.875em;
    font-weight: normal;
    a {
      color: ${props => props.theme.textBold};
    }
  }
  .h3:hover {
    color: ${({ theme }) => theme.main};
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
  display: grid;
  &.course {
    grid-template-columns: 1fr 1fr 1fr;
  }
  &.article {
    grid-template-columns: 1fr 1fr;
  }
  grid-template-columns: ${({ empty }) => empty && "unset !important"};

  @media ${props => props.theme.mediaQuery.desktop} {
    gap: 20px;
  }
  @media ${props => props.theme.mediaQuery.tablet} {
    gap: 15px;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    gap: 15px;
    &.course,
    &.article {
      grid-template-columns: unset;
    }
    &.course {
      gap: 40px;
    }
  }
`;
// ContentsArea Fin

const LoginArea = styled(ContentsArea)`
  display: flex;
  margin: 0 auto;
  @media ${({ theme }) => theme.mediaQuery.desktop} {
    justify-content: space-between;
  }
  @media ${({ theme }) => theme.mediaQuery.tablet} {
    flex-direction: column;
    width: 90%;
    max-width: 700px;
  }
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    flex-direction: column;
    width: 90%;
    max-width: 700px;
  }
`;
const Myinfo = styled.article`
  width: 100%;
  @media ${({ theme }) => theme.mediaQuery.desktop} {
    width: 53%;
  }
  @media ${({ theme }) => theme.mediaQuery.tablet} {
    flex-direction: column;
    margin-bottom: 40px;
  }
`;
const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 0px;
  }
`;
const ProfileImgWrap = styled.span`
  font-size: 130px;
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    font-size: 100px;
  }
`;
const WelcomeMent = styled.div`
  font-size: 16px;
  p {
    font-size: 1.25em;
    line-height: 1.5em;
    strong {
      color: ${({ theme }) => theme.textBold};
    }
  }
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
  }
`;
const Dashboard = styled.article`
  display: grid;
  align-items: center;
  width: 100%;
  padding: 60px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.whiteOp50};
  .dashboard {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    width: 41%;
  }
`;
// LoginArea Fin
