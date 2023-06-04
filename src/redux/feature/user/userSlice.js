import {createSlice} from '@reduxjs/toolkit';

import { PURGE } from 'redux-persist';
import { editProfile, removeProfileImg, setProfileImg, socialLogin, userLogin } from './action';

const initialState = {
  info : null,
  isLogin : false,
  status : 'idle',
  error : null
}

const userSlice = createSlice({
  name : "user",
  initialState,
  reducers : {
    setProps : (state, action) => {
      state.info = {...state.info, ...action.payload};
    },
    
  },
  extraReducers : builder => {
    builder.addCase(PURGE, () => initialState);
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLogin = true;
      state.info = action.payload;
    });
    builder.addCase(socialLogin.fulfilled, (state, action) => {
      state.isLogin = true;
      state.info = action.payload;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      const error = action.error;
      state.error = error.message;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.info = {...state.info, ...action.payload};
    });
    builder.addCase(setProfileImg.fulfilled, (state, action) => {
      state.info = {...state.info, profile_img : action.payload};
    });
  
  }


});
export const { setProps} = userSlice.actions;
export default userSlice.reducer;