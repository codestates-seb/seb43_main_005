import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CustomProgressBar from "./CustomProgressBar.jsx";
import { IoIosArrowBack } from "react-icons/io";
import CustomCheckBox from "./CustomCheckBox.jsx";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";

function CustomSideBar(props) {
  const [titleData, setTitleData] = useState(null);
  const [checkboxStatuses, setCheckboxStatuses] = useState([]);
  const { id } = useParams();
  // console.log(id);
  const token = localStorage.getItem("access_token");
  const host = process.env.REACT_APP_BASE_URL;

  // `${host}/contents/${id}/learns?size=20&page=0`
  // http://13.124.42.111:8080/contents/1/learns?size=20&page=0
  useEffect(() => {
    axios
      .get(`${host}/contents/${id}/learns?size=20&page=0`, {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        setTitleData(response.result);
        console.log(titleData);
      })
      .catch(error => {
        console.error("타이틀 불러오기 에러");
      });
  }, []); // 빈 배열을 종속성으로 넘겨주어 컴포넌트가 처음 마운트될 때만 실행하게 함

  const [titles, setTitles] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Learn styled" },
    { id: 3, text: "Build a todo " },
    { id: 4, text: "OX 문제" },
  ]);
  useEffect(() => {
    // titles 배열을 기반으로 체크박스 상태 초기화
    const initialStatuses = titles.map(title => ({
      id: title.id,
      text: title.text,
      checked: false,
    }));
    setCheckboxStatuses(initialStatuses);
  }, [titles]);

  const handleCheckChange = id => {
    setCheckboxStatuses(prevStatuses =>
      prevStatuses.map(status =>
        status.id === id ? { ...status, checked: !status.checked } : status
      )
    );
  };
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.state?.from) {
      navigate(location.state.from, { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <SideBarContainer>
      <InnerContainer>
        <h2>
          <IoIosArrowBack onClick={goBack} /> Redux
        </h2>
        <CustomProgressBar progress={50} feat={"simple"} />
        <CustomCheckBox />
        {/* {titleData?.map(status => (
          <CustomCheckBox
            key={status.id}
            text={status.text}
            checked={status.checked}
            onCheck={() => handleCheckChange(status.id)}
          />
        ))} */}
      </InnerContainer>
    </SideBarContainer>
  );
}

export default CustomSideBar;

const IconWrapper = styled.div``;

const SideBarContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  height: calc(100vh - 60px);
  width: 250px;

  box-sizing: border-box;
`;

const InnerContainer = styled.div`
  padding: 30px;
  height: calc(100% - 60px); // 100px을 빼줌으로써 상하에 각각 50px의 공백 생성
  border-right: 2px solid ${props => props.theme.main};
  overflow-y: scroll;
  > h2 {
    display: flex;
    align-items: center; // 아이템들을 세로축 중앙으로 정렬합니다.
    margin-bottom: 20px;
  }
`;
