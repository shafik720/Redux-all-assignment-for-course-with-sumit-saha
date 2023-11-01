import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import { useAddAssignmentMarkMutation } from '../../../../features/assingmentMark/assingmentMarkApi';
import { modalOff } from '../../../../features/Modal/modalSlice';

const AssignmentSubmitForm = ({ assignment }) => {
    const { video_title, totalMark, title, id } = assignment;
    const [repo, setRepo] = useState('');

    const [addAssignmentMark, { isLoading, isError, error, isSuccess }] = useAddAssignmentMarkMutation();


    // -- getting user information
    const authState = useSelector(state => state.auth);
    const { user } = authState;

    const submitAssnmnt = (e) => {
        e.preventDefault();
        const now = new Date();
        const timeStamp = now.toISOString();
        
        addAssignmentMark(
            {
                student_id: user.id,
                student_name: user.name,
                assignment_id: id,
                title: title,
                createdAt: timeStamp,
                totalMark: totalMark,
                mark: 0,
                repo_link: repo,
                status: "pending"
            }
        )
    }

    let content = <div className="assignment-submit-form">
        <h2>Assignment Name : {title} </h2>
        <form onSubmit={submitAssnmnt}>
            <input type="text" placeholder="Assignment repo link..." required value={repo} onChange={(e) => setRepo(e.target.value)} />
            <button type="submit">Submit Assignment</button>
        </form>
    </div>

    if (isLoading && !isError) {
        content = <HashLoader color="black" size={150} />;
    }
    if (!isLoading && isError) {
        toast.error(error.error || error.data, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const dispatch = useDispatch();
    if (!isLoading && !isError && isSuccess) {
        toast.success('Assignment Submitted Successfully !', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        dispatch(modalOff());
    }
        return (
            content
        );
    };

    export default AssignmentSubmitForm;