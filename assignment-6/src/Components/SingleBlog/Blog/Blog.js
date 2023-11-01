import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLike } from '../../../features/like/likeSlice';
import { fetchSave } from '../../../features/save/saveSlice';
import CardTags from '../../Main/Body/BlogsCard/CardTags/CardTags';

const Blog = ({ blog }) => {
    const { id, title, description, image, tags, likes, isSaved, createdAt, } = blog;
    const saveState = useSelector((state) => state.savePost);

    let[saved, setSaved] = useState(isSaved);
    let[totalLike, setTotalLike] = useState(likes);
    
    const dispatch = useDispatch();
    const saveHandler = () =>{
        dispatch(fetchSave(id)); 
        setSaved(!saved); 
    }

    const likeHandler = () =>{
        dispatch(fetchLike(id));
        setTotalLike(totalLike+1);
    }
    return (
        <main className="post">
            <img src={image} alt="githum" className="w-full rounded-md" id="lws-megaThumb" />
            <div>
                <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
                    {title}
                </h1>
                <div className="tags" id="lws-singleTags">
                    {tags?.map(tag => <CardTags key={Math.random()} tag={tag}></CardTags>)}
                </div>
                <div className="btn-group">
                    {/* <!-- handle like on button click --> */}
                    <button className="like-btn" id="lws-singleLinks" onClick={likeHandler}>
                        <i className="fa-regular fa-thumbs-up"></i> {totalLike}
                    </button>
                    {/* <!-- handle save on button click --> */}
                    {/* <!-- use ".active" class and "Saved" text  if a post is saved, other wise "Save" --> */}
                    <button onClick={saveHandler} className={`save-btn ${saved && 'active'}`} id="lws-singleSavedBtn">
                        <i className="fa-regular fa-bookmark"></i> {saved ? 'Saved' : 'Save'}
                    </button>
                </div>
                <div className="mt-6">
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Blog;