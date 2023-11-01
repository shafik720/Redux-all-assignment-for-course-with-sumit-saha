import { ADDBOOK, DELETEBOOK, EDITBOOK, LOADDATA } from "./actionIdentifiers"

// --- action for adding a new book
export const addNewBook = (name, author, thumbnail, price, rating, featured, id) => {
    return {
        type: ADDBOOK,
        payload: {
            name,
            author,
            thumbnail,
            price,
            rating,
            featured,
            id
        }
    }
}

// --- action for updating a book
export const editExistingBook = (bookName, author, thumbnail, price, rating, featured, id) => {
    return {
        type: EDITBOOK,
        payload: {
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

// --- action for deleting a book
export const deleteBook = (id) => {
    return {
        type: DELETEBOOK,
        payload: id
    }
}

// --- action for loading books from server
export const loadData = (books) => {
    return {
        type: LOADDATA,
        payload: books
    }
}