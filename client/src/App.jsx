import { Routes, Route, BrowserRouter } from "react-router-dom";

//페이지
import Main from "./pages/Main.jsx";
import MbtiTest from "./pages/MbtiTest.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<MbtiTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
