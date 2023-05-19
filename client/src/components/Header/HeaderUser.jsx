import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useModal from "../../hooks/useModal.js";
import Dialog from "../common/Dialog.jsx";
import CustomButton from "../common/CustomButton.jsx";
import ProfileImage from "../common/ProfileImage.jsx";

export default function HeaderUser({ profileImage }) {
  const [drop, setDrop] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  const dropRef = useRef();
  const navigate = useNavigate();
  const [logout, openLogout, closeLogout] = useModal(false);

  // ! 영역밖 클릭 시 DropBox close
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

  // ! Profile 클릭시 토글
  const handleDrop = () => {
    setProfileClick(prev => !prev);
    profileClick ? setDrop(true) : setDrop(false);
  };

  // ! redirect 후 DropBox close
  const handleNav = path => {
    path ? navigate(path) : openLogout();
    setDrop(false);
  };

  return (
    <>
      {profileImage ? (
        <ProfileImage
          feat="header"
          profileImg={profileImage}
          onClick={handleDrop}
        />
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
