import React from 'react';
import { useGetBooksQuery } from '../../features/api/apiSlice';
import BookCard from './BookCard/BookCard';
import BooklistNavbar from './BooklistNavbar/BooklistNavbar';
import { useSelector } from 'react-redux';

const Main = () => {
    const {data : books, isLoading,  isError, isSuccess} = useGetBooksQuery();
    
    // --- GETTING FILTER STATE TO SHOW BOOK ACCORDING TO FILTER
    const filterState = useSelector(state => state.filter);
    const{type, searchText} = filterState;
    // console.log(searchText);

    // --- FILTERING BOOK LIST ACCORDING TO FEATURE OR ALL 
    const filterByFeature = (book)=>{
        if(type === 'featured'){
            return book.featured;
        }else{
            return book;
        }
    }

    // --- FILTERING BOOK LIST ACCORDING TO SEARCH
    const filterBySearch = (book) => {
        return book.name.toLowerCase().includes(searchText.toLowerCase())
    }

    let content = null ;
    if(isLoading && !isError){
        content = <h1>Loading...</h1>
    }
    if(!isLoading && isError){
        content = <h1>There was an error loading the booklist !</h1>
    }
    if(!isLoading && !isError && books.length === 0) {
        content = <h1>No books found</h1>
    }
    if(!isLoading && !isError && books.length > 0) {
        content = books.filter(filterBySearch).filter(filterByFeature).map(book => <BookCard key={book.id} book={book}></BookCard>)
    }
    return (
        <main className="py-12 px-6 2xl:px-6 container">
            <div className="order-2 xl:-order-1">

                <BooklistNavbar></BooklistNavbar>

                <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* <!-- Card  --> */}
                    {content}
                </div>
            </div>
        </main>
    );
};

export default Main;