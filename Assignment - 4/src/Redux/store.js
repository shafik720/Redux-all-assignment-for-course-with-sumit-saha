import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./rootReducer";
import thunk from 'redux-thunk'




export const store = createStore(rootReducer, applyMiddleware(thunk));