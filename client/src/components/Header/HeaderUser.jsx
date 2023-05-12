import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useModal from "../../hooks/useModal.js";
import Dialog from "../common/Dialog.jsx";
import CustomButton from "../common/CustomButton.jsx";

const img =
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80";
// dummy img

export default function HeaderUser({ login }) {
  const [drop, setDrop] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  const dropRef = useRef();
  const navigate = useNavigate();
  const [logout, openLogout, closeLogout] = useModal(false);

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDrop(false);
        setProfileClick(false);
      } else {
        setProfileClick(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropRef]);
  // 영역밖 클릭 시 DropBox close

  const handleNav = path => {
    path ? navigate(path) : openLogout();
    setDrop(false);
  };
  // redirect 후 DropBox close

  const handleDrop = () => {
    setProfileClick(prev => !prev);
    profileClick ? setDrop(true) : setDrop(false);
  };
  // Profile 클릭시 토글

  return (
    <>
      {login ? (
        <Profile onClick={handleDrop} />
      ) : (
        <CustomButton text="login" feat="round" path="/user/login" />
      )}
      {drop && (
        <DropBox ref={dropRef}>
          <Drop onClick={() => handleNav("/mypage")}>마이페이지</Drop>
          <Drop onClick={() => handleNav()}>로그아웃</Drop>
        </DropBox>
      )}
      {logout && (
        <Dialog
          feat="로그아웃"
          text={["로그아웃 하시겠습니까?"]}
          closeDialog={closeLogout}
        />
      )}
    </>
  );
}

const Profile = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.color.main};
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  @media ${props => props.theme.mediaQuery.mobile} {
    width: 34px;
    height: 34px;
  }
`;

const DropBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 110px;
  padding: 4px 0;
  position: absolute;
  z-index: 1;
  right: 0;
  top: 50px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.color.main};
  background-color: ${props => props.theme.color.white};
`;
const Drop = styled.button`
  font-size: 0.875em;
  padding: 4px 0;

  &:hover {
    color: ${props => props.theme.color.main};
  }
`;
