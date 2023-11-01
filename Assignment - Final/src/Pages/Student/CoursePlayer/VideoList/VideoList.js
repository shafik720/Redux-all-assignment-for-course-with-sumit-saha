import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useGetVideosQuery } from '../../../../features/videos/videosApi';
import SingleVideoList from './SingleVideoList';

const VideoList = () => {
    // --- getting all videos list from server
    const {data : allVideos, isLoading, isError, error} = useGetVideosQuery();
    let videoListContent = null;
    if(isLoading && !isError){
        videoListContent = <div className="text-center mt-8 "><ClipLoader color="white" size={100} /></div>;
    }
    if(!isLoading && isError){
        console.log(error);
        videoListContent = <div className="text-center mt-8 "><h2>{error.error || error.data}</h2></div>
    }
    if (!isLoading && !isError && allVideos.length > 0) {
        videoListContent = allVideos.map(video => <SingleVideoList key={video.id} video={video}></SingleVideoList>);
    }
    return (
        <div
            className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">

            {videoListContent}
        </div>
    );
};

export default VideoList;