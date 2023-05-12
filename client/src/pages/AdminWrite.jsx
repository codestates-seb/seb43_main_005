import styled from "styled-components";
import PageContainer from "../common/PageContainer.jsx";
import CategoryInput from "../components/Admin/CategoryInput.jsx";
import { useEffect } from "react";
import axios from "axios";
import CustomButton from "../common/CustomButton.jsx";

export default function AdminWrite({ type = "course" }) {
  const description = [
    { course: "학습코스" },
    { quiz: "OX 퀴즈" },
    { content: "학습 컨텐츠" },
    { article: "토론주제" },
  ];

  const test = () => {
    axios
      .get("http://13.124.42.111:8080/article?size=20&page=0")
      .then(res => console.log(res));

    // var requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };
    // fetch("http://13.124.42.111:8080/article?size=20&page=0", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log("error", error));
  };

  return (
    <PageContainer>
      <CustomButton onClick={test} text="Test" />
      <Title>
        <h2>{type}</h2>
        <p>
          {description.map((el, i) => (
            <span key={i}>{el[type]}</span>
          ))}
          를 등록해주세요.
        </p>
      </Title>
    </PageContainer>
  );
}

const Title = styled.div`
  margin-bottom: 50px;
  h2 {
    margin-bottom: 20px;
    text-transform: capitalize;
  }
`;
