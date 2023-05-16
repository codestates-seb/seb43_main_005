// import React, { useEffect } from "react";
// import kakaoIcon from "../../assets/images/icon_sns_kakao.svg";
// import styled from "styled-components";
// // const { Kakao } = window;
// function KakaoShateBtn(props) {
//   const url = "";
//   const resultUrl = window.location.href;

//   useEffect(() => {
//     window.Kakao.init("77f0bbf6099f6b081f907b40197fbd9f");
//     // window.Kakao.isInitialized();
//   }, []);

//   window.Kakao.Link.sendDefault({
//     objectType: "feed",
//     content: {
//       title: "오늘의 디저트",
//       description: "아메리카노, 빵, 케익",
//       imageUrl:
//         "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
//       link: {
//         mobileWebUrl: "https://developers.kakao.com",
//         webUrl: "https://developers.kakao.com",
//       },
//     },
//     itemContent: {
//       profileText: "Kakao",
//       profileImageUrl:
//         "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
//       titleImageUrl:
//         "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
//       titleImageText: "Cheese cake",
//       titleImageCategory: "Cake",
//       items: [
//         {
//           item: "Cake1",
//           itemOp: "1000원",
//         },
//         {
//           item: "Cake2",
//           itemOp: "2000원",
//         },
//         {
//           item: "Cake3",
//           itemOp: "3000원",
//         },
//         {
//           item: "Cake4",
//           itemOp: "4000원",
//         },
//         {
//           item: "Cake5",
//           itemOp: "5000원",
//         },
//       ],
//       sum: "총 결제금액",
//       sumOp: "15000원",
//     },
//     social: {
//       likeCount: 10,
//       commentCount: 20,
//       sharedCount: 30,
//     },
//     buttons: [
//       {
//         title: "웹으로 이동",
//         link: {
//           mobileWebUrl: "https://developers.kakao.com",
//           webUrl: "https://developers.kakao.com",
//         },
//       },
//       {
//         title: "앱으로 이동",
//         link: {
//           mobileWebUrl: "https://developers.kakao.com",
//           webUrl: "https://developers.kakao.com",
//         },
//       },
//     ],
//   });

//   return <KakaoStyleBtn />;
// }

// export default KakaoShateBtn;

// const KakaoStyleBtn = styled.button`
//   background: url(${kakaoIcon}) no-repeat center center;
//   border: 1px solid black;
//   width: 60px;
//   height: 60px;
//   border-radius: 30px;

//   :hover {
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
//   }
// `;
