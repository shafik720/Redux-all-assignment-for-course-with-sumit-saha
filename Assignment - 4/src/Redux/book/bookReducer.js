import { ADDBOOK, DELETEBOOK, EDITBOOK, LOADDATA } from "./actionIdentifiers";
import { initialState } from "./initialState";


export const bookReducer = (state = initialState, action) => {
    if (action.type === ADDBOOK) {
        return [
            ...state,
            {
                name: action.payload.name,
                author: action.payload.author,
                thumbnail: action.payload.thumbnail,
                price: action.payload.price,
                rating: action.payload.rating,
                featured: action.payload.featured,
                id: action.payload.id,
            }
        ]
    } else if (action.type === EDITBOOK) {
        return state.map(book => {
            if (book.id === action.payload.id) {
                return {
                    ...book,
                    name: action.payload.bookName,
                    author: action.payload.author,
                    thumbnail: action.payload.thumbnail,
                    price: action.payload.price,
                    rating: action.payload.rating,
                    featured: action.payload.featured,
                }
            } else {
                return book;
            }
        });
    } else if (action.type === DELETEBOOK) {
        return state.filter(book => book.id !== action.payload);
    } else if (action.type === LOADDATA) {
        return action.payload;
    }
    else {
        return state;
    }
}