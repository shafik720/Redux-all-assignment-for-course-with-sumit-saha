import React from 'react';
import { useNavigate } from 'react-router';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { useGetQuizzesQuery } from '../../../../features/quizz/quizzApi';
import AdminNavbar from '../../AdminNavbar/AdminNavbar';
import SingleQuizz from './SingleQuizz';
import backButton from '../../../../assets/image/left.png';
import { Link } from 'react-router-dom';

const Quiz = () => {
    const { data, isLoading, isError, error, isSuccess } = useGetQuizzesQuery();

    // --- deciding what to show when fetching server for assignment data
    let content = null;
    let status = null;
    const errorMsg = () => toast.error(error.error, {
        position: "bottom-center",
        autoClose: 15000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    if (isLoading && !isError) {
        status = <div className="text-center mt-8 "><ClipLoader color="white" size={100} /></div>;
    }
    if (!isLoading && isError) {
        console.log(error);
        errorMsg();
    }
    if (!isLoading && !isError && data.length > 0) {
        content = data.map(quizz => <SingleQuizz key={quizz.id} quizz={quizz}></SingleQuizz>);
    }

    // --- taking user to add assignment page when clicking 'Add Assignment' button
    const navigate = useNavigate();
    const handleAddQuizz = () => {
        navigate('/admin/addQuizz');
    }
    return (
        <div>
            {/* --- Navbar for Admin Panel --- */}
            <AdminNavbar></AdminNavbar>

            {/* --- Quiz section for Admin Panel --- */}
            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                <h2 className="text-center text-3xl font-extrabold text-slate-100 mt-8">
                        All Quizzes
                </h2>
                    <div className="px-3 py-6 bg-opacity-10">                        
                        <div className="w-full flex">
                            <Link to="/admin/dashboard"><img className="h-8" src={backButton} /></Link>
                            <button onClick={handleAddQuizz} className="btn ml-auto">Add Quiz</button>
                        </div>
                        <div className="overflow-x-auto mt-4">
                            <table className="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        <th className="table-th">Question</th>
                                        <th className="table-th">Video</th>
                                        <th className="table-th justify-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-600/50">

                                    {content}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {status}
            </section>
        </div>
    );
};

export default Quiz;