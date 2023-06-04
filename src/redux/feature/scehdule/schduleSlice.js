import {createSlice} from '@reduxjs/toolkit';

import { PURGE } from 'redux-persist';
import { addSchedule, fetchSchedules, removeSchedule } from './action';

const initialState = {
  scheduleList : [],
  status : 'idle',
  error : null
}

const scheduleSlice = createSlice({
  name : "schedule",
  initialState,
  reducers : {
  },
  extraReducers : builder => {
    builder.addCase(PURGE, () => initialState);
    builder.addCase(addSchedule.fulfilled, (state, action) => {
      state.scheduleList = [...state.scheduleList, action.payload];
    });
    builder.addCase(addSchedule.rejected, () => initialState);

    builder.addCase(fetchSchedules.fulfilled, (state, action) => {
      state.scheduleList = action.payload;
    });

    builder.addCase(removeSchedule.fulfilled, (state, action) => {
      console.log(action.payload);
      state.scheduleList = state.scheduleList.filter(
        (schedule) => schedule.id !== action.payload
      );
    });
    
    
  }


});
export const {} = scheduleSlice.actions;
export default scheduleSlice.reducer;