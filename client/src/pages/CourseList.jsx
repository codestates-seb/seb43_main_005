import React from "react";
import styled from "styled-components";
import PageContainer from "../components/common/PageContainer.jsx";
import CustomButton from "../components/common/CustomButton.jsx";
import search from "../assets/images/search.svg";
import CustomCourse from "../components/common/CustomCourse.jsx";

export default function CourseList() {
  return (
    <PageContainer>
      <h2>Roadmap</h2>
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
      <CourseContainer>
        <CustomCourse></CustomCourse>
        <CustomCourse></CustomCourse>
        <CustomCourse></CustomCourse>
        <CustomCourse></CustomCourse>
      </CourseContainer>
    </PageContainer>
  );
}

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const Search = styled.div`
  border-bottom: 1.5px solid black;
  input {
    height: 40px;
    width: 40vw;
    border: none;
    :focus {
      outline: none;
    }
    background-color: ${({ theme }) => theme.color.bg};
  }
`;

const CourseContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  figure {
    margin: 10px;

    @media ${props => props.theme.mediaQuery.desktop} {
      flex: 0 1 30%;
    }

    @media ${props => props.theme.mediaQuery.tablet} {
      flex: 0 1 40%;
    }
    @media ${props => props.theme.mediaQuery.mobile} {
      flex: 1 1 auto;
    }
  }
`;
