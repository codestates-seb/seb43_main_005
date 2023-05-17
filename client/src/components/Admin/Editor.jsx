import { useMemo, useRef } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useUploadImg from "../../hooks/useUploadImg";

export default function Editor({ value }) {
  // ! image parsing
  const quillRef = useRef();
  const parsingImg = data => {
    // console.log("parsingImg");
    const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
    const range = editor.getSelection(); // 현재 커서 위치 가져옴
    editor.insertEmbed(range.index, "image", data); // parsing
  };
  // ! hook -> parsingImg
  const handleFileChange = useUploadImg("", "editor", parsingImg);
  // ! image parsing
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.addEventListener("change", handleFileChange);
    // console.log("imageHandler");
  };

  // ! 렌더링 될때마다 modules생성되는 현상 방지
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic"],
          ["link", "blockquote", "code", "image"],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = [
    "header",
    "bold",
    "italic",
    "link",
    "blockquote",
    "code",
    "image",
    "align",
    "list",
    "clean",
  ];

  return (
    <EditorWrap>
      <ReactQuill
        {...value}
        ref={quillRef}
        id="body"
        modules={modules}
        formats={formats}
      />
    </EditorWrap>
  );
}

const EditorWrap = styled.div`
  width: 100%;
  .ql-snow {
    font-size: 1em;
    border: ${({ theme }) => theme.color.borderBold};
    background-color: ${({ theme }) => theme.color.white};
  }
  .ql-toolbar {
    border-radius: 0.625em 0.625em 0 0;
    border-bottom: none;
  }
  .ql-container {
    border-radius: 0 0 0.625em 0.625em;
  }
  .ql-editor {
    height: 100%;
    min-height: 210px;
  }
`;
