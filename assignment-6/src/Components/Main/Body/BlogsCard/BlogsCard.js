import React from 'react';
import { Link } from 'react-router-dom';
import cardImg from '../../../../assets/images/git.webp';
import CardTags from './CardTags/CardTags';

const BlogsCard = ({blogs}) => {
    const {id, title, description, image, tags, likes, isSaved, createdAt,} = blogs
    return (
        <div className="lws-card">
            <Link to={`main/${id}`}>
                <img src={image} className="lws-card-image" alt="" />
            </Link>
            <div className="p-4">
                <div className="lws-card-header">
                    <p className="lws-publishedDate">{createdAt}</p>
                    <p className="lws-likeCount"><i className="fa-regular fa-thumbs-up"></i>  {likes}</p>
                </div>
                <Link to={`main/${id}`} className="lws-postTitle"> {title} </Link>
                <div className="lws-tags">{tags.map(tag=><CardTags key={Math.random()} tag={tag}></CardTags>)}</div>
                {/* <!-- Show this element if post is saved --> */}
                <div className="flex gap-2 mt-4">
                    <span className="lws-badge"> {isSaved && 'Saved'} </span>
                </div>
                {/* <!-- Show this element if post is saved Ends --> */}
            </div>
        </div>
    );
};

export default BlogsCard;