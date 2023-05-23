import React, { useState } from "react";
import styled from "styled-components";
import checkbox_check from "../../assets/images/checkbox_check.png";
import checkbox_uncheck from "../../assets/images/checkbox_uncheck.png";

function CheckBox({ text = "테스트", onClick, checked }) {
  const [isChecked, setIsChecked] = useState(true); // 초기 상태를 체크된 상태로 설정

  const handleCheck = () => {
    setIsChecked(!isChecked); // 체크박스 클릭 시 상태 반전
  };

  return (
    <CheckboxContainer>
      <StyledInput
        type="checkbox"
        id={text}
        name={text}
        onChange={handleCheck}
        onClick={onClick}
        checked={checked}></StyledInput>
      <StyledLabel htmlFor={text}>
        <StyledP>{text}</StyledP>
      </StyledLabel>
    </CheckboxContainer>
  );
}

export default CheckBox;

const CheckboxContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  &:last-of-type {
    margin-bottom: 20px;
  }
`;

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;

  &:before {
    content: "";
    height: 24px;
    width: 24px;
    background-image: url(${checkbox_uncheck});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  &:after {
    opacity: 0;
    content: "";
    position: absolute;
    height: 24px;
    width: 24px;
    border-radius: 0.35rem;
    background-image: url(${checkbox_check});
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
  }
`;

const StyledInput = styled.input`
  border-radius: 1px solod black;
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 1 none;
  &:checked + ${StyledLabel} {
    :after {
      opacity: 1;
    }
  }
`;

const StyledP = styled.p`
  margin-left: 0.5rem;
  width: calc(100% - 24px);
`;
