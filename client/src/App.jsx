import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
