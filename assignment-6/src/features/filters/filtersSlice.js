import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    sort: "default",
    filter: "all",
};


const filtersSlice = createSlice({
  name : "filters",
  initialState,
  reducers : {
      sortSelected : (state, action) => {
          state.sort = action.payload;
      },

      filterSelected : (state, action) =>{
          state.filter = action.payload
      }
  },  
})

export default filtersSlice.reducer;
export const {sortSelected, filterSelected} = filtersSlice.actions;