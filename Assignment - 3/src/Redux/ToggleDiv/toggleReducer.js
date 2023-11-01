import { TOGGLEFALSE, TOGGLETRUE } from "./actionIdentifiers"

const initialState = {
    currentToggle: false
}

export const toggleReducer = (state = initialState, action) => {
    if (action.type === TOGGLEFALSE) {
        return {
            ...state,
            currentToggle: false,
        }
    } else if (action.type === TOGGLETRUE) {
        return {
            ...state,
            currentToggle: true,
        }
    }
    else {
        return state;
    }
}