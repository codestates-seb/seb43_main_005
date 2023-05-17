import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import getData from "../../hooks/useInput";

export default function ProfileImage({
  onClick,
  path = undefined,
  feat = "mypage",
  profileImg, // 이미지 url
  width,
  margin,
}) {
  // feat = 'header' | 'mypage' | 'mycomment'
  const [profileImage, setProfileImage] = useState("default");
  const navigate = useNavigate();
  const handlePath = () => path && navigate(path);

  // 유저 프로필 이미지 받아오기
  const data = getData("/members/info");

  useEffect(() => {
    setProfileImage(data?.result?.profileImage);
    console.log(data);
  }, [data]);

  return (
    <StyledProfileImage
      onClick={onClick || handlePath}
      feat={feat}
      profileImg={profileImg}
      width={width}
      margin={margin}
    />
  );
}

const StyledProfileImage = styled.div`
  background-image: url(${props => props.profileImg});
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid ${props => props.theme.color.main};
  border-radius: 50%;

  ${({ feat }) =>
    feat === "header" &&
    css`
      width: 40px;
      height: 40px;
      cursor: pointer;
      @media ${props => props.theme.mediaQuery.mobile} {
        width: 34px;
        height: 34px;
      }
    `}
  ${({ feat }) =>
    feat === "mypage" &&
    css`
      width: 145px;
      height: 145px;
      margin: ${({ margin }) => margin || "30px"};
      @media ${props => props.theme.mediaQuery.mobile} {
        width: 110px;
        height: 110px;
        margin: ${({ margin }) => margin || "20px auto 0"};
      }
    `}
  ${({ feat }) =>
    feat === "mycomment" &&
    css`
      width: 36px;
      height: 36px;
      margin: auto 18px;
    `}

  width: ${({ width }) => width} !important;
  height: ${({ width }) => width} !important;
`;
