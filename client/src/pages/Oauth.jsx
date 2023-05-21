import React from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/common/PageContainer.jsx";
export default function DeleteComment() {
  const navigate = useNavigate();
  let accessToken = new URL(location.href).searchParams.get("access_token");
  let refreshToken = new URL(location.href).searchParams.get("refresh_token");
  if (accessToken || refreshToken) {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    navigate("/");
  }

  return (
    <PageContainer>
      <div>a</div>
    </PageContainer>
  );
}
