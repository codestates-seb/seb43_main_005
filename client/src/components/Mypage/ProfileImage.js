import styled from "styled-components";

const ProfileImage = styled.div`
  width: 145px;
  height: 145px;
  background-image: url("https://source.unsplash.com/random/300x300/?animal,cute");
  // 이미지는 나중에 유저정보 img GET 해올 것
  background-size: 100%;
  border-radius: 5rem;
  margin: 30px;
  @media ${props => props.theme.mediaQuery.mobile} {
    width: 110px;
    height: 110px;
    margin: 20px auto 0;
  }
`;
export default ProfileImage;
