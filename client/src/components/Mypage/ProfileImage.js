import styled from "styled-components";

const ProfileImage = styled.div`
  width: 145px;
  height: 145px;
  background-image: url(${props => props.profileImg});
  background-size: cover;
  background-position: center;
  border-radius: 5rem;
  margin: 30px;
  @media ${props => props.theme.mediaQuery.mobile} {
    width: 110px;
    height: 110px;
    margin: 20px auto 0;
  }
`;
export default ProfileImage;
