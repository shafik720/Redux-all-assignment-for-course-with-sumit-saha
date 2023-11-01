import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isModal : false
}

const modalSlice = createSlice({
    name : 'modal',
    initialState,
    reducers : {
        modalOn : (state, action) => {
            state.isModal = true;
        },
        modalOff : (state, action) => {
            state.isModal = false;
        }
    }
})

export default modalSlice.reducer ; 
export const {modalOn, modalOff} = modalSlice.actions ; 