import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

import { PURGE } from "redux-persist";

export const addMemo = createAsyncThunk("memo/addMemo", async (newMemo) => {
  try {
    const response = await axios.post("/api/memos", newMemo);
    return newMemo;
  } catch (err) {
    console.log(err);
  }
});

export const fetchMemos = createAsyncThunk(
  "memo/fetchMemos",
  async (userId) => {
    try {
      const response = await axios.get(`/api/memos/${userId}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const modifyMemo = createAsyncThunk(
  "memo/modifyMemo",
  async (modi) => {
    console.log(modi);
    try {
      const response = await axios.patch('/api/memos', modi);
      return modi;
    } catch (err) {
      console.log(err);
    }
  }
);

export const removeMemo = createAsyncThunk(
  "memo/removeMemos",
  async (id) => {
    try {
      const response = await axios.delete(`/api/memos`,
      {data : {id}});
      if(response.data.success){
        return id;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  memoList: [],
  sort: "list",
  status: "idle",
  error: null,
};

const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);

    builder.addCase(addMemo.fulfilled, (state, action) => {
      state.memoList = [...state.memoList, action.payload];
    });
    builder.addCase(fetchMemos.fulfilled, (state, action) => {
      state.memoList = action.payload.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();  
      }).reverse();
    });
    builder.addCase(removeMemo.fulfilled, (state, action) => {
      state.memoList = state.memoList.filter(
        (memo) => memo.id !== action.payload
      );
    });
    builder.addCase(modifyMemo.fulfilled, (state, action) => {
      const modifyMemo = action.payload;
      
      state.memoList = state.memoList.map((memo) => {
        if (memo.id === modifyMemo.id) {
          return { ...memo, ...modifyMemo };
        }
        return memo;
      });
    });
  },
});
export const {setSort} = memoSlice.actions;
export default memoSlice.reducer;
