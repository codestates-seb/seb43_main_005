import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

export default function ProfileImage({
  onClick,
  path = undefined,
  feat = "mypage",
  profileImg, // 이미지 url
}) {
  // feat = 'header' | 'mypage' | 'mycomment'
  const navigate = useNavigate();
  const handlePath = () => path && navigate(path);

  return (
    <StyledProfileImage
      onClick={onClick || handlePath}
      feat={feat}
      profileImg={profileImg}></StyledProfileImage>
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
      margin: 30px;
      @media ${props => props.theme.mediaQuery.mobile} {
        width: 110px;
        height: 110px;
        margin: 20px auto 0;
      }
    `}
  ${({ feat }) =>
    feat === "mycomment" &&
    css`
      width: 36px;
      height: 36px;
      margin: auto 18px;
    `}
`;
