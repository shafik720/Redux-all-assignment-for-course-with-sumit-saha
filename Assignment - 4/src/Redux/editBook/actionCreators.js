import { EDIT, RESET } from "./actionIdentifiers"


export const edit = (editStatus, bookName, author, thumbnail, price, rating, featured, id) => {
    return {
        type: EDIT,
        payload: {
            editStatus,
            bookName,
            author,
            thumbnail,
            price,
            rating,
            featured,
            id
        }
    }
}

export const resetEditState = () => {
    return{
        type : RESET,
    }
}