import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteData } from "../../api/apiUtil.js";
import CustomButton from "./CustomButton.jsx";
import { AiOutlineClose } from "react-icons/ai";
import { clearUserInfo } from "../../redux/features/user/userSlice.js";

export default function Dialog({ feat, path, text, closeDialog }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickBack = e => e.target.classList.contains("close") && closeDialog();

  const handleDialog = () => {
    switch (feat) {
      case "로그아웃":
        logout();
        break;
      case "삭제하기":
        deleteItem();
        break;
      case "탈퇴하기":
        deleteUser();
        break;
      case "작성취소":
        navigate(-1);
        break;
    }
    closeDialog();
  };

  // ! logout
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("memberTheme");
    localStorage.removeItem("expirationTime");

    dispatch(clearUserInfo());
    navigate("/");
  };

  // ! delete
  const deleteItem = async () => {
    await deleteData(path);
    navigate("/");
  };

  // 회원 탈퇴
  const deleteUser = () => {
    deleteData("/members/withdrawal");
    localStorage.clear();
    navigate("/");
  };
  return (
    <DialogBack onClick={clickBack} className="close">
      <DialogContainer>
        <DialogClose onClick={closeDialog}>
          <AiOutlineClose />
        </DialogClose>
        <DialogText>
          {text && text.map((el, i) => <p key={i}>{el}</p>)}
        </DialogText>
        <DialogBtnGroup>
          <CustomButton onClick={handleDialog} text={feat} reverse={true} />
          <CustomButton onClick={closeDialog} text="취소" />
        </DialogBtnGroup>
      </DialogContainer>
    </DialogBack>
  );
}
const DialogBack = styled.div`
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
const DialogContainer = styled.div`
  width: 90%;
  max-width: 500px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: ${props => props.theme.white};
  animation: ${show} 0.2s 0s alternate linear 1;
`;
const DialogClose = styled.button`
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 0 0 auto;
  & * {
    font-size: 2em;
    color: ${props => props.theme.text};
  }
`;
const DialogText = styled.div`
  padding: 20px 0 40px 0;
  text-align: center;
  color: ${props => props.theme.text};
  p:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;
const DialogBtnGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;
