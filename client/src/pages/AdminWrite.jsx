import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageContainer from "../components/common/PageContainer.jsx";
import CustomButton from "../components/common/CustomButton.jsx";
import CustomInput from "../components/common/CustomInput.jsx";
import useInput from "../hooks/useInput.js";
import useUploadImg from "../hooks/useUploadImg.js";
import { getImagesUrl, updateData } from "../api/apiUtil.js";
import useModal from "../hooks/useModal.js";
import Dialog from "../components/common/Dialog.jsx";

export default function AdminWrite({ mode = "post" }) {
  const navigate = useNavigate();
  const { feat, courseId, id } = useParams();
  const [dialog, openDialog, closeDialog] = useModal();

  // ! patch 필수 속성
  const { state } = useLocation();
  const item = state?.item;

  const types = {
    course: {
      description: "강의",
      path: mode === "post" ? `/contents` : `/contents/${id}`,
      fields: [
        { key: "contentImg", value: "대표 사진" },
        { key: "title", value: "강의 이름" },
      ],
    },
    quiz: {
      description: "OX 퀴즈",
      path:
        mode === "post"
          ? `/contents/${courseId}/quizzes`
          : `/contents/${courseId}/quizzes/${id}`,
      fields: [
        { key: "detail", value: "내용" },
        { key: "example", value: "예시" },
        { key: "correct", value: "정답" },
        { key: "commentary", value: "해설" },
      ],
    },
    content: {
      description: "학습 컨텐츠",
      path:
        mode === "post"
          ? `/contents/${courseId}/learns`
          : `/contents/${courseId}/learns/${id}`,
      fields: [
        { key: "title", value: "제목" },
        { key: "content", value: "내용" },
      ],
    },
    article: {
      description: "토론 주제",
      path: mode === "post" ? "/article" : `/article/${id}`,
      fields: [
        { key: "title", value: "제목" },
        { key: "content", value: "내용" },
      ],
    },
  };

  const [contentImg, payload] = useUploadImg(item?.contentImg);
  const [title, titleReset] = useInput(item?.title || "");
  const [content, conentReset] = useInput(item?.content || "", "editor");
  // course, content, article
  const [detail, detailReset] = useInput(item?.detail || "", "editor");
  const [example, exampleReset] = useInput(item?.example || "", "editor");
  const [correct, correctReset] = useInput(item?.correct ? "O" : "X");
  const [commentary, comentaryReset] = useInput(
    item?.commentary || "",
    "editor"
  );
  const [result, resultReset] = useInput(item?.result || "", "editor");
  // quiz

  const fieldValue = {
    contentImg,
    title,
    content,
    detail,
    example,
    commentary,
    result,
    correct,
  };

  // ! 썸네일 인터셉터
  const interceptor = () => {
    // 강좌수정시 대표사진 변경안하면 500 -> 요청 전에 /upload로 이미지 요청 보내기 때문
    // edit 모드에서 이미지 payload가 없다면 img요청 안하고 바로 return
    if (!payload) return contentImg.preview;
    return getImagesUrl(payload).then(res => res.result);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const contentImg = feat === "course" && (await interceptor());
    const payload =
      feat === "course"
        ? {
            title: title.value,
            contentImg,
          }
        : feat === "quiz"
        ? {
            detail: detail.value,
            example: example.value,
            correct: correct.value === "O" ? true : false,
            commentary: commentary.value,
          }
        : {
            title: title.value,
            content: content.value,
          };

    // updateData(payload, types[feat].path, mode).then(res => {
    //   console.log(res);
    //   navigate("/");
    // });
    console.log(payload);
    console.log(types[feat].path);
    // console.log(mode);
  };

  return (
    <PageContainer h2Margin="1rem">
      <h2>{feat}</h2>
      <Content>
        <Description>{types[feat].description}를 등록해주세요.</Description>

        <Form>
          {types[feat].fields.map(field => {
            return field.key === "contentImg" ? (
              <CustomInput
                key={field.key}
                id={field.key}
                feat="admin"
                text={field.value}
                value={fieldValue[field.key]}
                type="img"
              />
            ) : field.key === "title" ? (
              <CustomInput
                key={field.key}
                id={field.key}
                feat="admin"
                text={field.value}
                value={fieldValue[field.key]}
              />
            ) : field.key === "correct" ? (
              <CustomInput
                key={field.key}
                id={field.key}
                feat="admin"
                text={field.value}
                value={fieldValue[field.key]}
                type="ox"
              />
            ) : (
              <CustomInput
                key={field.key}
                id={field.key}
                feat="admin"
                text={field.value}
                value={fieldValue[field.key]}
                type="editor"
              />
            );
          })}
        </Form>

        <ButtonWrap>
          <CustomButton onClick={handleSubmit} text="작성" reverse />
          <CustomButton type="reset" text="취소" onClick={openDialog} />
        </ButtonWrap>
      </Content>
      {dialog && (
        <Dialog
          closeDialog={closeDialog}
          feat="작성취소"
          text={["작성 중인 게시글이 있습니다.", "취소하시겠습니까?"]}
        />
      )}
    </PageContainer>
  );
}

const Content = styled.fieldset``;
const Description = styled.legend`
  margin-bottom: 50px;
`;

const Form = styled.form`
  display: grid;
  gap: 30px;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 60px;
`;
