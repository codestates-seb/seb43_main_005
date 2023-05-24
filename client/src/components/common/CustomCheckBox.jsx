import React, { useState } from "react";
import styled from "styled-components";
import Check from "../../assets/images/check.png";

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
  cursor: pointer;

  &:before {
    content: "";
    height: 24px;
    width: 24px;
    border: ${({ theme }) => theme.borderMain};
    border-radius: 50%;
  }

  &:after {
    border-radius: 50%;
    opacity: 0;
    content: "";
    position: absolute;
    height: 24px;
    width: 24px;
    background-color: ${({ theme }) => theme.main};
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
      background-image: url(${Check});
      background-repeat: no-repeat;
      background-position: center;
      background-size: 15px;
    }
  }
`;

const StyledP = styled.p`
  margin-left: 0.5rem;
  width: calc(100% - 24px);
  line-height: 18px;
`;
