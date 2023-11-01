import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import likeApi from './likeApi';

const initialState = {
    blogs : {},
    isLoading : false,
    isError : false,
    error : ''
}

export const fetchLike = createAsyncThunk('save/fetchLike', async(id)=>{
    const response = await likeApi(id);
    return response;
})

const likeSlice = createSlice({
    name : 'likePost',
    initialState,
    extraReducers : (builder) =>{
        builder
        .addCase(fetchLike.pending, (state)=>{
            state.blogs = {};
            state.isLoading = true;
            state.isError = false;
            state.error = '';
        })

        .addCase(fetchLike.fulfilled, (state, action)=>{
            state.blogs = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = '';
        })

        .addCase(fetchLike.rejected, (state, action)=>{
            state.blogs = {};
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }
})


export default likeSlice.reducer;