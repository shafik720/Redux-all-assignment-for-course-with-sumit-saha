import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useGetSingleBookQuery } from '../../features/api/apiSlice';
import EditForm from './EditForm/EditForm';

const EditBook = () => {
    const params = useParams();
    const { id } = params;

    const { data: book, isError, isLoading, isSuccess } = useGetSingleBookQuery(id);

    let content = null;
    if (isLoading && !isError) {
        content = <h1>Loading...</h1>
    }
    if (!isLoading && isError) {
        content = <h1>There was an error loading the booklist !</h1>
    }
    if (!isLoading && !isError && !book.id) {
        content = <h1>No book found</h1>
    }
    if (!isLoading && !isError && book.id) {
        content = <EditForm book={book}></EditForm>
    }
    return (
        <main className="py-6 2xl:px-6">
            <div className="container">
                <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
                    {content}
                </div>
            </div>
        </main>
    );
};

export default EditBook;