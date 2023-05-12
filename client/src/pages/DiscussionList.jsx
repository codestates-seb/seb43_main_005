import React from "react";
import styled from "styled-components";
import CustomButton from "../components/common/CustomButton.jsx";
import PageContainer from "../components/common/PageContainer.jsx";
import search from "../assets/images/search.svg";
import Discussions from "../components/common/Discussions.jsx";
export default function Discussion() {
  return (
    <PageContainer>
      <h2>Discussion</h2>
      <Bar>
        <form>
          <CustomButton text="최신순" feat="round" reverse="true" />
          <CustomButton text="댓글순" feat="round" />
        </form>
        {/* 돋보기가 input 안에 들어가도록, 반응형으로 바꾸자 */}
        <Search>
          <input></input>
          <img src={search} alt="reading glasses" height="30px" />
        </Search>
      </Bar>
      {/* 맵, 페이지네이션, 어드민 토론글 작성  */}
      <Discussions
        title="123123123131231231231312231123123131223123131231231231312312312313123123123131231231231312s12313"
        createdAt="2023.05.11"
        view="25"
        commentCount="10"
      />
      {/* 어드민만 보이도록 해야된다. */}
      <DiscussionCreat>
        <CustomButton text="토론글 작성" rounded="true" />
      </DiscussionCreat>
    </PageContainer>
  );
}
const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Search = styled.div`
  border-bottom: 1.5px solid black;
  input {
    height: 40px;
    width: 40vw;
    border: none;

    background-color: ${({ theme }) => theme.color.bg};
  }
`;

const DiscussionCreat = styled.div`
  float: right;
`;
