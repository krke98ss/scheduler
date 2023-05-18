import { createSlice } from "@reduxjs/toolkit";
import { isSameDay } from "date-fns";

const initialState = {
  todoList: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    insertTodo: (state, action) => {
      state.todoList = [...state.todoList, action.payload];
    },
    removeTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    modifyTodo: (state, action) => {
      const modifyTodo = action.payload;
      state.todoList = state.todoList.map((todo) => {
        if (todo.id === modifyTodo.id) {
          return { ...todo, ...modifyTodo };
        }
        return todo;
      });
    },
    clean: (state, action) => {
      state.todoList = state.todoList.filter((todo) => !isSameDay(new Date(todo.day), action.payload));
    },
    allClean: (state, action) => {
      state.todoList = [];
    },
    allCheck: (state, action) => {
      state.todoList = state.todoList.map((todo) => {
        if(isSameDay(new Date(todo.day), action.payload)){
          return {...todo, success : true};
        }
        return todo;
      });
    },
    allDecheck: (state, action) => {
      state.todoList = state.todoList.map((todo) => {
        if(isSameDay(new Date(todo.day), action.payload)){
          return {...todo, success : false};
        }
        return todo;
      });
    },
    
  },
});
export const { insertTodo, removeTodo, modifyTodo, clean, allClean, allCheck, allDecheck } = todoSlice.actions;
export default todoSlice.reducer;
