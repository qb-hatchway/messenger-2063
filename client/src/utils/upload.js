import { create } from "axios";

// create new axios instance to avoid intercepters
const axios = create();

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;

export const uploadImageFile = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  try {
    const res = await axios({
      method: "POST",
      url,
      withCredentials: false,
      data: formData,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
    return res?.data?.secure_url || null;
  } catch (error) {
    console.error("Image upload failed: " + error);
  }
};
