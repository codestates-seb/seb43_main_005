import { useState, useCallback } from "react";
import { getImagesUrl } from "../api/apiUtil";

export default function useUploadImg(initialValue, isEditor, parsingImg) {
  const [preview, setPreview] = useState(initialValue); // base64 url
  const [payload, setPayload] = useState(); // form data
  // const [message, setMessage] = useState("");

  const handleFileChange = useCallback(e => {
    const files = e.target.files ? e.target.files : [];
    if (!files.length || !window.FileReader) return;
    // file 형식 제한
    if (/^image/.test(files[0].type)) {
      // img formdata 형식으로 변환
      const formData = new FormData();
      formData.append("images", files[0]);
      setPayload(formData);

      // 에티터에 파싱할 경우 post
      if (isEditor) {
        getImagesUrl(formData).then(res => {
          parsingImg(res.result);
          console.log(res);
        });
      }

      // preview url(base64) return
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener("loadend", e => setPreview(e.target.result));
    } else {
      console.log("잘못된 형식의 파일입니다");
    }
  }, []);

  const bind = {
    preview,
    handleFileChange,
  };

  return isEditor ? handleFileChange : [bind, payload];
}
