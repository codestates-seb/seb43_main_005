import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CustomButton from "../components/common/CustomButton.jsx";
import PageContainer from "../components/common/PageContainer.jsx";
import search from "../assets/images/search.svg";
import Discussions from "../components/common/Discussions.jsx";
import { getData } from "../api/apiUtil.js";
export default function Discussion() {
  const [body, setBody] = useState([]);
  const { userRole } = useSelector(state => state.user);
  const admin = userRole === "ADMIN";

  useEffect(() => {
    getData("/article")
      .then(data => {
        setBody(data.result.content);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <PageContainer>
      <h2>Discussion</h2>
      <Bar>
        <SortButtons>
          <CustomButton text="최신순" feat="round" reverse="true" />
          <CustomButton text="댓글순" feat="round" />
        </SortButtons>
        {/* 돋보기가 input 안에 들어가도록, 반응형으로 바꾸자 */}
        <Search>
          <input></input>
          <img src={search} alt="reading glasses" height="30px" />
        </Search>
      </Bar>
      {/* 맵, 페이지네이션, 어드민 토론글 작성  */}
      <DiscussionList>
        {body.map(item => {
          return <Discussions body={item} key={item.articleId} />;
        })}
      </DiscussionList>
      {/* 어드민만 보이도록 해야된다. */}
      {admin && (
        <DiscussionCreat>
          <CustomButton text="토론글 등록" path="/admin/write/article" />
        </DiscussionCreat>
      )}
    </PageContainer>
  );
}
const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SortButtons = styled.div`
  & > :nth-child(1) {
    margin-right: 15px;
  }
`;

const Search = styled.div`
  border-bottom: 1.5px solid black;
  display: flex;
  @media ${props => props.theme.mediaQuery.desktop} {
    width: 400px;
  }
  @media ${props => props.theme.mediaQuery.tablet} {
    width: 400px;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    width: 100%;
  }
  input {
    flex: 1 1 auto;
    height: 40px;

    border: none;
    :focus {
      outline: none;
    }
    background-color: ${({ theme }) => theme.bg};
  }
`;

const DiscussionList = styled.div`
  margin: 50px 0px;
`;

const DiscussionCreat = styled.div`
  float: right;
`;
