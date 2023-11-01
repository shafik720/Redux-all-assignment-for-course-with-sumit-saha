import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminNavbar from '../../../AdminNavbar/AdminNavbar';
import backButton from '../../../../../assets/image/back-arrow.png';
import Error from '../../../../../Components/Error';
import EditQuizData from './EditQuizData';
import { useGetQuizzQuery } from '../../../../../features/quizz/quizzApi';
import ClipLoader from 'react-spinners/ClipLoader';

const EditQuiz = () => {

    // --- getting assignment id from params
    const params = useParams();
    const { id } = params;

    // --- getting assignment information from server
    const { data, isLoading, isError, error, isSuccess } = useGetQuizzQuery(id);

    // --- deciding what to show while fetching video from server
    let content = null;

    if (isLoading && !isError) {
        content = <div className="text-center mt-8 "><ClipLoader color="white" size={100} /></div>;
    }
    if (!isLoading && isError) {
        console.log(error);
        content = <div className="text-center mt-8"><Error message={error.error}></Error></div>
    }
    if (!isLoading && !isError && isSuccess) {
        content = <EditQuizData data={data}></EditQuizData>
    }

    return (
        <section className=" bg-primary place-items-center mt-8">
            <AdminNavbar></AdminNavbar>
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <Link to="/admin/quiz"><img className="h-12 mt-4" src={backButton} /></Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Edit Quiz
                </h2>
                </div>
                {content}
                <div className='py-6' ></div>
            </div>
        </section>
    );
};

export default EditQuiz;