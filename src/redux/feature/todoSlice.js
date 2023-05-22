import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isSameDay } from "date-fns";
import { PURGE } from 'redux-persist';
import axios from '../../api/axios';



export const addTodo = createAsyncThunk("todo/addTodo", async (newTodo) => {
  try {
    const response = await axios.post("/api/todos", newTodo);
    return newTodo;
  } catch (err) {
    console.log(err);
  }
});


export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (userId) => {
    try {
      
      const response = await axios.get(`/api/todos/${userId}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const modifyTodo = createAsyncThunk(
  "memo/modifyTodo",
  async (modi) => {
    console.log(modi);
    try {
      const response = await axios.patch('/api/todos', modi);
      return modi;
    } catch (err) {
      console.log(err);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todo/removeTodo",
  async (id) => {
    try {
      const response = await axios.delete(`/api/todos`,
      {data : {id}});
      if(response.data.success){
        return id;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const clean = createAsyncThunk(
  "todo/clean",
  async (param) => {
    try {
      const response = await axios.delete(`/api/todos`,
      {data : {param}});
      if(response.data.success){
        return param;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const allCheck = createAsyncThunk(
  "todo/allCheck",
  async (param) => {
    try {
      const response = await axios.patch(`/api/todos`, param);
      if(response.data.success){
        return param;
      }
    } catch (err) {
      console.log(err);
    }
  }
);



const initialState = {
  todoList: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers : builder => {
    builder.addCase(PURGE, () => initialState);

    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todoList = [...state.todoList, action.payload];
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todoList = action.payload.map((todo) => {
        if(todo.success === '1'){
          return {...todo, success : true}
        }
          return {...todo, success : false}
      }).sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();  
      }).reverse();

    });
    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    });
    builder.addCase(modifyTodo.fulfilled, (state, action) => {
      const modifyTodo = action.payload;
      state.todoList = state.todoList.map((todo) => {
        if (todo.id === modifyTodo.id) {
          return { ...todo, ...modifyTodo };
        }
        return todo;
      });
    });

    builder.addCase(clean.fulfilled, (state, action) => {
      state.todoList = state.todoList.filter((todo) => !isSameDay(new Date(todo.date), action.payload.date));
    });

    builder.addCase(allCheck.fulfilled, (state, action) => {
      const {date, success}= action.payload
      console.log(date);
      state.todoList = state.todoList.map((todo) => {
        if(isSameDay(new Date(todo.date), date)){
          return {...todo, success};
        }
        return todo;
      });
    });
  }
});
export const {allDecheck } = todoSlice.actions;
export default todoSlice.reducer;
