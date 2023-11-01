import { SEARCH, STATUS } from "./actionIdentifiers"


export const changeStatus = (status) => {
    // console.log('clicked') ;
    return{
        type : STATUS,
        payload : status
    }
}

export const searchFromReducer = (searchText) => {
    return{
        type : SEARCH,
        payload : searchText
    }
}