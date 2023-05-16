import { Link } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "./CustomButton.jsx";
import CustomProgressBar from "./CustomProgressBar.jsx";

/**
 *
 * @param feat component style
 * ----- feat = 'default' | 'progress' | 'admin'
 * @param item 서버로 부터 받은 데이터 객체
 *
 */

export default function CustomCourse({ feat = "default", item }) {
  const admin = true;
  // 임시변수

  const id = item?.contentId;
  const thumnail = item?.contentImg;
  const title = item?.title;
  const path = `/course/${id}`;

  return (
    <Course feat={feat}>
      <Thumnail>
        <Link to={path} onClick={e => feat === "admin" && e.preventDefault()}>
          {<img src={thumnail} alt="" />}
        </Link>
      </Thumnail>
      <Title>
        {feat === "default" ? (
          <>
            <CustomButton text={title} feat="course" path={path} />
            {admin && (
              <CustomButton
                feat="tag"
                text="강좌 편집"
                path={`/admin`}
                item={item}
              />
            )}
          </>
        ) : feat === "progress" ? (
          <ProgressWrap>
            <h4>{title}</h4>
            <CustomProgressBar
              progress={8}
              feat="simple"
              marginBottom="0.9em"
            />
            <p>{"8"}% complete</p>
          </ProgressWrap>
        ) : (
          <h3 className="normalTitle">{title}</h3>
        )}
      </Title>
    </Course>
  );
}

const Course = styled.figure`
  width: 100%;

  &:hover img {
    transform: ${({ feat }) => feat !== "admin" && "scale(1.2)"};
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
  .normalTitle {
    border: ${({ theme }) => theme.color.borderBold};
    background-color: ${({ theme }) => theme.color.white};
    font-size: 1em;
    padding: 20px 10px;
    border-radius: 1.25em;
  }
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
