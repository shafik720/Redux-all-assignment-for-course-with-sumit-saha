import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import { useEditAssignmentMutation } from '../../../../../features/assignment/assignmentApi';
import { useGetVideosQuery } from '../../../../../features/videos/videosApi';

const EditAssignmentData = ({ data }) => {

    // const{} = data ; 
    const [title, setTitle] = useState(data.title);
    const [videoTitle, setVideoTitle] = useState(data.video_title);
    const [marks, setMarks] = useState(data.totalMark);

    // --- getting video data from server
    const { data: videoData, isLoading: videoLoading, isError: isVideoError, error: videoError, isSuccess: videoSuccess } = useGetVideosQuery();
    // --- deciding what to show in video title field while fetching video data from server
    let videoTitleFromServer = !videoSuccess ? null : <select name="video-title" required className="login-input" onChange={(e) => setVideoTitle(e.target.value)} defaultValue={videoTitle} >
        <option hidden >Select Video</option>
        {/* ----- getting video list from server ----- */}
        {videoData?.map(video => <option key={video.id}>{video.title}</option>)}
    </select>


    // --- editing Assignment when user click 'Edit Assignment' button    
    const [editAssignment, { isLoading, isError, isSuccess, error }] = useEditAssignmentMutation();
    const handleSubmit = (e) => {
        e.preventDefault();
        let selectedVideo = videoData.find(index => index.title === videoTitle);
        editAssignment({
            id: data.id,
            data: {
                title,
                video_title: videoTitle,
                video_id: selectedVideo.id,
                totalMark: marks
            }
        })
    }

    // --- deciding what to show when fetching server for editing videos
    const navigate = useNavigate();
    let status = "Edit Assignment";
    const errorMsg = () => toast.error(error.error || error.status, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    if (isLoading) {
        status = <HashLoader color="white" size={20} />;
    }
    if (isError) {
        console.log(error);
        errorMsg();
    }
    if (isSuccess) {
        navigate('/admin/assignment');
        toast.success('Assignment Edited Successfully', {
            position: "bottom-center",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">

                <div className="mt-6">
                    <label className="sr-only mt-5">Assignment Title</label>
                    <input name="title" type="name" autoComplete="name" required
                        className="login-input" placeholder="Assignment name" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mt-6 space-y-6">
                    <div className="mt-6 space-y-6">
                        {videoTitleFromServer}
                    </div>
                </div>

                <div className="mt-6 space-y-6">
                    <div className="space-y-6">
                        <label className="sr-only">Views</label>
                        <input name="marks" type="number" autoComplete="marks" required
                            className="login-input" placeholder="Total Marks" value={marks} onChange={(e) => setMarks(e.target.value)} />
                    </div>
                </div>
            </div>

            <div>
                <button type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                // disabled={isLoading}
                >
                    {status}
                </button>
            </div>
        </form>
    );
};

export default EditAssignmentData;