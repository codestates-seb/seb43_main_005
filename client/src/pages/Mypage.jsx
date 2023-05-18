import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import Profile from "../components/Mypage/Profile.jsx";
import Level from "../components/Mypage/Level.jsx";
import BtnTabContainer from "../components/Mypage/BtnTabContainer.jsx";
import { useEffect, useState } from "react";
import { getData } from "../api/apiUtil.js";

export default function Mypage() {
  const [userInfo, setUserInfo] = useState({});

  // 마이페이지 최초 진입 시 유저 정보(userInfo) 전체 받아오기
  function getUserInfo() {
    getData("/members/info").then(res => {
      // console.log(res.result);
      setUserInfo({
        memberId: res.result.memberId,
        email: res.result.email,
        nickName: res.result.nickName,
        profileImage: res.result.profileImage,
        memberMbti: res.result.memberMbti,
        level: res.result.level,
        experience: res.result.experience,
        requiredExperience: res.result.requiredExperience,
      });
    });
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <PageContainer>
      <MyContainer className="Mycontaner">
        <Profile userInfo={userInfo} />
        <Level userInfo={userInfo} />
      </MyContainer>
      <BtnTabContainer />
    </PageContainer>
  );
}

const MyContainer = styled.main`
  width: 100%;
  display: flex;
  margin-bottom: 110px;
  box-sizing: border-box;
  @media ${props => props.theme.mediaQuery.mobile} {
    flex-direction: column;
    margin-bottom: 50px;
  }
`;
