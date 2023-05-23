import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/common/PageContainer.jsx";

export default function DeleteComment() {
  const navigate = useNavigate();
  const url = window.location.href;
  const accessToken = getUrlParameter(url, "access_token");
  const refreshToken = getUrlParameter(url, "refresh_token");

  useEffect(() => {
    if (accessToken || refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      navigate("/");
    }
  }, [accessToken, refreshToken, navigate]);

  return (
    <PageContainer>
      <div>a</div>
    </PageContainer>
  );
}
function getUrlParameter(url, name) {
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
