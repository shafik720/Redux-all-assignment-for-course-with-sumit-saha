import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useEditBookMutation } from '../../../features/api/apiSlice';

const EditForm = ({ book }) => {
    const {
        id, 
        author : initialAuthor, 
        featured : initialFeatured, 
        name : initialName, 
        price : initialPrice, 
        rating : initialRating, 
        thumbnail : initialThumbnail
    } = book;
    
    const [editBook, {isLoading, isError, isSuccess}] = useEditBookMutation();

    const [name, setName] = useState(initialName);
    const [author, setAuthor] = useState(initialAuthor);
    const [thumbnail, setThumbnail] = useState(initialThumbnail);
    const [price, setPrice] = useState(initialPrice);
    const [rating, setRating] = useState(initialRating);
    const [featured, setFeatured] = useState(initialFeatured);


    const handleEditSubmit = (e) => {
        e.preventDefault();
        editBook({
            id,
            data : {
                name,
                author, 
                thumbnail,
                price,
                rating,
                featured,
            }
        });
    }


    // --- TAKING USER HOME IF THE BOOK WAS EDITED SUCCESSFULLY
    const navigate = useNavigate();
    const backToHome = () => {
        navigate('/');
    }

    useEffect(()=>{
        if(isSuccess){
            backToHome();
        }
    },[isSuccess])

    return (
        <div>
            <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
            <form className="book-form" onSubmit={handleEditSubmit}>
                <div className="space-y-2">
                    <label htmlFor="lws-bookName">Book Name</label>
                    <input required className="text-input" type="text" id="lws-bookName" name="name" value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <label htmlFor="lws-author">Author</label>
                    <input required className="text-input" type="text" id="lws-author" name="author" value={author} onChange={e => setAuthor(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <label htmlFor="lws-thumbnail">Image Url</label>
                    <input required className="text-input" type="text" id="lws-thumbnail" name="thumbnail" value={thumbnail} onChange={e => setThumbnail(e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-8 pb-4">
                    <div className="space-y-2">
                        <label htmlFor="lws-price">Price</label>
                        <input required className="text-input" type="number" id="lws-price" name="price" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="lws-rating">Rating</label>
                        <input required className="text-input" type="number" id="lws-rating" name="rating" min="1"
                            max="5" value={rating} onChange={e => setRating(e.target.value)} />
                    </div>
                </div>

                <div className="flex items-center">
                    <input id="lws-featured" type="checkbox" name="featured" className="w-4 h-4" checked={featured} onChange={() => setFeatured(!featured)} />
                    <label htmlFor="lws-featured" className="ml-2 text-sm"> This is a featured book </label>
                </div>

                <button type="submit" className="submit" id="lws-submit">Edit Book</button>
            </form>
        </div>
    );
};

export default EditForm;