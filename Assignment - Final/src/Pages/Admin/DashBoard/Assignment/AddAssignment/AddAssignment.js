import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../AdminNavbar/AdminNavbar';
import backButton from '../../../../../assets/image/back-arrow.png';
import { toast } from 'react-toastify';
import { useGetVideosQuery } from '../../../../../features/videos/videosApi';
import { useAddAssignmentMutation } from '../../../../../features/assignment/assignmentApi';
import HashLoader from 'react-spinners/HashLoader';

const AddAssignment = () => {
    // --- getting video data from server
    const { data: videoData, isLoading: videoLoading, isError: isVideoError, error: videoError, isSuccess: videoSuccess } = useGetVideosQuery();


    const [title, setTitle] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [marks, setMarks] = useState('');

    // --- adding Assignment when user click 'Add Assignment' button
    const[addAssignment, {isLoading, isError, isSuccess, error}] = useAddAssignmentMutation();
    const handleSubmit = (e) => {
        e.preventDefault();
        let selectedVideo = videoData.find(index => index.title === videoTitle);
        addAssignment({
            title ,
            video_title : videoTitle,
            video_id : selectedVideo.id,
            totalMark : marks
        })
    }

    // --- deciding what to show when fetching server for adding videos
    const navigate = useNavigate();
    let status = "Add Assignment";
    const errorMsg = () => toast.error(error.error, {
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
        toast.success('Assignment Added Successfully', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <section className=" bg-primary place-items-center mt-8">
            <AdminNavbar></AdminNavbar>
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <Link to="/admin/assignment"><img className="h-12 mt-4" src={backButton} /></Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Add a New Assignment
                </h2>
                </div>
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
                                <select name="teamMember" required className="login-input" onChange={(e) => setVideoTitle(e.target.value)}>
                                    <option value={videoTitle} hidden >Select Video</option>
                                    {/* ----- getting video list from server ----- */}
                                    {videoData?.map(video => <option key={video.id}>{video.title}</option>)}

                                </select>
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
                        disabled={isLoading} 
                        >
                            {status}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddAssignment;