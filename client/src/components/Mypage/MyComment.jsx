import styled from "styled-components";
import ProfileImage from "../common/ProfileImage.jsx";
import { getData } from "../../api/apiUtil.js";
import React, { useEffect, useState } from "react";
import MyDebateComments from "./MyDebateComments.jsx";

export default function MyComment() {
  // 내가 작성한 토론글 목록 get => 임시, 버튼 누르면 불러오기
  // 불러온대로 페이지네이션으로 보여주기

  // 임시 랜덤이미지 => 서버에서 유저 프로필 이미지 받아오기
  let userProfileImage = "https://source.unsplash.com/random/300x300/?animal";

  // Comment 가져오기
  const [body, setBody] = useState([]);

  function myCommentCheck() {
    getData(`/members/my-comment?${sort}&size=5`)
      .then(res => {
        console.log(res.result.content);
        setBody(res.result.content);
      })
      .catch(error => console.log(error));
  }

  // let userProfileImage =  content[n].member.profileImage

  // 정렬 : 버튼 누르면 sort 별로 요청하기
  const [sort, setSort] = useState("");
  useEffect(() => {
    getData(`/members/my-comment?${sort}`)
      .then(data => {
        setBody(data.result.content);
      })
      .catch(error => {
        console.error(error);
      });
  }, [sort]);
  // 정렬 버튼
  const Sort = e => {
    // console.log(e.target.value);
    setSort(e.target.value);
  };
  useEffect(() => {
    myCommentCheck();
  }, [sort]);

  // DebateTitle 클릭 시 해당 토론글로 이동하기
  return (
    <>
      <DebateContainer className="DebateContainer">
        <button value="default" onClick={e => Sort(e)}>
          등록순
        </button>
        <button value="createdAt" onClick={e => Sort(e)}>
          최신순
        </button>
        <button value="likes" onClick={e => Sort(e)}>
          추천순
        </button>
        {/* <button onClick={myCommentCheck}>불러오기</button> */}
        <CommentContainer>
          {body.map(item => {
            return <MyDebateComments body={item} key={item.articleCommentId} />;
          })}
        </CommentContainer>
      </DebateContainer>
    </>
  );
}

const DebateContainer = styled.section`
  display: flex;
  flex-direction: column;
`;
const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  background-color: ${props => props.theme.white};
  border: ${props => props.theme.borderBold};
  border-radius: 10px;
  margin-bottom: 20px;
`;
const CommentBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
`;
const DebateTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 12px;
`;
const MyComments = styled.div`
  font-size: 0.8rem;
  margin-bottom: 10px;
`;
const CommentDate = styled.div`
  font-size: 0.7rem;
  color: ${props => props.theme.gray200};
`;
