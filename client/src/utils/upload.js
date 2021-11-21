import { create } from "axios";

// create new axios instance to avoid intercepters
const axios = create();

const CLOUD_NAME = "dafrtfylq";
const UPLOAD_PRESET = "wddtjwpo";

export const uploadImageFile = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  const res = await axios({
    method: "POST",
    url,
    withCredentials: false,
    data: formData,
    headers: { "X-Requested-With": "XMLHttpRequest" },
  }).catch((err) => console.log("Image upload failed: " + err));
  return res?.data?.secure_url;
};