import React, { useState, CSSProperties } from 'react';
import learningLogo from '../../../../../assets/image/learningportal.svg';
import AdminNavbar from '../../../AdminNavbar/AdminNavbar';
import { useAddVideosMutation } from '../../../../../features/videos/videosApi';
import { Link, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import backButton from '../../../../../assets/image/back-arrow.png' ;


const AddVideo = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [url, setUrl] = useState('');
    const [views, setViews] = useState('');
    const [duration, setDuration] = useState('');

    const [addVideos, { data, isLoading, isSuccess, isError, error }] = useAddVideosMutation();
    const now = new Date();
    const timeStamp = now.toISOString();
    // console.log(timeStamp);

    // --- adding video when user click 'Add Video' button
    const handleSubmit = (e) => {
        e.preventDefault();
        addVideos({
            title,
            description: desc,
            url,
            views: views + 'k',
            duration,
            createdAt: timeStamp,
        })
    }

    // --- deciding what to show when fetching server for adding videos
    const navigate = useNavigate();
    let status = "Add Video";
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
        navigate('/admin/videos');
        toast.success('Video Added Successfully', {
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
                <Link to="/admin/videos"><img className="h-12 mt-4" src={backButton} /></Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Add a New Video
                </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mt-6">
                            <label className="sr-only mt-5">Video Title</label>
                            <input name="title" type="name" autoComplete="name" required
                                className="login-input" placeholder="Video Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="sr-only">Video Description</label>
                            <input name="desc" type="name" autoComplete="name" required
                                className="login-input" placeholder="Video Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="sr-only">Video Url</label>
                            <input name="url" type="url" autoComplete="url" required
                                className="login-input" placeholder="Video Url" value={url} onChange={(e) => setUrl(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="sr-only">Views</label>
                            <input name="title" type="number" autoComplete="views" required
                                className="login-input" placeholder="Total Views" value={views} onChange={(e) => setViews(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="sr-only">Duration</label>
                            <input name="duration" type="time" id="timeInput"  step="60" autoComplete="duration" required
                                className="login-input " placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        </div>

                    </div>

                    <div>
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500" disabled={isLoading} >
                            {status}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddVideo;