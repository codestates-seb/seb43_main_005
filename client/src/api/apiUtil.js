import instance from "./core";

// get
const getData = url => instance({ url });

// 내가 작성한 토론글 목록 get
const getComment = (data, url) => {
  return instance({
    url,
    data,
  });
};

// post, patch
const updateData = (data, url, method = "post") => {
  return instance({
    method,
    url,
    data,
  });
};

// 출석체크
const attendance = (url, method = "post") => {
  return instance({
    method,
    url,
  });
};

// post formData, and return images url
const getImagesUrl = data => {
  return instance({
    method: "post",
    url: "/upload",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// delete
const deleteData = url => {
  return instance({
    method: "delete",
    url,
  });
};

export {
  getData,
  getComment,
  updateData,
  attendance,
  getImagesUrl,
  deleteData,
};
