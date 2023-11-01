import { editExistingBook } from "../book/actionCreators";


const editData = (bookName, author, thumbnail, price, rating, featured, id) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:9000/books/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: bookName,
                author: author,
                thumbnail: thumbnail,
                price: price,
                rating: rating,
                featured: featured,
            }),
            headers: {
                "Content-type": "application/json ; charset=UTF-8"
            }
        })
        const books = await response.json();


        dispatch(editExistingBook(books.name, books.author, books.thumbnail, books.price, books.rating, books.featured, id));
    }
}

export default editData;