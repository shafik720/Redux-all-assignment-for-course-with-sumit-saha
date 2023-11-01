import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAssignmentsQuery } from '../../../../features/assignment/assignmentApi';
import { useGetAssignmentMarksQuery } from '../../../../features/assingmentMark/assingmentMarkApi';
import { modalOff, modalOn } from '../../../../features/Modal/modalSlice';
import Modal from '../../../Modal/Modal';
import StudentLogin from '../../StudentLogin/StudentLogin';
import AssingmentSubmit from '../AssingmentSubmit/AssingmentSubmit';

const CoursePlayerDetails = ({ currentVideo }) => {
    // const [showModal, setShowModal] = useState(false);
    const [isAssignment, setIsAssignment] = useState(false);

    const { url, title, views, duration, description, createdAt, id } = currentVideo;
    const modalState = useSelector(state => state.modal);
    const{isModal} = modalState;
    const dispatch = useDispatch();

    // --- modal for Assignment 
    const handleModal = () => {
        // setShowModal(true);
        dispatch(modalOn());
    }
    const closeModal = () => {
        // setShowModal(false);
        dispatch(modalOff());
    }

    // --- formating date
    const convertedDate = moment(createdAt).format('DD MMM YYYY');

    // --- getting assignment data to show or hide 'add assignment' button
    const { data: assignmentData, isLoading, isError, isSuccess } = useGetAssignmentsQuery();
    let content = null;

    // --- getting assignment marks data for disabling assignment button
    const { data: assignmentMarks } = useGetAssignmentMarksQuery();
    useEffect(() => {
        if (assignmentMarks?.length > 0) {
            setIsAssignment(true);
        }
        // assignmentData?.find(index => {
        //     if (index.video_id == id) {
        //         content = <button onClick={handleModal}
        //             className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
        //             এসাইনমেন্ট
        //         </button>
        //         if (isAssignment) {
        //             for (let assignmentMark of assignmentMarks) {
        //                 console.log(assignmentMark.title);
        //                 if (assignmentMark.title === index.title) {
        //                     content = <button disabled onClick={handleModal}
        //                         className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary disable-button">
        //                         এসাইনমেন্ট সাবমিটেড 
        //                     </button>
        //                 }
        //             }
        //         }
        //     }
        // })
    }, [assignmentMarks])

    assignmentData?.find(index => {
        if (index.video_id == id) {
            content = <button onClick={handleModal}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                এসাইনমেন্ট
            </button>
            if (isAssignment) {
                for (let assignmentMark of assignmentMarks) {
                    console.log(assignmentMark.title);
                    if (assignmentMark.title === index.title) {
                        content = <button disabled onClick={handleModal}
                            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary disable-button">
                            এসাইনমেন্ট সাবমিটেড 
                        </button>
                    }
                }
            }
        }
    })
    return (
        <div>
            {/* --- Modal Div --- */}
            <Modal show={isModal} >
                <div onClick={closeModal} className="close-button" draggable>
                    <p>x</p>
                </div>
                <AssingmentSubmit id={id} closeModal={closeModal} ></AssingmentSubmit>
            </Modal>

            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                {title}
            </h1>
            <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                Uploaded on {convertedDate}
            </h2>

            <div className="flex gap-4">
                {assignmentData?.length > 0 ? content : <button>No Assignment Found</button>}

                <a href="./Quiz.html"
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">কুইজে
                    অংশগ্রহণ
                                করুন</a>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>


        </div>
    );
};

export default CoursePlayerDetails;