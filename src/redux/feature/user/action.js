import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

export const userLogin = createAsyncThunk("user/userLogin", async (user) => {
  try {
    const response = await axios.post("api/auth/login", user);
    return response.data.info;
  } catch (err) {
    if (err?.response.status === 403) {
      throw new Error("아이디 또는 비밀번호가 다릅니다.");
    }
    throw err;
  }
});

export const socialLogin = createAsyncThunk("user/socialLogin", async(credential) => {
  try{
    const response = await axios.post("/api/auth/google", {token : credential});
    console.log(response);
    return response.data;
  }catch(err){

  }
});

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (data) => {
    try {
      console.log(data);
      const response = await axios.patch("api/users", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const setProfileImg = createAsyncThunk(
  "user/setProfileImg",
  async (updateImg) => {
    try {
      const formData = new FormData();
      formData.append("file", updateImg);
      const response = await axios.post("api/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response?.status === 200) {
        return response.data.profile_img;
      }
    } catch (err) {
      if (err.response.status === 419) {
        throw err;
      }
    }
  }
);

export const removeProfileImg = createAsyncThunk(
  "user/setProfileImg",
  async (profile_img) => {
    try {
      const response = await axios.delete(`/api/upload`, {
        data: { profile_img },
      });
      if (response?.status === 200) {
      }
    } catch (err) {
      console.log(err);
    }
  }
);
