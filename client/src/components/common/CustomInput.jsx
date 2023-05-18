import React, { useRef } from "react";
import styled, { css } from "styled-components";
import ProfileImage from "./ProfileImage.jsx";
import CustomButton from "./CustomButton.jsx";
import Editor from "../Admin/Editor.jsx";

import { updateData, getImagesUrl } from "../../api/apiUtil.js";

import useUploadImg from "../../hooks/useUploadImg.js";

/**
 * admin 수정시 item 속성 필수!
 *
 * @param id input tag 기본 속성입니다. (ex. <input type='password' />)
 * @param text label 혹은 placeholder 표시될 텍스트를 입력합니다.
 * @param type input tag 기본 속성입니다. (ex. <input type='password' />)
 * ----- type = 'img' | 'editor' | 'ox' (기본 속성 외 추가 type)
 * @param feat input style
 * ----- feat = 'admin' | 'mypage' | 'login'
 * @param value useInput.js 혹은 useUploadImg.js(이미지 사용시) 의 첫번째 인자(value) 기입
 * ----- ex. const [value, valueReset] = useInput('');
 * @param ment user page input 하단 멘트입니다
 * @param disabled 버튼 비활성화 (ex. 마이페이지 수정 email 부분)
 *
 *
 */

export default function CustomInput({
  id,
  text = "제목",
  type = "text",
  feat = "login",
  value,
  ment,
  disabled,
}) {
  // ! custom button과 input file 연결
  const fileInputRef = useRef(null);
  const handleButtonClick = e => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  // ! form 태그 내에서 enter 눌렀을 때 input file 실행 막음
  const handleKeyDowm = e => e.key === "Enter" && e.preventDefault();

  // 프로필 이미지 수정 - 기본 이미지 클릭 시 기본 이미지 url 보내기
  const defaulImg =
    "https://s3.console.aws.amazon.com/s3/object/gonue-bucket?region=ap-northeast-2&prefix=dbcef092-2952-4b4e-b449-1a312ff668da_basic_profile.png";
  const handlePost = e => {
    e.preventDefault();
    updateData(defaulImg, "/members/profile-image", "patch")
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <StyledInput feat={feat}>
      <Label
        feat={feat}
        as={(type === "img" || type === "quiz") && "span"}
        htmlFor={id}>
        {text}
      </Label>
      {type === "img" ? (
        // ~ images
        <ImgWrap feat={feat}>
          {feat === "mypage" && (
            <ProfileImage profileImg={value.preview} margin="0 1em 0 0" />
          )}
          {feat === "admin" && (
            <Thumnail htmlFor={id}>
              {value.preview ? (
                <img src={value.preview} alt="대표이미지" />
              ) : (
                <span>대표이미지를 선택해 주세요</span>
              )}
            </Thumnail>
          )}
          <CustomButton
            text="이미지 선택"
            feat={feat === "mypage" ? "round" : "tag"}
            onClick={handleButtonClick}
          />
          {feat === "mypage" && (
            <CustomButton
              text="기본이미지"
              feat="underline"
              onClick={e => handlePost(e)}
            />
          )}
          <input
            id={id}
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={value.handleFileChange}
          />
        </ImgWrap>
      ) : type === "editor" ? (
        // ~ editor
        <Editor value={value} />
      ) : type === "ox" ? (
        // ~ ox field
        <Quiz>
          <input
            type="radio"
            name="correct"
            id="O"
            value="O"
            checked={value.value === "O"}
            onChange={value.onChange}
          />
          <label htmlFor="O">O</label>

          <input
            type="radio"
            name="correct"
            id="X"
            value="X"
            checked={value.value === "X"}
            onChange={value.onChange}
          />
          <label htmlFor="X">X</label>
        </Quiz>
      ) : (
        // ~ default input
        <Input
          {...value}
          id={id}
          type={type}
          disabled={disabled}
          placeholder={feat === "login" ? text : ""}
          onKeyDown={handleKeyDowm}
          required
        />
      )}
      <Ment>{ment}</Ment>
    </StyledInput>
  );
}

// ~ common layout
const StyledInput = styled.div`
  display: flex;
  align-items: ${({ feat }) => (feat === "mypage" ? "center" : "flex-start")};
  flex-direction: ${({ feat }) => (feat === "mypage" ? "row" : "column")};
  max-width: ${({ feat }) => feat === "mypage" && "621px"};
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    font-size: 14px;
    flex-direction: ${({ feat }) => feat === "mypage" && "column"};
    align-items: flex-start;
  }
`;

// ~ label
const Label = styled.label`
  display: ${({ feat }) => feat === "login" && "none"};
  width: ${({ feat }) => feat === "mypage" && "25%"};
  margin-bottom: ${({ feat }) => feat === "admin" && "10px"};

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    width: 100%;
    margin-bottom: 10px;
  }
`;

// ~ normal input
const Input = styled.input`
  flex-grow: 1;
  width: 100%;
  height: 2.8em;
  padding: 0 1em;
  font-size: 1em;
  box-sizing: border-box;
  border: ${({ theme }) => theme.color.borderBold};
  border-radius: 0.625em;
  outline: none;

  &:disabled {
    background-color: ${({ theme }) => theme.color.disabeld};
    border: 1px solid ${({ theme }) => theme.color.gray100};
    color: ${({ theme }) => theme.color.gray200};
  }
`;

const ImgWrap = styled.div`
  display: flex;
  align-items: ${({ feat }) => (feat === "admin" ? "flex-end" : "center")};
  font-size: 15px;
  gap: 1em;
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    font-size: 14px;
    flex-direction: ${({ feat }) => feat === "admin" && "column"};
    align-items: ${({ feat }) => feat === "admin" && "flex-start"};
  }
`;

// ~ img
const Thumnail = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 200px;
  border: ${({ theme }) => theme.color.borderBold};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.whiteOp50};
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
`;

// ~ ox
const Quiz = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  input {
    display: none;
  }
  label {
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 10px;
    border: ${({ theme }) => theme.color.borderLight};
    flex-grow: 1;
    padding: 20px 15px;
    cursor: pointer;
  }
  input:checked + label {
    color: ${({ theme }) => theme.color.white};
    border-color: ${({ theme }) => theme.color.main};
    background-color: ${({ theme }) => theme.color.main};
    box-sizing: border-box;
  }
`;
const QuizField = styled.div``;

const Ment = styled.p`
  font-size: 0.77em;
  margin-top: 10px;
  color: ${({ theme }) => theme.color.red};
`;
// ~ ment
