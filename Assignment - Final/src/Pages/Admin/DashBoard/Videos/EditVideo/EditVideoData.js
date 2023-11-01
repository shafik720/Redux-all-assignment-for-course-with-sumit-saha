import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../AdminNavbar/AdminNavbar';
import learningLogo from '../../../../../assets/image/learningportal.svg';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import backButton from '../../../../../assets/image/back-arrow.png';
import { useEditVideosMutation, useGetVideoQuery } from '../../../../../features/videos/videosApi';
import HashLoader from 'react-spinners/HashLoader';
import Error from '../../../../../Components/Error';
import { toast } from 'react-toastify';

const EditVideoData = ({ data }) => {
    const receivedView = data.views;
    const receivedViews = parseInt(receivedView?.match(/\d+/)[0]);

    const [title, setTitle] = useState(data.title);
    const [desc, setDesc] = useState(data.description);
    const [url, setUrl] = useState(data.url);
    const [views, setViews] = useState(receivedViews);
    const [duration, setDuration] = useState(data.duration);

    const now = new Date();
    const timeStamp = now.toISOString();

    const [editVideos, { data: editedVideo, isLoading, isError, error, isSuccess }] = useEditVideosMutation();

    // --- submitting edited video to server when user click 'Edit Video' button
    const handleSubmit = (e) => {
        e.preventDefault();
        editVideos({
            id : data.id,
            data: {
                title,
                description: desc,
                url,
                views: views + 'k',
                duration,
                createdAt: timeStamp,
            }
        })
    }

    // --- deciding what to do when fetching server for editing videos
    const navigate = useNavigate();
    let status = "Edit Video";

    if (isLoading) {
        status = <HashLoader color="white" size={20} />;
    }
    if (isError) {
        console.log(error);
        const errorMsg = () => toast.error(error.data, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        errorMsg();
    }
    if (isSuccess) {
        navigate('/admin/videos');
        toast.success('Video Edited Successfully !', {
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
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-6">
                    <label className="sr-only mt-5">Video Title</label>
                    <input name="title" type="name" autoComplete="name" required
                        className="login-input" placeholder="Email address" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                    <input name="duration" type="time" id="timeInput" step="60" autoComplete="duration" required
                        className="login-input " placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>

            </div>

            <div>
                <button type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                //  disabled={isLoading} 
                >
                    {status}
                </button>
            </div>
        </form>
    );
};

export default EditVideoData;