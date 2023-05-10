import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Main from "./pages/Main.jsx";
import MbtiTest from "./pages/MbtiTest.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<MbtiTest />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
