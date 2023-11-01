import { EDIT, RESET } from "./actionIdentifiers";
import { initialState } from "./initialState";


export const editReducer = (state = initialState, action) => {
    if (action.type === EDIT) {
        // console.log(action.payload.bookName)
        return {
            ...state,
            editStatus: action.payload.editStatus,
            name: action.payload.bookName,
            author: action.payload.author,
            thumbnail: action.payload.thumbnail,
            price: action.payload.price,
            rating: action.payload.rating,
            featured: action.payload.featured,
            id : action.payload.id
        }
    } else if(action.type === RESET){
        return initialState;
    }
    
    else {
        return state;
    }
}