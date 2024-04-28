import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import loadingSlice from './loadingSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingSlice,
  },
});

export default store;
