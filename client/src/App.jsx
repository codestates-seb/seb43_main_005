import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./assets/styels/theme.jsx";
import GlobalStyle from "./assets/styels/GlobalStyle.jsx";
import Login from "./pages/Login.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer.jsx";
import Main from "./pages/Main.jsx";
import MbtiTest from "./pages/MbtiTest.jsx";
import Mypage from "./pages/Mypage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import EditMyPage from "./pages/Mypage_edit.jsx";
import ErrorPage from "./pages/404page.jsx";
import AdminWrite from "./pages/AdminWrite.jsx";
import Signup from "./pages/Signup.jsx";
import FindPassword from "./pages/FindPassword.jsx";
import DiscussionList from "./pages/DiscussionList.jsx";

function App() {
  const { pathname } = useLocation();
  const hideHeaderFooter = pathname.startsWith("/user");

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/edit" element={<EditMyPage />} />
        <Route path="/teampage" element={<TeamPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/mbti" element={<MbtiTest />} />
        <Route path="/admin/write" element={<AdminWrite />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </ThemeProvider>
  );
}

export default App;
