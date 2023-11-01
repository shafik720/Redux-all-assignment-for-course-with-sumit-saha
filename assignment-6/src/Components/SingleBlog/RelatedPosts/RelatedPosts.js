import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelatedBlogs } from '../../../features/relatedBlogSlice/relatedBlogSlice';
import Loading from '../../Loading/Loading';
import RelatedSinglePost from './RelatedSinglePost/RelatedSinglePost';

const RelatedPosts = ({tags, id}) => {
    const relatedBlogState = useSelector(state => state.relatedBlog);
    const singleBlogState = useSelector(state => state.singleBlog);
    
    const{relatedBlogs, isLoading, isError, error} = relatedBlogState;
    // console.log(relatedBlogs);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchRelatedBlogs({tags, id}));
    },[dispatch, singleBlogState]);

    let content = null;
    
    // --- when the data will be in loading state
    if(isLoading && !isError) content = <Loading></Loading> ;

    // --- when there will be error in loading data
    if(!isLoading && isError) content = <div className="col-span-12">{error}</div>;

    // --- when unfortunately no videos will be found
    if(!isLoading && !isError && relatedBlogs?.length === 0) content = <div className="col-span-12">No videos found!</div>;

    // --- when data will be loaded successfullty
    if(!isLoading && !isError && relatedBlogs?.length>0) content = relatedBlogs.map(blogs => <RelatedSinglePost key={blogs.id} blogs={blogs}></RelatedSinglePost>);
    return (
        <aside>
            <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">Related Posts</h4>
            <div className="space-y-4 related-post-container">
                {/* <!-- related post  --> */}
                {content}
                {/* <!-- related post ends --> */}
            </div>
        </aside>
    );
};

export default RelatedPosts;