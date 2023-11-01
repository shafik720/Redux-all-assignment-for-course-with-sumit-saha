import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    type : 'all',
    searchText : ''
}


const filterSlice = createSlice({
    name : 'filter',
    initialState,
    reducers : {
        changeFilter : (state, action) => {
            state.type = action.payload;
        },
        searchFilter : (state, action) => {
            state.searchText = action.payload;
        }
    }
})


export default filterSlice.reducer;
export const{changeFilter , searchFilter} = filterSlice.actions;