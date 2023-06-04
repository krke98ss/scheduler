import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../api/axios';
import { persistor } from '../../store';


export const addSchedule = createAsyncThunk("schedule/addSchedule", async (data) => {
  try {
    const response =await axios.post("api/schdule", data);
    return data;
    
  } catch (err) {
    if(err.response.status === 419){
      persistor.purge();
    }
  }
});

export const fetchSchedules = createAsyncThunk("schedule/fetchSchedules", async () => {
  try {
    const response =await axios.get("api/schdule");
    return response.data;
    
  } catch (err) {
    if(err.response.status === 419){
      persistor.purge();
    }
  }
});


export const removeSchedule = createAsyncThunk("schedule/removeSchedule", async (id) => {
  
  try {
    const response = await axios.delete(`/api/schdule`, {data : {id}});
    if(response.data.success){
      return id;
    }
  } catch (err) {
    if(err.response.status === 419){
      persistor.purge();
    }
  }
});



