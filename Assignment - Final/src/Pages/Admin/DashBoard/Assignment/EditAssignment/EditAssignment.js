import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminNavbar from '../../../AdminNavbar/AdminNavbar';
import backButton from '../../../../../assets/image/back-arrow.png';
import EditAssignmentData from './EditAssignmentData';
import { useGetAssignmentQuery } from '../../../../../features/assignment/assignmentApi';
import ClipLoader from 'react-spinners/ClipLoader';
import Error from '../../../../../Components/Error';

const EditAssignment = () => {

// --- getting assignment id from params
const params = useParams();
const { id } = params;

// --- getting assignment information from server
const { data, isLoading, isError, error, isSuccess } = useGetAssignmentQuery(id);

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
    content = <EditAssignmentData data={data}></EditAssignmentData>
}

    return (
        <section className=" bg-primary place-items-center mt-8">
            <AdminNavbar></AdminNavbar>
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <Link to="/admin/assignment"><img className="h-12 mt-4" src={backButton} /></Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Edit Assignment
                </h2>
                </div>
                {content}
            </div>
        </section>
    );
};

export default EditAssignment;