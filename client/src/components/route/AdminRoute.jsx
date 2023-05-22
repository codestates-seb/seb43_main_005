import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute() {
  const { userRole } = useSelector(state => state.user);
  const isAdmin = userRole === "ADMIN";
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

// 일반유저가 주소창을 통해 /admin 페이지에 접근했을때 /으로 리디렉션
