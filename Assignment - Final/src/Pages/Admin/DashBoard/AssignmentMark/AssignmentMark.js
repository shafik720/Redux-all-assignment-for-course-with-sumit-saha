import React from 'react';
import { useNavigate } from 'react-router';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { useGetAssignmentMarksQuery } from '../../../../features/assingmentMark/assingmentMarkApi';
import AdminNavbar from '../../AdminNavbar/AdminNavbar';
import SingleAssignmentMark from './SingleAssignmentMark';

const AssignmentMark = () => {
    const { data, isLoading, isError, error, isSuccess } = useGetAssignmentMarksQuery();

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
    let total = 0;
    let pending = 0;
    let published = 0;
    if (!isLoading && !isError && data.length > 0) {
        content = data.map(assignment => <SingleAssignmentMark key={assignment.id} assignment={assignment}></SingleAssignmentMark>);

        // --- updating total pending marks counter
        data.map(index => {
            if (index.status === 'pending') {
                pending = pending + 1;
            }
        })
        // --- updating total marks counter
        total = data.length;

        // --- updating published marks counterdata.map(index=>{
        data.map(index => {
            if (index.status === 'published') {
                published = published + 1;
            }
        })

    }

    return (
        <div>
            {/* --- Navbar for Admin Panel --- */}
            <AdminNavbar></AdminNavbar>

            <section className="py-6 bg-primary">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="px-3 py-20 bg-opacity-10">
                        <ul className="assignment-status">
                            <li>Total <span>{total}</span></li>
                            <li>Pending <span>{pending}</span></li>
                            <li>Mark Sent <span>{published}</span></li>
                        </ul>
                        <div className="overflow-x-auto mt-4">
                            <table className="divide-y-1 text-base divide-gray-600 w-full">
                                <thead>
                                    <tr>
                                        <th className="table-th">Assignment</th>
                                        <th className="table-th">Date</th>
                                        <th className="table-th">Student Name</th>
                                        <th className="table-th">Repo Link</th>
                                        <th className="table-th">Mark</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-600/50">
                                    {content}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AssignmentMark;