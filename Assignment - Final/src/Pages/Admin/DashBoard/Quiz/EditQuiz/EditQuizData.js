import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';
import { useEditQuizMutation } from '../../../../../features/quizz/quizzApi';
import { useGetVideosQuery } from '../../../../../features/videos/videosApi';

const EditQuizData = ({ data }) => {
    const [question, setQuestion] = useState(data.question);
    const [videoTitle, setVideoTitle] = useState(data.video_title);
    const [option1, setOption1] = useState(data.options[0].option);
    const [option2, setOption2] = useState(data.options[1].option);
    const [option3, setOption3] = useState(data.options[2].option);
    const [option4, setOption4] = useState(data.options[3].option);
    const [iscorrect1, setIscorrect1] = useState(data.options[0].isCorrect);
    const [iscorrect2, setIscorrect2] = useState(data.options[1].isCorrect);
    const [iscorrect3, setIscorrect3] = useState(data.options[2].isCorrect);
    const [iscorrect4, setIscorrect4] = useState(data.options[3].isCorrect);


    // --- getting video data from server
    const { data: videoData, isLoading: videoLoading, isError: isVideoError, error: videoError, isSuccess: videoSuccess } = useGetVideosQuery();

    // --- deciding what to show in video title field while fetching video data from server
    let videoTitleFromServer = !videoSuccess ? null : <select name="video-title" required className="login-input" onChange={(e) => setVideoTitle(e.target.value)} defaultValue={videoTitle} >
        <option hidden >Select Video</option>
        {/* ----- getting video list from server ----- */}
        {videoData?.map(video => <option key={video.id}>{video.title}</option>)}
    </select>


    // --- edit Quiz when user click 'Edit Quiz' button
    const [editQuiz, { isLoading, isError, isSuccess, error }] = useEditQuizMutation();
    const handleSubmit = (e) => {
        e.preventDefault();
        let selectedVideo = videoData.find(index => index.title === videoTitle);
        // console.log(iscorrect1,iscorrect2,iscorrect3,iscorrect4,);
        editQuiz({
            id : data.id,
            data: {
                question,
                video_title: videoTitle,
                video_id: selectedVideo.id,
                options: [
                    {
                        id: 1,
                        option: option1,
                        isCorrect: iscorrect1
                    },
                    {
                        id: 2,
                        option: option2,
                        isCorrect: iscorrect2
                    },
                    {
                        id: 3,
                        option: option3,
                        isCorrect: iscorrect3
                    },
                    {
                        id: 4,
                        option: option4,
                        isCorrect: iscorrect4
                    }
                ]
            }
        })
    }

    // --- deciding what to show when fetching server for adding videos
    const navigate = useNavigate();
    let status = "Edit Quizz";
    const errorMsg = () => toast.error(error.error || error.status, {
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
        toast.success('Assignment Edited Successfully', {
            position: "bottom-center",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (
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
                        {videoTitleFromServer}
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
                // disabled={isLoading}
                >
                    {status}
                </button>
            </div>
        </form>
    );
};

export default EditQuizData;