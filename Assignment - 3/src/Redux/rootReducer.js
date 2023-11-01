import { combineReducers } from "redux";
import { productReducer } from "./AddProduct/productReducer";
import { cartReducer } from "./cart/cartReducer";
import { toggleReducer } from "./ToggleDiv/toggleReducer";


export const rootReducer = combineReducers({
    product : productReducer,
    cart : cartReducer,
    toggle : toggleReducer
})