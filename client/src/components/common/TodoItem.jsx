import React from "react";
import styled, { css } from "styled-components";
import checkbox_check from "../../assets/images/checkbox_check.png";
const Todo = styled.li`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  &:last-of-type {
    margin-bottom: 3rem;
  }
`;

const CheckBox = styled.input`
  /* border-radius: 1px solod black; */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0 none;
`;

const Label = styled.label`
  cursor: pointer;
`;

const CustomCheck = styled.span`
  display: inline-block;
  width: 1.3rem;
  height: 1.3rem;
  border: 1px solid black;
  border-radius: 50%;
  transition-duration: 0.15s;
  background-position: center;
  background-repeat: no-repeat;
  ${CheckBox}:checked + ${Label} & {
    background-color: var(--brand-color);
    border-color: var(--brand-color);
    background-size: 13px;
    /* background-image: url("/images/checkox_checked.png"); */
    background-image: url(${checkbox_check});
  }
`;

const Text = styled.p`
  font-size: 1em;
  margin-left: 0.6rem;
`;

export default function TodoItem({ item, onCheck, onEdit }) {
  const { id, text, status } = item;

  const handleCheck = e => e.target.tagName === "INPUT" && onCheck(e.target);
  const handleEdit = e => onEdit(e.target, e.target.innerText);

  return (
    <Todo>
      <CheckBox
        type="checkbox"
        id={id}
        checked={status === "done"}
        onChange={handleCheck}
      />
      <Label htmlFor={id} onClick={handleCheck}>
        <CustomCheck></CustomCheck>
      </Label>
      <Text data-id={id} onClick={handleEdit}>
        {text}
      </Text>
    </Todo>
  );
}
