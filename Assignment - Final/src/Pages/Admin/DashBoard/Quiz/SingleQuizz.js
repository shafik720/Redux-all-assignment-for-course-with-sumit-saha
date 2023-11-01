import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteQuizMutation } from '../../../../features/quizz/quizzApi';

const SingleQuizz = ({ quizz }) => {
    const { id, question, video_title, video_id } = quizz;
    // --- shorten description sentence so that it won't mess with ui by showing long scroll bar 
    const video_title_shorten = video_title?.split(" ").slice(0, 10).join(" ");
    const question_shorten = question?.split(" ").slice(0, 10).join(" ");

    // --- deleting function
    const [deleteQuiz, { data, isLoading, isError, error, isSuccess }] = useDeleteQuizMutation();
    const handleDelete = () => {
        const result = window.confirm("Are you sure you want to delete this video?");
        if (result) {
            deleteQuiz(id);
        } else {
            console.log('failed');
        }
    }

    if (isError) {
        console.log(error);
        const errorMsg = () => toast.error(error.error, {
            position: "bottom-center",
            autoClose: 1000,
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
        toast.success('Assignment Deleted !', {
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
        <tr>
            <td className="table-td">{question_shorten}</td>
            <td className="table-td">{video_title_shorten}</td>
            <td className="table-td flex gap-x-2 justify-center">
                {/* --- delete button --- */}
                <button onClick={handleDelete}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                        className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
                {/* --- edit button ---- */}
                <Link to={`/admin/editQuiz/${id}`}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                        className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </Link>

            </td>
        </tr>
    );
};

export default SingleQuizz;