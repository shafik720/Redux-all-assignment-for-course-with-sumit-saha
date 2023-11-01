import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from '../features/blogs/blogsSlice';
import filtersReducer from '../features/filters/filtersSlice';
import singleBlogReducer from '../features/singleBlog/singleBlogSlice';
import relatedBlogReducer from '../features/relatedBlogSlice/relatedBlogSlice'
import saveReducer from '../features/save/saveSlice'
import likeReducer from '../features/like/likeSlice'

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    singleBlog :singleBlogReducer ,
    filters : filtersReducer,
    relatedBlog : relatedBlogReducer,
    savePost : saveReducer,
    likePost : likeReducer,
  },
});
