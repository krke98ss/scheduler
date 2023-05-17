import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info : {id : ""},
  isLogin : false
}


const userSlice = createSlice({
  name : "user",
  initialState,
  reducers : {
    isLogin : (state, action) => {
      state.isLogin = action.payload
    }
  }
});
export const {isLogin} = userSlice.actions;
export default userSlice.reducer;