import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBook, editExistingBook } from '../../../Redux/book/actionCreators';
import { resetEditState } from '../../../Redux/editBook/actionCreators';
import addData from '../../../Redux/Thunk/addData';
import editData from '../../../Redux/Thunk/editData';

const FormDiv = () => {
    const dispatch = useDispatch();

    // --- getting edit state
    const editState = useSelector(state => state.edit);
    const { editStatus, name, author, thumbnail, price, rating, featured, id } = editState;


    useEffect(() => {
        document.getElementById('input-Bookname').value = name;
        document.getElementById('input-Bookauthor').value = author;
        document.getElementById('input-Bookthumbnail').value = thumbnail;
        document.getElementById('input-Bookprice').value = price;
        document.getElementById('input-Bookrating').value = rating;
        document.getElementById('input-Bookfeatured').checked = featured;
    }, [editState])



    const handleFormSubmit = (e) => {
        e.preventDefault();

        const bookName = e.target.name.value;
        const author = e.target.author.value;
        const thumbnail = e.target.thumbnail.value;
        const price = e.target.price.value;
        const rating = e.target.rating.value;
        const featured = e.target.featured.checked;

        // --- giving condition whether user will edit or add new book
        if (!editStatus) {
            dispatch(addData(bookName, author, thumbnail, price, rating, featured))
        } else {
            dispatch(editData(bookName, author, thumbnail, price, rating, featured, id));
            e.target.reset();
            dispatch(resetEditState());

        }

    }
    return (
        <div className="p-4 overflow-hidden bg-white shadow-cardShadow rounded-md">
            <h4 className="mb-8 text-xl font-bold text-center">{editStatus ? "Edit Book" : "Add New Book"}</h4>
            <form className="book-form" onSubmit={handleFormSubmit}>
                <div className="space-y-2">
                    <label htmlFor="name">Book Name</label>
                    <input required className="text-input" type="text" id="input-Bookname" name="name" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="category">Author</label>
                    <input required className="text-input" type="text" id="input-Bookauthor" name="author" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="image">Image Url</label>
                    <input required className="text-input" type="text" id="input-Bookthumbnail" name="thumbnail" />
                </div>

                <div className="grid grid-cols-2 gap-8 pb-4">
                    <div className="space-y-2">
                        <label htmlFor="price">Price</label>
                        <input required className="text-input" type="number" id="input-Bookprice" name="price" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="quantity">Rating</label>
                        <input required className="text-input" type="number" id="input-Bookrating" name="rating" min="1" max="5" />
                    </div>
                </div>

                <div className="flex items-center">
                    <input id="input-Bookfeatured" type="checkbox" name="featured" className="w-4 h-4" />
                    <label htmlFor="featured" className="ml-2 text-sm"> This is a featured book </label>
                </div>

                <button type="submit" className={`submit ${editStatus && 'editStatus'}`} id="submit">{`${editStatus ? "Update Book" : "Add Book"}`}</button>
            </form>
        </div>
    );
};

export default FormDiv;