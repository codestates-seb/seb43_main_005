import styled from "styled-components";
import Check from "../../assets/images/check_circle_green.png";

export default function BtnDropdown({ menuArr, selected, setSelected }) {
  const selectMenuHandler = e => {
    setSelected(e.target.selectedIndex);
  };
  return (
    <>
      <BtnBox>
        <BtnDropBox value={selected} onChange={selectMenuHandler}>
          {menuArr.map((ele, index) => {
            return (
              <StyledOption key={index} value={index}>
                {ele.name}
              </StyledOption>
            );
          })}
        </BtnDropBox>
      </BtnBox>
      <div>{menuArr[selected].content}</div>
    </>
  );
}
const BtnBox = styled.div`
  background: url(Check) no-repeat 97% 50%/15px auto;
`;
const BtnDropBox = styled.select`
  width: 100%;
  border: 1px solid ${props => props.theme.main};
  color: ${({ theme }) => theme.mainHover};
  font-size: 1rem;
  line-height: 1.5;
  box-sizing: border-box;
  padding: 12px 15px;
  background-color: transparent;

  // 기본 select 화살표 없애기
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  & > button:not(:last-child) {
    margin-right: 15px;
  }
  @media ${props => props.theme.mediaQuery.mobile} {
    display: flex;
    justify-content: space-around;
    margin-right: 10px;
  }
`;
const StyledOption = styled.option`
  height: 50px;
  background-color: transparent;
  border-radius: 2px;
  color: ${({ theme }) => theme.mainHover};
`;
