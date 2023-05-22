import styled from "styled-components";
import search from "../../assets/images/search.svg";
import SearchIcon from "../../assets/images/SearchIcon.jsx";

export default function SearchBar({ value }) {
  return (
    <Search>
      <input type="search" {...value} />
      <button type="button" aria-label="검색버튼">
        <SearchIcon width="3em" />
      </button>
    </Search>
  );
}

const Search = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: ${({ theme }) => theme.borderBold};
  input {
    font-size: 1em;
    flex-grow: 1;
    outline: none;
    padding: 0;
    border-width: 0;
    background-color: transparent;
  }
  button {
    font-size: 8px; // svg img 크기 조절
    width: 30px;
    height: 30px;
    background-image: url(${search});
  }
  /* common */

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    max-width: 520px;
  }
  /* desktop */
`;
