import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { useGetVideosQuery } from '../../../features/videos/videosApi';
import { changeVideo } from '../../../features/videos/videosSlice';
import StudentNavbar from '../StudentNavbar/StudentNavbar';
import CoursePlayerDetails from './CoursePlayerDetails/CoursePlayerDetails';
import VideoList from './VideoList/VideoList';
import VideoPlayer from './VideoPlayer/VideoPlayer';

const CoursePlayer = () => {

    const[isReady, setIsReady] = useState(false);

    // --- getting current selected video state
    const videoState = useSelector(state => state.videos);
    const { currentVideo } = videoState;

    // --- getting all videos from server
    const { data, isLoading, isError, error, isSuccess } = useGetVideosQuery();

    // --- deciding what to show in ui while fetching all videos 
    let playerContent = null;
    if (isLoading && !isError) {
        playerContent = <div className="text-center mt-8 "><ClipLoader color="white" size={70} /></div>;
    }
    if (!isLoading && isError) {
        playerContent = <div className="text-center mt-8 "><h2>{error.error || error.data}</h2></div>;
    }
    if (!isLoading && !isError && data.length === 0) {
        playerContent = <div className="text-center mt-8 "><h2>There are no videos yet</h2></div>;
    }
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isLoading && !isError && data.length > 0) {
            dispatch(changeVideo(data[0]));
            setIsReady(true);
        }
    }, [data])

    return (
        <div>
            {/* --- navbar --- */}
            <StudentNavbar></StudentNavbar>

            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div className="grid grid-cols-3 gap-2 lg:gap-8">
                        {!isReady ? playerContent : <div className="col-span-full w-full space-y-8 lg:col-span-2">
                            <VideoPlayer currentVideo={currentVideo}></VideoPlayer>
                            {/* --- Video Details  */}
                            <CoursePlayerDetails currentVideo={currentVideo}></CoursePlayerDetails>
                        </div>}
                        {/* --- Video List --- */}
                        <VideoList></VideoList>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CoursePlayer;