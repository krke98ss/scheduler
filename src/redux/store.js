import storage from 'redux-persist/lib/storage';
import userReducer from "./feature/user/userSlice";
import todoReducer from "./feature/todoSlice";
import memoReducer from "./feature/memoSlice";
import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import { configureStore } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';


const persistConfig = {
  key : "root",
  version : 1,
  storage,
  blacklist : ['auth']
}

const authConfig = {
  key : 'auth',
  storage,
  blacklist: ['error']
}



const rootReducer = combineReducers({
  user : persistReducer(authConfig, userReducer),
  todo : todoReducer,
  memo : memoReducer
})

const persistedReducer  = rootReducer;

const store = configureStore({
  reducer : persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store);

export default store;
