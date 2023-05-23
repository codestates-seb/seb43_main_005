import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import CustomButton from "../common/CustomButton.jsx";
import CustomCheckBox from "../common/CustomCheckBox.jsx";
import { useNavigate } from "react-router-dom";
import party from "../../assets/images/icons8-confetti-64.png";

const mbtiTypes = [
  "enfj",
  "enfp",
  "entj",
  "entp",
  "enfj",
  "enfp",
  "estj",
  "estp",
  "infj",
  "infp",
  "intj",
  "intp",
  "isfj",
  "isfp",
  "istj",
  "istp",
];
async function loadImage(type) {
  try {
    const image = await import(`../../assets/images/mbtiResultImg/${type}.png`);
    return image.default;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default function TestModal({ userTest, userName, closeModal }) {
  // ! random mbti img
  const [randomImage, setRandomImage] = useState(null);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * mbtiTypes.length);
    !userTest &&
      loadImage(mbtiTypes[randomIndex]).then(image => setRandomImage(image));
  }, []);

  // !navigate
  const navigate = useNavigate();
  const handleNavi = path => {
    closeModal();
    navigate(path);
  };

  // ! handle ChkBox
  const [check, setCheck] = useState(false);
  const [ment, setMent] = useState("오늘 하루 안볼래요 ꒰◍ᐡᐤᐡ◍꒱");
  const handleChk = () => setCheck(prev => !prev);
  useEffect(() => {
    check
      ? setMent("내일 또 봐요 (۶•̀ᴗ•́)۶")
      : setMent("오늘 하루 안볼래요 ꒰◍ᐡᐤᐡ◍꒱");
  }, [check]);

  // ! close Modal
  const clickBack = e => e.target.classList.contains("close") && closeModal();
  const handleClose = () => {
    if (check) {
      const currentTime = new Date().getTime();
      const expirationTime = currentTime + 24 * 60 * 60 * 1000;
      // const expirationTime = currentTime + 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    }
    closeModal();
  };

  return (
    <ModalBack onClick={clickBack} className="close">
      {userTest ? (
        <ModalContainer>
          <div className="license">
            <a href="https://icons8.com/icon/bwkO4JtSGTOX/confetti">Party </a>
            icon by
            <a href="https://icons8.com"> Icons8</a>
          </div>
          <TextWrap>
            <img className="party" src={party} alt="party icon" />
            <p>레벨업 축하드려요!</p>
            <p>이제 새로운 테마를 적용할 수 있습니다!</p>
          </TextWrap>
          <CustomButton
            feat="login"
            text="테마 바꾸러가기"
            reverse
            onClick={() => handleNavi("/mypage")}
          />
          <butotn className="closeBtn" onClick={closeModal}>
            닫기
          </butotn>
        </ModalContainer>
      ) : (
        <ModalContainer>
          <TextWrap>
            {randomImage && <img src={randomImage} alt="Random MBTI" />}
            <p>{userName} 님! 아직 학습유형테스트를 하지 않으셨나요?</p>
            <p>지금 바로 테스트해보고 레벨업 보상도 받아보세요!</p>
          </TextWrap>
          <CustomButton
            feat="login"
            reverse
            text="테스트 하러가기"
            onClick={() => handleNavi("/mbti")}
          />
          <ButtonWrap>
            <CustomCheckBox text={ment} onClick={handleChk} checked={check} />
            <button onClick={handleClose}>닫기</button>
          </ButtonWrap>
        </ModalContainer>
      )}
    </ModalBack>
  );
}
const ModalBack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.blackOp50};
`;
const show = keyframes`
  from{
    transform: scale(0);
  }
  to{
    transform: scale(1);
  }
`;
const shakeText = keyframes`
  from{
    transform: rotate(3deg) ;
  }
  to{
    transform: rotate(-3deg);
  }
`;
const ModalContainer = styled.div`
  width: 90%;
  max-width: 500px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: ${props => props.theme.white};
  animation: ${show} 0.2s 0s alternate linear 1;
  text-align: center;
  position: relative;
  img {
    display: flex;
    width: 200px;
    margin: 0 auto 20px auto;
    &.party {
      width: 100px;
      margin: 0 auto 50px auto;
      animation: ${shakeText} 0.2s 0.05s alternate linear infinite;
    }
  }
  .closeBtn {
    display: inline-block;
    cursor: pointer;
    margin-top: 20px;
    font-size: 14px;
    &:hover {
      text-decoration: underline;
    }
  }
  .license {
    position: fixed;
    left: 10px;
    bottom: 10px;
    font-size: 12px;
    a {
      color: #8b8b8b;
    }
  }
`;
const TextWrap = styled.div`
  text-align: center;
  line-height: 1.3rem;
  padding: 20px 0 40px;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  & > div:last-of-type {
    width: unset;
    margin-bottom: 0;
    label {
      cursor: pointer;
    }
  }
  button {
    width: 40px;
    color: ${props => props.theme.text};
    &:hover {
      text-decoration: underline;
    }
  }
`;
