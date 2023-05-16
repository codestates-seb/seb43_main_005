import axios from "axios";

// instance 생성
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 2500,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  config => {
    const tokenLess =
      (config.method === "post" && config.url.startsWith("/members")) ||
      (config.method === "get" && !config.url.startsWith("/members"));
    if (!tokenLess) {
      // 로그인 POST, 회원가입 POST, 마이페이지 관련 GET 요청을 제외한 모든 요청의 header에 token 넣음
      const token =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJBRE1JTiIsIlVTRVIiXSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2ODQwOTkxMDMsImV4cCI6MTY4NDE0MjMwM30.pavKVwVEFifgJaRenptHrW-XAU3vouYKyak6YvGlUdw";
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
