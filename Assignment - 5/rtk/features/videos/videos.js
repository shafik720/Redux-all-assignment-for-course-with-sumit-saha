const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")
const fetch = require('node-fetch');


const initialState = {
    tags: [
        "sass",
        "css",
        "ui"
    ],
    loading: false,
    firstVideo: [],
    error: ''
}

const fetchVideos = createAsyncThunk('videos/fetchVideos', async () => {
    const response = await fetch('http://localhost:9000/videos');
    const video = await response.json();

    return video;
})


const videoSlice = createSlice({
    name: 'video',
    initialState,

    extraReducers: (builder) => {

        builder.addCase(fetchVideos.pending, (state, action) => {
            state.loading = true;
            state.firstVideo = [];
            state.error = '';
        });

        builder.addCase(fetchVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.firstVideo = action.payload;
            state.tags = action.payload.tags;
        });

        builder.addCase(fetchVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.tags = [];
            state.firstVideo = [];
        })
    }
})

module.exports = videoSlice.reducer;
module.exports.fetchVideos = fetchVideos;