import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../api/axios';




export const userLogin = createAsyncThunk("todo/userLogin", async (user) => {
  try {
    const response =await axios.post("api/auth/login", user);
    return response.data.info;
    
  } catch (err) {
    if(err?.response.status === 403){
      throw new Error("아이디 또는 비밀번호가 다릅니다.");
    }
    throw err;
  }
});

export const editProfile = createAsyncThunk("todo/editProfile", async (data) => {
  try {
    console.log(data);
    const response =await axios.patch("api/users", data);
    return data;
    
  } catch (err) {
    console.log(err);
  }
})

export const setProfileImg = createAsyncThunk("todo/setProfileImg", async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post("api/users/profile", formData, {headers :  {'Content-Type': 'multipart/form-data'}});  
    if(response?.status === 200){
      const fileUrl = URL.createObjectURL(file);
      return fileUrl;
    }    
    
    
  } catch (err) {
    if(err.response.status === 419){
      throw err;
    }
    
  }
})
