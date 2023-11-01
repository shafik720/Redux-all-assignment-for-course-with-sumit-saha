import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import blogsApi from "./blogsApi"


const initialState = {
    blogs : [],
    isLoading : false,
    isError : false,
    error : ''
}

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async({sort, filter})=>{
    const blogsData = await blogsApi({sort, filter});
    return blogsData;
})


const blogsSlice = createSlice({
    name : 'blogs',
    initialState,
    extraReducers : (builder)=>{
        builder
        .addCase(fetchBlogs.pending, (state)=>{
            state.blogs = [];
            state.isLoading = true;
            state.isError = false;
            state.error = '';
        })

        .addCase(fetchBlogs.fulfilled, (state, action)=>{
            state.blogs = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = '';
        })

        .addCase(fetchBlogs.rejected, (state, action)=>{
            state.blogs = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }  
})

export default blogsSlice.reducer;