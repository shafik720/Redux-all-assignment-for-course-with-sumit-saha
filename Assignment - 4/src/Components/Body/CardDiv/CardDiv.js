import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../../../Redux/Thunk/fetchData';
import Card from './Card/Card';

const CardDiv = () => {
    const dispatch = useDispatch();
    // --- getting book list from server
    useEffect(() => {
        dispatch(fetchData)
    }, [dispatch])

    // --- getting redux states
    const bookState = useSelector(state => state.book);
    const filterState = useSelector(state => state.filter);

    // --- filtering book by "featured" and "All" button
    const filterByStatus = (book) => {
        const { status } = filterState;
        switch (status) {
            case 'all':
                return book;

            case 'featured':
                return book.featured;
            default:
                return book;
        }
    }

    // --- filtering book by search results
    const filterBySearch = (book) => {
        const { searchText } = filterState;
        if (book?.name?.toLowerCase().match(searchText?.toLowerCase())) {
            return book;
        } else if (searchText == '') {
            return book;
        }
        else {
            return;
        }
    }

    return (
        bookState.filter(filterByStatus).filter(filterBySearch).map(book => <Card
            key={book.id}
            book={book}
        ></Card>)
    );
};

export default CardDiv;