import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./pages/Main.jsx";
import PageContainer from "./common/PageContainer.jsx";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
