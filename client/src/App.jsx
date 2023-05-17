import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./assets/styels/theme.jsx";
import GlobalStyle from "./assets/styels/GlobalStyle.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer.jsx";
import Main from "./pages/Main.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import FindPassword1 from "./pages/FindPassword1.jsx";
import FindPassword2 from "./pages/FindPassword2.jsx";
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

function App() {
  const { pathname } = useLocation();
  const hideHeaderFooter =
    pathname.startsWith("/user") || /^\/course\/\w/.test(pathname);
  // path가 '/user'로 시작하거나, '/course/문자혹은숫자' 로 시작하면 common header 숨김

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="user/login" element={<Login />} />
        <Route path="user/signup" element={<Signup />} />
        <Route path="user/findpw/1" element={<FindPassword1 />} />
        <Route path="user/findpw/2" element={<FindPassword2 />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/edit" element={<EditMyPage />} />
        <Route path="/teampage" element={<TeamPage />} />
        <Route path="/user/error" element={<ErrorPage />} />
        <Route path="/mbti" element={<MbtiTest />} />
        <Route path="/mbtiresult" element={<MbtiResult />} />
        <Route path="/course" element={<Course />} />
        <Route path="/discussion" element={<DiscussionList />} />
        <Route path="/discussion/:id" element={<DiscussionDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/write/:feat" element={<AdminWrite />} />
        <Route path="/course/:id" element={<CouresDetail />} />
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
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </ThemeProvider>
  );
}

export default App;
