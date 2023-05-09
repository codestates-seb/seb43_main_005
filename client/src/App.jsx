import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Mypage from "./pages/Mypage.jsx";
import ErrorPage from "./pages/404page.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
