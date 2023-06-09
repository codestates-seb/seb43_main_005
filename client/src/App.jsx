import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "./redux/features/user/userSlice.js";
import { decodeToken } from "./hooks/decodeToken.js";
import useScrollTop from "./hooks/useScroll.js";
import themes from "./assets/styels/theme.jsx";
import GlobalStyle from "./assets/styels/GlobalStyle.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer.jsx";
import Main from "./pages/Main.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import FindPassword1 from "./pages/FindPassword1.jsx";
import FindPassword2 from "./pages/FindPassword2.jsx";
import Oauth from "./pages/Oauth.jsx";
import Mypage from "./pages/Mypage.jsx";
import EditMyPage from "./pages/Mypage_edit.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import ErrorPage from "./pages/404page.jsx";
import MbtiTest from "./pages/MbtiTest.jsx";
import MbtiResult from "./pages/MbtiResult.jsx";
import DiscussionList from "./pages/DiscussionList.jsx";
import DiscussionDetail from "./pages/DiscussionDetail.jsx";
import AdminWrite from "./pages/AdminWrite.jsx";
import Admin from "./pages/Admin.jsx";
import Course from "./pages/Course.jsx";
import CouresDetail from "./pages/CouresDetail.jsx";
import CourseOXquiz from "./pages/CourseOXquiz.jsx";
import useModal from "./hooks/useModal.js";
import Alert from "./components/common/Alert.jsx";
import AdminRoute from "./components/route/AdminRoute.jsx";
import ChatBot from "./components/ChatBot/ChatBot.jsx";
import { setTheme } from "./redux/features/theme/themeSlice.js";

function App() {
  const { pathname } = useLocation();
  const { userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [alert, openAlert, closeAlert] = useModal();
  const [selectedTheme, setSelectedTheme] = useState("defaultLight");
  const theme = useSelector(state => state.theme.value);
  console.log(theme);

  // ! Get userInfo
  const pathsToExclude = ["/user", "/mbti", "/mbtiresult", "/teampage"];
  useEffect(() => {
    useScrollTop(10);
    const [isValid] = decodeToken();
    if (!pathsToExclude.some(path => pathname.startsWith(path))) {
      if (isValid) {
        dispatch(fetchUserInfo());
      } else if (pathname !== "/") {
        openAlert();
      }
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    // 서버에서 받아온 테마 적용
    userInfo?.memberTheme
      ? setSelectedTheme(userInfo.memberTheme)
      : setSelectedTheme("defaultLight");
  }, [userInfo, theme]);

  // const isServerThemeLoaded = useSelector(
  //   state => state.theme.isServerThemeLoaded
  // );
  // useEffect(() => {
  //   if (userInfo?.memberTheme) {
  //     dispatch(setTheme(userInfo.memberTheme));
  //     setSelectedTheme(userInfo.memberTheme);
  //   } else {
  //     setSelectedTheme("defaultLight");
  //   }
  // }, [dispatch, isServerThemeLoaded, selectedTheme]);
  // console.log(selectedTheme);
  // console.log(theme);

  // ! hide Header and Footer
  const hideHeaderFooter =
    pathname.startsWith("/user") || /^\/course\/\w/.test(pathname);

  return (
    <ThemeProvider theme={themes[selectedTheme]}>
      <GlobalStyle />
      {alert && <Alert closeAlert={closeAlert} />}
      {!hideHeaderFooter && <Header userInfo={userInfo} />}
      <Routes>
        <Route path="/" element={<Main userInfo={userInfo} />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/findpw/1" element={<FindPassword1 />} />
        <Route path="/user/findpw/2" element={<FindPassword2 />} />
        <Route path="/user/oauth" element={<Oauth />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/edit" element={<EditMyPage />} />
        <Route path="/teampage" element={<TeamPage />} />
        <Route path="/mbti" element={<MbtiTest />} />
        <Route path="/mbtiresult" element={<MbtiResult />} />
        <Route path="/course" element={<Course />} />
        <Route path="/discussion" element={<DiscussionList />} />
        <Route path="/discussion/:id" element={<DiscussionDetail />} />
        <Route
          path="/course/:id/learn/:learn"
          element={<CouresDetail feat="content" />}
        />
        <Route path="/course/:id/quiz" element={<CouresDetail feat="quiz" />} />
        {/* Admin path 접근 제한 */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/:id" element={<Admin />} />
          <Route path="/admin/write/:feat" element={<AdminWrite />} />
          <Route
            path="/admin/write/course/:courseId/:feat"
            element={<AdminWrite />}
          />
          <Route
            path="/admin/edit/:feat/:id"
            element={<AdminWrite mode="patch" />}
          />
          <Route
            path="/admin/edit/course/:courseId/:feat/:id"
            element={<AdminWrite mode="patch" />}
          />
        </Route>
        {/* Admin path 접근 제한 */}
        {/* 정의되지 않은 URL 접근시 404에러 페이지로 연결 */}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>

      {!hideHeaderFooter && <ChatBot />}
      {!hideHeaderFooter && <Footer />}
    </ThemeProvider>
  );
}

export default App;
