import { createSlice } from "@reduxjs/toolkit" ; 


const initialState = {
    currentVideo: {
        id: 1,
        title: "Debounce Function in JavaScript - JavaScript Job Interview question",
        description: "In this video, I have explained about the debounce function in JavaScript. This is a common question interviewers ask at Job Interviews. If you watch this video carefully, you will understand what is debounce and how to handle it with custom debounce function.",
        url: "https://www.youtube.com/embed/dD9O8DnIBj4",
        views: "51.2K",
        duration: "5:30",
        createdAt: "2023-01-15T15:17:01.727Z"
    }
}

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        changeVideo: (state, action) => {
            state.currentVideo = action.payload;
        }
    }
})

export default videosSlice.reducer;
export const { changeVideo } = videosSlice.actions;