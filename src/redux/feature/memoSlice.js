import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  memoList : [],
  sort : "image"
}


const memoSlice = createSlice({
  name : "memo",
  initialState,
  reducers : {
    addMemo : (state, action) => {
      
      state.memoList = [...state.memoList, action.payload];
    },
    removeMemo : (state, action) => {
      state.memoList = state.memoList.filter(
        (memo) => memo.id !== action.payload
      );
    },
  
    modifyMemo: (state, action) => {
      const modifyMemo = action.payload;
      state.memoList = state.memoList.map((memo) => {
        if (memo.id === modifyMemo.id) {
          return { ...memo, ...modifyMemo};
        }
        return memo;
      });
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    

  }
});
export const {addMemo, removeMemo, modifyMemo, setSort} = memoSlice.actions;
export default memoSlice.reducer;