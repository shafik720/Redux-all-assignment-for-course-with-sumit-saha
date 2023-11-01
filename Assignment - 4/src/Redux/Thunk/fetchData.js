import { loadData } from "../book/actionCreators";


const fetchData = async(dispatch) => {
    const response = await fetch('http://localhost:9000/books')
    const books = await response.json();

    dispatch(loadData(books));
}

export default fetchData ;