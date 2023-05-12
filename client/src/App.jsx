import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Main from "./pages/Main.jsx";
import MbtiTest from "./pages/MbtiTest.jsx";
import Mypage from "./pages/Mypage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import EditMyPage from "./pages/Mypage_edit.jsx";
import ErrorPage from "./pages/404page.jsx";
import Signup from "./pages/Signup.jsx";
import FindPassword from "./pages/FindPassword.jsx";
import DiscussionList from "./pages/DiscussionList.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/findpassword" element={<FindPassword />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/discussion" element={<DiscussionList />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/edit" element={<EditMyPage />} />
          <Route path="/teampage" element={<TeamPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/mbti" element={<MbtiTest />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
