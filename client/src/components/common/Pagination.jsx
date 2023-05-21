import React from "react";
import styled from "styled-components";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function Pagination({ page, setPage, totalPages }) {
  // ! page arr
  const pagination = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // ! page controller
  const handlePage = control => {
    control === "prev" ? setPage(prev => prev - 1) : setPage(prev => prev + 1);
  };

  return (
    <PaginationWrap>
      <PageControl
        className="prev"
        disabled={page === 0}
        onClick={() => handlePage("prev")}>
        <GrFormPrevious />
      </PageControl>
      <PageNumber>
        {pagination.map((pageNum, i) => (
          <Page
            key={pageNum}
            className={i === page ? "active" : ""}
            onClick={() => setPage(i)}>
            {pageNum}
          </Page>
        ))}
      </PageNumber>
      <PageControl
        className="next"
        disabled={page === totalPages - 1}
        onClick={() => handlePage("next")}>
        <GrFormNext />
      </PageControl>
    </PaginationWrap>
  );
}

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
  button {
    border-radius: 0.2rem;
    border: ${({ theme }) => theme.borderMain};
    width: 30px;
    height: 30px;
    &:not(:disabled):hover,
    &.active {
      background-color: ${({ theme }) => theme.main};
      color: ${({ theme }) => theme.white};
      svg * {
        stroke: ${({ theme }) => theme.white};
      }
    }
    &:disabled {
      cursor: default;
      border: 1px solid ${({ theme }) => theme.gray100};

      svg * {
        stroke: ${({ theme }) => theme.gray100};
      }
    }
  }
`;
const PageNumber = styled.div`
  display: flex;
  gap: 0.3rem;
`;
const Page = styled.button`
  color: ${({ theme }) => theme.main};
`;
const PageControl = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  svg * {
    stroke: ${({ theme }) => theme.main};
  }
`;
