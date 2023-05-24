import styled from "styled-components";
import { getData } from "../../api/apiUtil.js";
import React, { useEffect, useState } from "react";
import MyDebateComments from "./MyDebateComments.jsx";
import Pagination from "../common/Pagination.jsx";

export default function MyComment() {
  const [body, setBody] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // const [sort, setSort] = useState("");

  function getMyComment() {
    getData(`/members/my-comment?page=${page}`)
      .then(res => {
        // console.log(res.result.content);
        setBody(res.result.content);
        setTotalPages(res.result.totalPages);
      })
      .catch(error => console.log(error));
  }

  // sort : 작성순, 최신순, 추천순
  const [sortTool, setSortTool] = useState(1);
  function defaltSort() {
    getData(`/members/my-comment?s&page=${page}`)
      .then(data => {
        setBody(data.result.content);
      })
      .catch(error => {
        console.error(error);
      });
  }
  function getCommentSort(e) {
    const sort = e.target.value;
    getData(`/members/my-comment?sort=${sort}&page=${page}`)
      .then(data => {
        setBody(data.result.content);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    getMyComment();
  }, [page]);

  return (
    <>
      <DebateContainer className="DebateContainer">
        <CommitBar sortTool={sortTool}>
          {/* <div>댓글 {body.commentCount}</div> */}
          <button
            onClick={e => {
              setSortTool(1);
              defaltSort();
            }}>
            작성순
          </button>
          <button
            value="createdAt"
            onClick={e => {
              setSortTool(2);
              getCommentSort(e);
            }}>
            최신순
          </button>
          <button
            value="likes"
            onClick={e => {
              setSortTool(3);
              getCommentSort(e);
            }}>
            추천순
          </button>
        </CommitBar>
        {body.map(item => {
          return <MyDebateComments body={item} key={item.articleCommentId} />;
        })}
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </DebateContainer>
    </>
  );
}

const DebateContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const CommitBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  * {
    font-size: 1.25em;
  }
  div {
    margin-right: 20px;
  }

  & > first-child {
    ${({ sortTool }) =>
      sortTool === 1 &&
      `
        color: ${({ theme }) => theme.main};
        font-weight: bold;
      `};
  }

  & > :nth-child(2) {
    ${({ sortTool }) =>
      sortTool === 2 &&
      `
        color: ${({ theme }) => theme.main};
        font-weight: bold;
      `};
    ::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 8px;
      margin-right: 10px;
      border-right: 1px solid ${({ theme }) => theme.gray100};
    }
    ::after {
      content: "";
      display: inline-block;
      width: 10px;
      height: 8px;
      margin-right: 10px;
      border-right: 1px solid ${({ theme }) => theme.gray100};
    }
  }
  & > :nth-child(3) {
    ${({ sortTool }) =>
      sortTool === 3 &&
      `
        color: ${({ theme }) => theme.main};
        font-weight: bold;
      `};
  }
`;
