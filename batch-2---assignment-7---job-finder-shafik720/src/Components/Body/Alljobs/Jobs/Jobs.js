import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteJob, editJobs } from '../../../../features/jobs/jobSlice';

const Jobs = ({job}) => {
    const {title, type, salary, deadline, id}  = job ;

    // --- changing job type color
    let tagColor = null ;
    const changeTagColor = () => {
        if(type === 'Internship'){
            tagColor = '#FF5757';
        }else if(type === 'Full Time'){
            tagColor = '#FF8A00';
        }else if(type === 'Remote'){
            tagColor = '#56E5C4';
        }
        return tagColor;
    }

    // --- going to edit page when edit button is clicked
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleEdit = () =>{
        navigate('/editJob');
        dispatch(editJobs({title, type, salary, deadline, id}))
    }
    
    // --- delete functionality
    const handleDelete = () => {
        dispatch(deleteJob(id));
    }
    return (
        <div className="jobs-list">
            {/* <!-- Single Job 1--> */}
            <div className="lws-single-job">
                <div className="flex-1 min-w-0">
                    <h2 className="lws-title">{title}</h2>
                    <div className="job-footers">
                        <div className="lws-type">
                            {/* <!-- Fulltime - #FF8A00,  --><!-- Internship - #FF5757,  --><!-- Remote - #56E5C4,  --> */}
                            <i className={`fa-solid fa-stop !text-[${changeTagColor()}] text-lg mr-1.5`}></i>
                            {type}
                        </div>
                        <div className="lws-salary">
                            <i className="fa-solid fa-bangladeshi-taka-sign text-slate-400 text-lg mr-1.5"></i>
                            BDT {salary}
                        </div>
                        <div className="lws-deadline">
                            <i className="fa-regular fa-calendar text-slate-400 text-lg mr-1.5"></i>
                            Closing on {deadline}
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex lg:mt-0 lg:ml-4">
                    <span className="hidden sm:block">
                        <button type="button" className="lws-edit btn btn-primary" onClick={handleEdit}>
                            <i className="fa-solid fa-pen text-gray-300 -ml-1 mr-2"></i>
                            Edit
                        </button>
                    </span>

                    <span className="sm:ml-3">
                        <button type="button" className="lws-delete btn btn-danger " onClick={handleDelete}>
                            <i className="fa-solid fa-trash text-gray-300 -ml-1 mr-2"></i>
                            Delete
                        </button>
                    </span>
                </div>
            </div>
            {/* <!-- Single Job 1--> */}
        </div>
    );
};

export default Jobs;