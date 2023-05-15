import instance from "./core";

// get
const getData = url => instance({ url });

// post, patch
const updateData = (data, url, method = "post") => {
  return instance({
    method,
    url,
    data,
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

export { getData, updateData, getImagesUrl, deleteData };
