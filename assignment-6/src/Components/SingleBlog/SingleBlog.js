import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchSingleBlog } from '../../features/singleBlog/singleBlogSlice';
import Loading from '../Loading/Loading';
import Blog from './Blog/Blog';
import RelatedPosts from './RelatedPosts/RelatedPosts';

const SingleBlog = () => {
    const params = useParams().blogId;
    // console.log(params);

    const dispatch = useDispatch();
    const singleBlogState = useSelector(state => state.singleBlog);
    const{blog, isLoading, isError, error} = singleBlogState;
    
    // --- grabbing tags & id for showing related blogs
    const {tags, id} = singleBlogState.blog  ;

    useEffect(()=>{
        dispatch(fetchSingleBlog(params))
    },[dispatch]);

    let content = null;
    
    // --- when the data will be in loading state
    if(isLoading && !isError) content = <Loading></Loading> ;

    // --- when there will be error in loading data
    if(!isLoading && isError) content = <div className="col-span-12">{error}</div>;

    // --- when unfortunately no videos will be found
    if(!isLoading && !isError && !blog) content = <div className="col-span-12">No videos found!</div>;

    // --- when data will be loaded successfullty
    if(!isLoading && !isError && blog) content = <Blog blog={blog}></Blog>;
    return (
        <div>
            {/* --- Home Icon --- */}
            <div className="container mt-8">
                <Link to="/" className="inline-block text-gray-600 home-btn" id="lws-goHome"><i
                    className="mr-2 fa-solid fa-house"></i>Go Home</Link>
            </div>

            {/* --- Blog Post & Related Post --- */}
            <section className="post-page-container">
                {/* <!-- detailed post  --> */}
                {content}

                {/* <!-- related posts --> */}
                <RelatedPosts tags={tags} id={id}></RelatedPosts>
            </section>
        </div>
    );
};

export default SingleBlog;