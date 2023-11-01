import { deleteBook } from "../book/actionCreators";


const deleteData = (id) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:9000/books/${id}`, {
            method: "DELETE"
        })


        dispatch(deleteBook(id));
    }
}

export default deleteData;