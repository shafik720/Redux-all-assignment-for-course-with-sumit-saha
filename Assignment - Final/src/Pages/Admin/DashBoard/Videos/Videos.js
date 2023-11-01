import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import backButton from '../../../../assets/image/left.png';
import { useGetVideosQuery } from '../../../../features/videos/videosApi';
import AdminNavbar from '../../AdminNavbar/AdminNavbar';
import Video from './Video/Video';

const Videos = () => {
    // --- getting video data from server
    const {data, isLoading, isError, error} = useGetVideosQuery();
    
    let content = null;  
    
    if (!isLoading && !isError && data.length > 0) {
        content = data?.map(video=> <Video key={video.id} video={video}></Video>);
    }
    
    // --- taking user to add video page when clicking 'Add video' button
    const navigate = useNavigate();
    const handleAddVideo = () =>{
        navigate('/admin/addvideo');
    }
    return (
        <div>
            {/* --- Navbar for Admin Panel --- */}
            <AdminNavbar></AdminNavbar>

            {/* --- Video section for Admin Panel */}
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                    
                        <div className="w-full flex">
                        <Link to="/admin/dashboard"><img className="h-8" src={backButton} /></Link>
                            <button className="btn ml-auto" onClick={handleAddVideo}>Add Video</button>
                        </div>
                        <div className="overflow-x-auto mt-4">
                            <table className="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        <th className="table-th">Video Title</th>
                                        <th className="table-th">Description</th>
                                        <th className="table-th">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-600/50">
                                    
                                    {content}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Videos;