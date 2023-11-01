import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { useGetAssignmentsQuery } from '../../../../features/assignment/assignmentApi';
import AssignmentSubmitForm from './AssignmentSubmitForm';

const AssingmentSubmit = ({ id }) => {
    const { data, isLoading, isError, error } = useGetAssignmentsQuery();

    // --- deciding what to show when fetching server for assignment data
    let content = null;
    let status = null;
    const errorMsg = () => toast.error(error.error, {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    if (isLoading && !isError) {
        content = <div className="text-center mt-8 ">
            <h2>Loading assignment data</h2>
            <ClipLoader color="black" size={100} />
        </div>;
    }
    if (!isLoading && isError) {
        console.log(error);
        errorMsg();
    }
    if (!isLoading && !isError && data.length > 0) {
         status = data.find(index => index.video_id === id );
         if(status){
             content = <AssignmentSubmitForm assignment={status}></AssignmentSubmitForm>
         }
    }
    return (
        <div>
            {content}
        </div>
    );
};

export default AssingmentSubmit;