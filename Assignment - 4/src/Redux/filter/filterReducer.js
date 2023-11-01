import { SEARCH, STATUS } from "./actionIdentifiers"
import { initialState } from "./initialState";


export const filterReducer = (state = initialState, action) => {
    
    if(action.type === STATUS){
        return{
            ...state,
            status  : action.payload
        }
    }else if(action.type === SEARCH){
        return{
            ...state,
            searchText : action.payload
        }
    }
    
    else{
        return state;
    }
}