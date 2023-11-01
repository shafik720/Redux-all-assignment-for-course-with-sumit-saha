const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")
const fetch = require('node-fetch');


const initialState = {
    videoTags: [],
    loading: false,
    error: '',
    test: '',
    allVideos: [],
}


const fetchMoreVideos = createAsyncThunk('moreVideo/fetch', async (_, { getState }) => {
    // --- making a string with all the video tags that we got from first reducer
    const state = getState();
    let allVideoTags = state.moreVideo.videoTags;
    let tagString = '?';
    for (let i = 0; i < allVideoTags.length; i++) {
        tagString = tagString + 'tags_like=' + allVideoTags[i];
        if (i !== (allVideoTags.length - 1)) {
            tagString += '&';
        }
    }

    // --- making a dynamic fetching url with the combination of all video tags that we got from the first reducer
    const response = await fetch(`http://localhost:9000/videos${tagString}`);
    
    const data = await response.json();

    // --- sorting the payload's data according to the higher views
    const moreVideos = data.sort((a, b) => {
        const viewsA = parseFloat(a.views);
        const viewsB = parseFloat(b.views);
        return viewsB - viewsA;
    });

    return moreVideos;
})

const moreVideoSlice = createSlice({
    name: 'moreVideo',
    initialState,
    reducers: {
        setTags: (state, action) => {
            state.videoTags = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoreVideos.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        })

        builder.addCase(fetchMoreVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.allVideos = action.payload;
            state.error = '';
        })

        builder.addCase(fetchMoreVideos.rejected, (state, action) => {
            state.loading = false;
            state.allVideos = [];
            state.error = action.error.message;
        })
    }
})

module.exports = moreVideoSlice.reducer;
module.exports.actionCreators = moreVideoSlice.actions;
module.exports.fetchMoreVideos = fetchMoreVideos;
