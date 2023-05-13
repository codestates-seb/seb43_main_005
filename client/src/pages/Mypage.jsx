import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import Profile from "../components/Mypage/Profile.jsx";
import Level from "../components/Mypage/Level.jsx";
import BtnTabContainer from "../components/Mypage/BtnTabContainer.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Mypage() {
  // 유저 정보 받아와서 아래로 뿌리기 => redux 필요? 아님 props 한번만 내리면 되니까 그냥 사용하지 말까?

  // 테스트 서버 url
  let url1 = `http://13.124.42.111:8080`;
  let url2 = `http://15.163.46.132:8080`;
  // AcessToken 임시
  let accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJBRE1JTiIsIlVTRVIiXSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2ODM5MDcxNTksImV4cCI6MTY4Mzk1MDM1OX0.jOGl3LM1MLodMrKqfyjnTp-ZqtmHow0O8oJ44E9yJNw";
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  //임시 유저 데이터
  let userInfo = {
    memberId: 1,
    email: "test@gmail.com",
    nickName: "Tester",
    profileImage: `https://source.unsplash.com/random/300x300/?animal`,
    memberMbti: "INTP",
    level: 2,
    experience: 50,
    requiredExperience: 50,
    createAt: "",
  };

  // 마이페이지 최초 진입 시 유저 정보(userInfo) 전체 받아오기

  // userInfo props 경로 :
  //  마이페이지 -> Profile -> ProfileImage
  //            -> Level
  // (프로필 이미지) -> BtnTabContainer -> BtnDropdown / BtnTab -> MyDebate / Setting
  // => 한번 불러와서 상태로 관리하기?

  // const [userInfo, setUserInfo] = useState({});
  // async function getUserInfo() {
  //   try {
  //     const response = await axios.get(`${url1}/members/info`, config);
  //     let result = response.data.result;
  // let userInfo = {
  //   memberId: result.memberId,
  //   email: result.email,
  //   nickName: result.nickName,
  //   profileImage: result.profileImage,
  //   memberMbti: result.memberMbti,
  //   level: result.level,
  //   experience: result.experience,
  //   requiredExperience: result.requiredExperience,
  //   createAt: result.createAt,
  // };
  //     // 사용하는 데이터 : email, nickName, profileImage, memberMbti, level, experience, requiredExperience(?)
  //     // 사용하지 않는 데이터 : memberId, createAt?
  //     setUserInfo(userInfo);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  return (
    <PageContainer>
      <MyContainer>
        <Profile userInfo={userInfo} />
        <Level userInfo={userInfo} />
      </MyContainer>
      <BtnTabContainer />
    </PageContainer>
  );
}

// 반응형으로 바꾸면 main 밖으로 article 박스가 튀어나가는 것 어떻게 잡는지??
const MyContainer = styled.main`
  width: 100%;
  display: flex;
  margin-bottom: 110px;
  @media ${props => props.theme.mediaQuery.mobile} {
    flex-direction: column;
    margin-bottom: 50px;
  }
`;
