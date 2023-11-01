import { addNewBook } from "../book/actionCreators";


const addData = (name, author, thumbnail, price, rating, featured) => {
    return async (dispatch) => {
        const response = await fetch('http://localhost:9000/books', {
            method: "POST",
            body: JSON.stringify({
                name: name,
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
        
        dispatch(addNewBook(books.name, books.author, books.thumbnail, books.price, books.rating, books.featured, books.id));
    }
}

export default addData;