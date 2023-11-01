import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    projectList : ['Scoreboard', 'Flight Booking', 'Product Cart', 'Book Store', 'Blog Application' , 'Job Finder'],
}


const projectSlice = createSlice({
    name : 'project',
    initialState,
    reducers :{
        showProject : (state, action) => {
            state.projectList.push(action.payload);
        },
        removeProject : (state, action) => {
            const indexToRemove = state.projectList.indexOf(action.payload);
            if(indexToRemove !== -1){
                state.projectList.splice(indexToRemove, 1);
            }
        }
    }, 
})

export default projectSlice.reducer ; 
export const {showProject , removeProject} = projectSlice.actions ;  