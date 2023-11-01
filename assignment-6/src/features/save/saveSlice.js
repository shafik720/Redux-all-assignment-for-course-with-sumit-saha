import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import saveApi from "./saveApi"

const initialState = {
    blogs : {},
    isLoading : false,
    isError : false,
    error : ''
}

export const fetchSave = createAsyncThunk('save/fetchSave', async(id)=>{
    const response = await saveApi(id);
    return response;
})

const saveSlice = createSlice({
    name : 'savePost',
    initialState,
    extraReducers : (builder) =>{
        builder
        .addCase(fetchSave.pending, (state)=>{
            state.blogs = {};
            state.isLoading = true;
            state.isError = false;
            state.error = '';
        })

        .addCase(fetchSave.fulfilled, (state, action)=>{
            state.blogs = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = '';
        })

        .addCase(fetchSave.rejected, (state, action)=>{
            state.blogs = {};
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }
})


export default saveSlice.reducer;