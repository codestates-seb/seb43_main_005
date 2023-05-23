import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CustomButton from "./CustomButton.jsx";
import CustomProgressBar from "./CustomProgressBar.jsx";
import { getData } from "../../api/apiUtil.js";
import useModal from "../../hooks/useModal.js";
import Alert from "./Alert.jsx";

/**
 *
 * @param feat component style
 * ----- feat = 'default' | 'progress' | 'admin'
 * @param item 서버로 부터 받은 데이터 객체 (progress ver는 객체의 content)
 * @param progress progress ver일때 서버로 부터 받은 데이터 객체의 progress
 *
 */

export default function CustomCourse({ feat = "default", item, progress = 0 }) {
  const { userRole } = useSelector(state => state.user);
  const admin = userRole === "ADMIN";
  const id = item?.contentId;
  const thumnail = item?.contentImg;
  const title = item?.title;
  const navigate = useNavigate();
  const [alert, openAlert, closeAlert] = useModal();

  // ! 코스 진입 get (프로그래스 생성)
  const handleAccess = async e => {
    if (feat === "admin") {
      // 예외처리 - admin 페이지
      e.preventDefault();
      return;
    }

    // 진입할 첫번째 learnId 추출 (learnId는 고유한 값이기 때문에 다른 코스라하더라도 중복되면 안됨)
    try {
      // 프로그래스 생성
      const apiUrl = `contents/${id}`;
      const { result } = await getData(`${apiUrl}/learns`);
      const learnId = !!result.totalElements && result.content[0]?.learnId;
      await getData(`${apiUrl}/access`);
      navigate(`/course/${id}/learn`);
    } catch {
      openAlert();
    }
  };

  return (
    <Course feat={feat}>
      {
        // 예외처리 - 강의 내 생성된 학습 컨텐츠가 없을때 Alert
        alert && (
          <Alert
            redirect={false}
            closeAlert={closeAlert}
            ment={["학습 컨텐츠가 없습니다"]}
          />
        )
      }
      <Thumnail>
        <Link onClick={handleAccess}>{<img src={thumnail} alt="" />}</Link>
      </Thumnail>
      <Title>
        {feat === "default" ? (
          <>
            <CustomButton text={title} feat="course" onClick={handleAccess} />
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
              progress={progress}
              feat="simple"
              marginBottom="0.9em"
            />
            <p>{progress}% complete</p>
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
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-top: 56.25%;
  /* 비율유지 */
  border-radius: 20px;
  border: ${({ theme }) => theme.borderBold};
  margin-bottom: 15px;
  overflow: hidden;
  * {
    display: block;
    border-radius: inherit;
  }
  img {
    transition-duration: 0.5s;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
const Title = styled.figcaption`
  display: grid;
  gap: 1rem;
  .normalTitle {
    border: ${({ theme }) => theme.borderBold};
    background-color: ${({ theme }) => theme.white};
    font-size: 1em;
    padding: 20px 10px;
    border-radius: 1.25em;
    line-height: 1.3em;
  }
`;
const ProgressWrap = styled.div`
  font-size: 14px;
  padding: 1.25em;
  border: ${({ theme }) => theme.borderBold};
  background-color: ${({ theme }) => theme.white};
  border-radius: 1.25em;
  h4,
  p {
    font-size: 1em;
  }
  h4 {
    width: 100%;
    margin-bottom: 0.9em;
  }
  p {
    text-align: center;
  }

  @media ${props => props.theme.mediaQuery.desktop} {
    font-size: 16px;
  }
`;
