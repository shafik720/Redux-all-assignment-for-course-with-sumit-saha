import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';
import projectReducer from '../features/project/projectSlice';
import searchReducer from '../features/tasks/taskSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath] : apiSlice.reducer,
    project : projectReducer,
    search : searchReducer,
  },
  middleware : (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
});
