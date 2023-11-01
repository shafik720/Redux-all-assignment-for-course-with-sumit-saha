import { combineReducers } from "redux";
import { bookReducer } from "./book/bookReducer";
import { editReducer } from "./editBook/editReducer";
import { filterReducer } from "./filter/filterReducer";


export const rootReducer = combineReducers({
    book : bookReducer,
    filter : filterReducer,
    edit : editReducer
})