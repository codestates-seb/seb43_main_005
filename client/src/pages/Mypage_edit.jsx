import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "../components/common/CustomButton.jsx";
import ProfileImage from "../components/common/ProfileImage.jsx";
import PageContainer from "../components/common/PageContainer.jsx";
import axios from "axios";

export default function EditMypage() {
  const [nickName, setNickName] = useState("default");
  const [email, setEmail] = useState("default@gmail.com");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [edited, setEdited] = useState(false);
  const navigate = useNavigate();

  // // 임시 변수
  // let url = url;
  // let memberId = "1";
  // let token = "token";

  // // 서버에 보낼 데이터
  // const patchUserInfo = {
  //   memberId: memberId,
  //   nickName: nickName,
  //   email: email,
  //   password: password,
  //   passwordConfirm: passwordConfirm,
  //   // 프로필 이미지 추가해야 됨
  //   profileImage: profileImage,
  // };

  // // 유저 정보 불러오기
  // useEffect(() => {
  //   axios({
  //     url: url,
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then(res => {
  //       console.log(res);
  //       // 유저 정보 불러오기
  //       setNickName(res.data.nickName);
  //       setEmail(res.data.email);
  //       setPassword(res.data.password);
  //     })
  //     .catch(console.log(Error));
  // }, [edited]); // 최초 렌더링 + 수정 완료 시 불러오기

  // // 입력 값 받아오기
  // const onChange = e => {
  //   const {
  //     target: { name, value },
  //   } = e;
  //   if (name === "nickName") {
  //     setNickName(value);
  //   } else if (name === "email") {
  //     setEmail(value);
  //   } else if (name === "password") {
  //     setPassword(value);
  //   } else if (name === "passwordConfirm") {
  //     setPasswordConfirm(value);
  //   }
  // };

  // // 수정 버튼 클릭 시 데이터 수정
  // const submitData = async e => {
  //   e.preventDefault();

  //   await axios({
  //     url: url,
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: JSON.stringify(patchUserInfo),
  //   })
  //     .then(res => {
  //       console.log(res.data);
  //       // 응답을 받은 경우
  //       setEdited(!edited);
  //       alert("수정이 완료되었습니다.");
  //       window.location.reload(); //넣을까 말까...
  //     })
  //     .catch(console.log(Error));
  // };

  const editCancel = () => {
    navigate(`/mypage`);
  };

  const imgInput = useRef();
  const postImg = () => {
    imgInput.current.click();
  };

  return (
    <PageContainer>
      <MyContainer>
        <ImgContainer>
          <div>프로필 사진</div>
          <ProfileImage
            src="https://source.unsplash.com/random/300x300/?animal"
            alt="profile img"
          />
          <input
            type="file"
            accept="image/*"
            ref={imgInput}
            style={{ display: "none" }}
          />
          <CustomButton text="이미지 선택" rounded="true" onClick={postImg} />
          <button href="/">기본이미지</button>
        </ImgContainer>
        <InfoBox>
          <form
            // action={url}
            method="patch">
            <InputBox>
              <div>닉네임</div>
              <input
                name="nickName"
                type="text"
                value={nickName}
                // onChange={onChange}
                maxLength={30}></input>
            </InputBox>
            <InputBox>
              <div>이메일</div>
              <input
                name="email"
                type="email"
                value={email}
                // onChange={onChange}
                maxLength={30}></input>
            </InputBox>
            <InputBox>
              <div>비밀번호</div>
              <input
                name="password"
                type="password"
                value={password}
                // onChange={onChange}
                maxLength={30}></input>
            </InputBox>
            <InputBox>
              <div>비밀번호 확인</div>
              <input
                name="passwordConfirm"
                type="password"
                value={passwordConfirm}
                // onChange={onChange}
                maxLength={30}></input>
            </InputBox>
          </form>
        </InfoBox>
        <button>회원탈퇴</button>
        <div>
          <CustomButton
            text="수정"
            reverse="true"
            // onClick={submitData}
          />
          <CustomButton text="취소" onClick={editCancel} />
        </div>
      </MyContainer>
    </PageContainer>
  );
}

const MyContainer = styled.article`
  background-color: aliceblue;
  padding: 50px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  @media ${props => props.theme.mediaQuery.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const ImgContainer = styled.section`
  display: flex;
  background-color: lemonchiffon;
`;
const InfoBox = styled.div`
  background-color: rosybrown;
  & > form {
    display: flex;
    flex-direction: column;
  }
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
