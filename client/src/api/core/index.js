import axios from "axios";

// instance 생성
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token");
    const tokenLessURLs = ["/members/login", "/members"];
    const isGetMethod =
      config.method === "get" && !config.url.startsWith("/members");
    const tokenLess = tokenLessURLs.includes(config.url);

    if (token && !tokenLess) {
      // 로그인 POST, 회원가입 POST, (마이페이지 관련 제외한) 모든 get 요청 token 불필요
      config.headers.authorization = token;
      config.headers.withCredentials = true;
    }
    // console.log(config);
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  response => {
    return response.config.url === "/members/login"
      ? response.headers
      : response.data;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
