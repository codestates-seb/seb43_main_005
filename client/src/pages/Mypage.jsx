import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../components/common/PageContainer.jsx";
import Profile from "../components/Mypage/Profile.jsx";
import Level from "../components/Mypage/Level.jsx";
import BtnTabContainer from "../components/Mypage/BtnTabContainer.jsx";
import { useEffect } from "react";
import {
  setUserInfo,
  fetchUserInfo,
} from "../redux/features/user/userSlice.js";

export default function Mypage() {
  // const { userInfo } = useSelector(state => state.user);

  // redux-toolkit 적용
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchUserInfo());
  //   dispatch(setUserInfo());
  //   console.log(setUserInfo());
  //   console.log(fetchUserInfo());
  // }, []);

  return (
    <PageContainer>
      <MyContainer className="Mycontaner">
        {/* <Profile userInfo={userInfo} />
        <Level userInfo={userInfo} /> */}
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
