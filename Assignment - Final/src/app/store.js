import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import videosSliceReducer from '../features/videos/videosSlice';
import assignmentSliceReducer from '../features/assignment/assignmentSlice';
import quizzSliceReducer from '../features/quizz/quizzSlice';
import assignmentMarkSliceReducer from '../features/assingmentMark/assingmentMarkSlice';
import modalSliceReducer from '../features/Modal/modalSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath] : apiSlice.reducer,
    auth : authSliceReducer,
    videos : videosSliceReducer,
    assignment : assignmentSliceReducer,
    quizz : quizzSliceReducer,
    modal : modalSliceReducer,
    assignmentMark : assignmentMarkSliceReducer,
  },
  middleware : (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
});
