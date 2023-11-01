import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import singleBlogApi from "./singleBlogApi";


const initialState = {
    blog : {},
    isLoading : false,
    isError : false,
    error : ''
}

export const fetchSingleBlog = createAsyncThunk('singleBlog/fetch', async(id)=>{
    const blogData = await singleBlogApi(id);
    return blogData;
})


const singleBlogSlice = createSlice({
    name : 'blog',
    initialState,
    extraReducers : (builder)=>{
        builder
        .addCase(fetchSingleBlog.pending, (state)=>{
            state.blog = {};
            state.isLoading = true;
            state.isError = false;
            state.error = '';
        })

        .addCase(fetchSingleBlog.fulfilled, (state, action)=>{
            state.blog = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = '';
        })

        .addCase(fetchSingleBlog.rejected, (state, action)=>{
            state.blog = {};
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }  
})

export default singleBlogSlice.reducer;