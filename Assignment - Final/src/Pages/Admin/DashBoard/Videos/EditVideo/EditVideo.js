import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../AdminNavbar/AdminNavbar';
import learningLogo from '../../../../../assets/image/learningportal.svg';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import backButton from '../../../../../assets/image/back-arrow.png';
import { useGetVideoQuery } from '../../../../../features/videos/videosApi';
import ClipLoader from 'react-spinners/ClipLoader';
import Error from '../../../../../Components/Error';
import EditVideoData from './EditVideoData';

const EditVideo = () => {
    // --- getting video id from params
    const params = useParams();
    const { id } = params;

    // --- getting video information from server
    const { data, isLoading, isError, error, isSuccess } = useGetVideoQuery(id);
    
    // --- deciding what to show while fetching video from server
    let content = null ; 

    if (isLoading && !isError) {
        content = <div className="text-center mt-8 "><ClipLoader color="white" size={100} /></div> ;
    }
    if (!isLoading && isError) {
        console.log(error);
        content = <div className="text-center mt-8"><Error message={error.error}></Error></div> 
    }
    if (!isLoading && !isError && isSuccess) {
        content = <EditVideoData data={data}></EditVideoData>
    }
    return (
        <section className=" bg-primary place-items-center mt-8">
        <AdminNavbar></AdminNavbar>
        <div className="mx-auto max-w-md px-5 lg:px-0">
            <div>
                <Link to="/admin/videos"><img className="h-12 mt-4" src={backButton} /></Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                    Edit Video
            </h2>
            </div>
                {content}
            </div>
        </section>
    );
};

export default EditVideo;