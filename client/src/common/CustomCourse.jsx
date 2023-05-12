import { Link } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "./CustomButton.jsx";
import CustomProgressBar from "../components/CustomProgressBar.jsx";

export default function CustomCourse({ feat = "default" }) {
  // type = 'default' | 'progress'
  const thumnail =
    "https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/07/redux-logo.png?w=1200&ssl=1";
  const title = "Redux";
  const admin = true;
  // 임시변수

  return (
    <Course>
      <Thumnail>
        <Link to={`/`}>{<img src={thumnail} alt="" />}</Link>
      </Thumnail>
      <Title>
        {feat === "default" && (
          <>
            <CustomButton text={title} feat="course" path={`/`} />
            {admin && <CustomButton feat="tag" text="강좌 편집" path={`/`} />}
          </>
        )}
        {feat === "progress" && (
          <ProgressWrap>
            <h4>{title}</h4>
            <CustomProgressBar
              progress={8}
              feat="simple"
              marginBottom="0.9em"
            />
            <p>{"8"}% complete</p>
          </ProgressWrap>
        )}
      </Title>
    </Course>
  );
}

const Course = styled.figure`
  width: 100%;
  &:hover img {
    transform: scale(1.2);
  }
`;
const Thumnail = styled.div`
  border-radius: 20px;
  border: ${({ theme }) => theme.color.borderBold};
  margin-bottom: 15px;
  overflow: hidden;
  * {
    display: block;
    width: 100%;
    border-radius: inherit;
  }
  img {
    transition-duration: 0.5s;
  }
`;
const Title = styled.figcaption`
  display: grid;
  gap: 1rem;
`;
const ProgressWrap = styled.div`
  font-size: 14px;
  padding: 1.25em;
  border: ${({ theme }) => theme.color.borderBold};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 1.25em;
  h4,
  p {
    font-size: 1em;
  }
  h4 {
    margin-bottom: 0.9em;
  }
  p {
    text-align: center;
  }

  @media ${props => props.theme.mediaQuery.desktop} {
    font-size: 16px;
  }
`;
