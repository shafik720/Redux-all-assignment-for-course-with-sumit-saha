import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../../features/blogs/blogsSlice';
import BlogsCard from './BlogsCard/BlogsCard';
import Loading from '../../Loading/Loading';

const Body = () => {
    // --- getting state for all blogs post
    const blogsState = useSelector((state) => state.blogs);
    const{blogs, isLoading, isError, error} = blogsState;
    // console.log(blogs);

    // --- getting state for filtering
    const filterState = useSelector(state => state.filters);
    const{sort, filter} = filterState;
    // console.log(filterState);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchBlogs({sort, filter}))
    },[dispatch, filterState]);

    let content = null;
    
    // --- when the data will be in loading state
    if(isLoading && !isError) content = <Loading></Loading> ;

    // --- when there will be error in loading data
    if(!isLoading && isError) content = <div className="col-span-12">{error}</div>;

    // --- when unfortunately no videos will be found
    if(!isLoading && !isError && blogs?.length === 0) content = <div className="col-span-12">No videos found!</div>;

    // --- when data will be loaded successfullty
    if(!isLoading && !isError && blogs?.length>0) content = blogs.map(blogs => <BlogsCard key={blogs.id} blogs={blogs}></BlogsCard>);
    return (
        <main className="post-container" id="lws-postContainer">
            {content}
        </main>
    );
};

export default Body;