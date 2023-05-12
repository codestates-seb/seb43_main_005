import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "../common/CustomButton.jsx";
import ProfileImage from "../components/Mypage/ProfileImage";
import PageContainer from "../common/PageContainer.jsx";
import axios from "axios";

export default function EditMypage() {
  const [username, setUsername] = useState("default");
  const [email, setEmail] = useState("default@gmail.com");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [edited, setEdited] = useState(false);
  const navigate = useNavigate();

  // 임시 변수
  let url = url;
  let userID = "1";
  let token = "token";

  // 서버에 보낼 데이터
  const reqParams = {
    userID: userID,
    username: username,
    email: email,
    password: password,
    // 프로필 이미지 추가해야 됨
  };

  // 유저 정보 불러오기
  useEffect(() => {
    axios({
      url: url,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log(res);
        // 유저 정보 불러오기
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
      })
      .catch(console.log(Error));
  }, [edited]); // 최초 렌더링 + 수정 완료 시 불러오기

  // 입력 값 받아오기
  const onChange = e => {
    const {
      target: { name, value },
    } = e;
    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "passwordConfirm") {
      setPasswordConfirm(value);
    }
  };

  // 수정 버튼 클릭 시 데이터 수정
  const submitData = async e => {
    e.preventDefault();

    await axios({
      url: url,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(reqParams),
    })
      .then(res => {
        console.log(res.data);
        // 응답을 받은 경우
        setEdited(!edited);
        alert("수정이 완료되었습니다.");
        window.location.reload(); //넣을까 말까...
      })
      .catch(console.log(Error));
  };

  const editCancel = () => {
    navigate(`/mypage`);
  };

  return (
    <PageContainer>
      <MyContainer>
        <ImgContainer>
          <div>프로필 사진</div>
          <ProfileImage src="/" alt="" />
          <CustomButton text="이미지 선택" rounded="true" />
          <button href="/">기본이미지</button>
        </ImgContainer>
        <InfoBox>
          <form action={url} method="patch">
            <div>닉네임</div>
            <input
              name="username"
              type="text"
              value={username}
              onChange={onChange}
              maxLength={30}></input>
            <div>이메일</div>
            <input
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              maxLength={30}></input>
            <div>비밀번호</div>
            <input
              name="password"
              type="password"
              value={password}
              onChange={onChange}
              maxLength={30}></input>
            <div>비밀번호 확인</div>
            <input
              name="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={onChange}
              maxLength={30}></input>
          </form>
        </InfoBox>
        <button>회원탈퇴</button>
        <div>
          <CustomButton text="수정" reverse="true" onClick={submitData} />
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
  grid-template-columns: 1fr 2fr;
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
`;
