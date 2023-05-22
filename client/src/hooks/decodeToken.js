import jwt_decode from "jwt-decode";

export const decodeToken = () => {
  const token = localStorage.getItem("access_token");
  try {
    const decodedToken = jwt_decode(token);
    const now = Date.now().valueOf() / 1000;
    let isValid;
    if (decodeToken.exp < now) {
      // console.log("토큰 만료");
      isValid = false;
    } else {
      // console.log("토큰 유효");
      isValid = true;
    }

    return [isValid, decodedToken.roles[0]];
  } catch (err) {
    // console.error("Invalid token", err);
    const isValid = false;
    return [isValid];
  }
};
