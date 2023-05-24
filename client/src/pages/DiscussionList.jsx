import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import CustomButton from "../components/common/CustomButton.jsx";
import PageContainer from "../components/common/PageContainer.jsx";
import Discussions from "../components/common/Discussions.jsx";
import Pagination from "../components/common/Pagination.jsx";
import Empty from "../components/common/Empty.jsx";
import searchImg from "../assets/images/search.svg";
import { getData } from "../api/apiUtil.js";

export default function Discussion() {
  const [body, setBody] = useState([]);
  const { userRole } = useSelector(state => state.user);
  const admin = userRole === "ADMIN";
  const [sort, setSort] = useState("");
  const [reverse, setReverse] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  function SearchInput() {
    getData(`/article/search?keyword=${search}`)
      .then(data => {
        setBody(data.result.content);
      })
      .catch(error => {
        console.error(error);
      });
  }
  useEffect(() => {
    getData(`/article?${sort}&page=${page}`)
      .then(data => {
        setBody(data.result.content);
        setTotalPages(data.result.totalPages);
      })
      .catch(error => {
        console.error(error);
      });
  }, [sort, page]);
  return (
    <PageContainer>
      <h2>Discussion</h2>
      <Bar>
        <SortButtons>
          <CustomButton
            text="조회순"
            feat="round"
            reverse={reverse}
            onClick={() => {
              setSort("");
              setReverse(true);
            }}
          />
          <CustomButton
            text="댓글순"
            feat="round"
            reverse={!reverse}
            onClick={() => {
              setSort("sort=comment");
              setReverse(false);
            }}
          />
        </SortButtons>
        {/* 돋보기가 input 안에 들어가도록, 반응형으로 바꾸자 */}
        <Search>
          <input
            onInput={e => {
              setSearch(e.target.value);
            }}
            onKeyDown={e => {
              e.key === "Enter" && SearchInput();
            }}
          />
          <img
            src={searchImg}
            alt="reading glasses"
            height="30px"
            onClick={SearchInput}
            aria-hidden="true"
          />
        </Search>
      </Bar>
      <DiscussionList>
        {body.map(item => {
          return <Discussions body={item} key={item.articleId} />;
        })}
        {!body?.length && <Empty />}
      </DiscussionList>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />

      <DiscussionCreat totalArticle={body?.length}>
        {admin && (
          <CustomButton text="토론글 등록" path="/admin/write/article" />
        )}
      </DiscussionCreat>
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

// ! Empty, admin button group
const DiscussionCreat = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: row-reverse;
  ${({ totalArticle }) =>
    !totalArticle &&
    css`
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding-top: 50px;
      button {
        margin-top: 15px;
      }
    `}
`;
