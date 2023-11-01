import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleBlog } from '../../../../features/singleBlog/singleBlogSlice';
import CardTags from '../../../Main/Body/BlogsCard/CardTags/CardTags';

const RelatedSinglePost = ({blogs}) => {
    const {id, title, description, image, tags, likes, isSaved, createdAt,} = blogs ; 

    const dispatch = useDispatch();
    const refreshPage = () =>{
        dispatch(fetchSingleBlog(id))
    }
    return (
        <div className="card">
            <Link onClick={refreshPage} to={`/main/${id}`}>
                <img src={image} className="card-image" alt="" />
            </Link>
            <div className="p-4">
                <a href="post.html" className="text-lg post-title lws-RelatedPostTitle">
                    {title}
                        </a>
                <div className="mb-0 tags">
                {tags?.map(tag => <CardTags key={Math.random()} tag={tag}></CardTags>)}
                </div>
                <p>{createdAt}</p>
            </div>
        </div>
    );
};

export default RelatedSinglePost;