import styled from "styled-components";
import ProfileImage from "../common/ProfileImage.jsx";
import { getComment } from "../../api/apiUtil.js";
import useEffect from "react";

export default function MyComment() {
  // 내가 작성한 토론글 목록 get => 임시, 버튼 누르면 불러오기
  // 불러온대로 페이지네이션으로 보여주기
  // 정렬 : 버튼 누르면 sort 별로 요청하기
  // function myCommentCheck() {
  //   getComment({ page: 5, size: 10, sort: "likes" }, "/members/my-comment")
  //     .then(res => {
  //       console.log(res.result);
  //     })
  //     .catch(error => console.log(error));
  // }
  // useEffect(() => {
  //   myCommentCheck();
  // }, []);

  // 임시 랜덤이미지 => 전역 상태에서 받아오기
  let userProfileImage = "https://source.unsplash.com/random/300x300/?animal";
  // DebateTitle 클릭 시 해당 토론글로 이동하기
  return (
    <>
      <DebateContainer className="DebateContainer">
        {/* <button onClick={myCommentCheck}>불러오기</button> */}
        <CommentContainer>
          <ProfileImage profileImg={userProfileImage} feat="mycomment" />
          <CommentBox>
            <DebateTitle>리덕스 상태관리?</DebateTitle>
            <MyComments>toolkit?</MyComments>
            <CommentDate>2023.05.11</CommentDate>
          </CommentBox>
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
