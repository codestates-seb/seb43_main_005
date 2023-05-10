import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Main from "./pages/Main.jsx";
import Mypage from "./pages/Mypage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import EditMyPage from "./pages/Mypage_edit.jsx";
import ErrorPage from "./pages/404page.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/edit" element={<EditMyPage />} />
          <Route path="/teampage" element={<TeamPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
