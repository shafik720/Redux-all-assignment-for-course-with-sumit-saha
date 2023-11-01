import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    searchText : '',
}

const taskSlice = createSlice({
    name : 'task',
    initialState,
    reducers : {
        searchTask : (state, action) => {
            state.searchText = action.payload;
        }
    }
})


export const {searchTask} = taskSlice.actions;
export default taskSlice.reducer;