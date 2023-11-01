import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import { useAddQuizMutation } from '../../../../../features/quizz/quizzApi';
import { useGetVideosQuery } from '../../../../../features/videos/videosApi';
import AdminNavbar from '../../../AdminNavbar/AdminNavbar';
import backButton from '../../../../../assets/image/back-arrow.png';

const AddQuizz = () => {
    // --- getting video data from server
    const { data: videoData, isLoading: videoLoading, isError: isVideoError, error: videoError, isSuccess: videoSuccess } = useGetVideosQuery();


    const [question, setQuestion] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [iscorrect1, setIscorrect1] = useState(false);
    const [iscorrect2, setIscorrect2] = useState(false);
    const [iscorrect3, setIscorrect3] = useState(false);
    const [iscorrect4, setIscorrect4] = useState(false);

    // --- adding Quiz when user click 'Add Quiz' button
    const [addQuiz, { isLoading, isError, isSuccess, error }] = useAddQuizMutation();
    const handleSubmit = (e) => {
        e.preventDefault();
        let selectedVideo = videoData.find(index => index.title === videoTitle);
        // console.log(iscorrect1,iscorrect2,iscorrect3,iscorrect4,);
        addQuiz({
            question ,
            video_title: videoTitle,
            video_id : selectedVideo.id,
            options : [
                {
                    id : 1,
                    option : option1,
                    isCorrect : iscorrect1  
                },
                {
                    id : 2,
                    option : option2,
                    isCorrect : iscorrect2  
                },
                {
                    id : 3,
                    option : option3,
                    isCorrect : iscorrect3  
                },
                {
                    id : 4,
                    option : option4,
                    isCorrect : iscorrect4  
                }
            ]
        })
    }

    // --- deciding what to show when fetching server for adding videos
    const navigate = useNavigate();
    let status = "Add Quizz";
    const errorMsg = () => toast.error(error.error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    if (isLoading) {
        status = <HashLoader color="white" size={20} />;
    }
    if (isError) {
        console.log(error);
        errorMsg();
    }
    if (isSuccess) {
        navigate('/admin/quiz');
        toast.success('New Quiz Added Successfully !', {
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
        <section className=" bg-primary place-items-center mt-8">
            <AdminNavbar></AdminNavbar>
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <div>
                    <Link to="/admin/quiz"><img className="h-12 mt-4" src={backButton} /></Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Add a New Quizz
                </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">

                        <div className="mt-6">
                            <label className="sr-only mt-5">Quizz Title</label>
                            <input name="title" type="name" autoComplete="name" required
                                className="login-input" placeholder="Question Title" value={question} onChange={(e) => setQuestion(e.target.value)} />
                        </div>
                        <div className="mt-6 space-y-6">
                            <div className="mt-6 space-y-6">
                                <select name="teamMember" required className="login-input" onChange={(e) => setVideoTitle(e.target.value)}>
                                    <option value={videoTitle} hidden >Select Video</option>
                                    {/* ----- getting video list from server ----- */}
                                    {videoData?.map(video => <option key={video.id}>{video.title}</option>)}

                                </select>
                            </div>
                        </div>
                        {/* --- Question Option --- */}
                        <div className="mt-6 space-y-6">
                            <div className="space-y-6">
                                <label className="sr-only">Options</label>
                                <input type="text" required className="login-input" placeholder="Option - 1" value={option1} onChange={(e) => setOption1(e.target.value)} />

                                <label>Is Option-1 correct?</label>
                                <select className="correct-field" value={iscorrect1} onChange={() => setIscorrect1(!iscorrect1)}>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* --- Question Option --- */}
                        <div className="mt-6 space-y-6">
                            <div className="space-y-6">
                                <label className="sr-only">Options</label>
                                <input type="text" required className="login-input" placeholder="Option - 2" value={option2} onChange={(e) => setOption2(e.target.value)} />

                                <label>Is Option-2 correct?</label>
                                <select className="correct-field" value={iscorrect2} onChange={() => setIscorrect2(!iscorrect2)}>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                        {/* --- Question Option --- */}
                        <div className="mt-6 space-y-6">
                            <div className="space-y-6">
                                <label className="sr-only">Options</label>
                                <input type="text" required className="login-input" placeholder="Option - 3" value={option3} onChange={(e) => setOption3(e.target.value)} />

                                <label>Is Option-3 correct?</label>
                                <select className="correct-field" value={iscorrect3} onChange={() => setIscorrect3(!iscorrect3)}>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                        {/* --- Question Option --- */}
                        <div className="mt-6 space-y-6">
                            <div className="space-y-6">
                                <label className="sr-only">Options</label>
                                <input type="text" required className="login-input" placeholder="Option - 4" value={option4} onChange={(e) => setOption4(e.target.value)} />

                                <label>Is Option-4 correct?</label>
                                <select className="correct-field" value={iscorrect4} onChange={() => setIscorrect4(!iscorrect4)}>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            disabled={isLoading}
                        >
                            {status}
                        </button>
                    </div>
                </form>
                <div className='py-6' ></div>
            </div>
        </section>
    );
};

export default AddQuizz;