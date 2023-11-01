import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import relatedBlogsApi from "./relatedBlogApi";



const initialState = {
    relatedBlogs : [],
    isLoading : false,
    isError : false,
    error : ''
}

export const fetchRelatedBlogs = createAsyncThunk('blogs/fetchBlogs', async({ tags, id })=>{
    const blogsData = await relatedBlogsApi({ tags, id });
    return blogsData;
})


const relatedBlogslice = createSlice({
    name : 'relatedBlogs',
    initialState,
    extraReducers : (builder)=>{
        builder
        .addCase(fetchRelatedBlogs.pending, (state)=>{
            state.relatedBlogs = [];
            state.isLoading = true;
            state.isError = false;
            state.error = '';
        })

        .addCase(fetchRelatedBlogs.fulfilled, (state, action)=>{
            state.relatedBlogs = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = '';
        })

        .addCase(fetchRelatedBlogs.rejected, (state, action)=>{
            state.relatedBlogs = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }  
})

export default relatedBlogslice.reducer;