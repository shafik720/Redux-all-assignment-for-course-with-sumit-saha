import React, { useState } from 'react';
import { useEditAssignmentMarkMutation } from '../../../../features/assingmentMark/assingmentMarkApi';
import moment from 'moment';

const SingleAssignmentMark = ({ assignment }) => {
    const { id, student_id, student_name, assignment_id, title, createdAt, totalMark, mark, repo_link, status } = assignment;
    const [marks, setMarks] = useState(100);

    const [editAssignmentMark, {isLoading, error, isError, isSuccess}] = useEditAssignmentMarkMutation() ; 
    // --- formating date
    const convertedDate = moment(createdAt).format('DD MMM YYYY');
    // --- giving mark
    const handleMark = () =>{
        editAssignmentMark({
            id,
            data : {
                mark : marks,
                status : 'published',
            }
        })
    }

    let markField = null;
    if (status === 'pending') {
        markField = <td className="table-td input-mark">
            <input max="100" value={marks} onChange={e => setMarks(e.target.value)} type="number" />
            <button onClick={handleMark}>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                    className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </button>
        </td>
    }
    if (status === 'published') {
        markField = <td className="table-td">{mark}</td>;
    }
    return (
        <tr>
            <td className="table-td">{title}</td>
            <td className="table-td">{convertedDate}</td>
            <td className="table-td">{student_name}</td>
            <td className="table-td">{repo_link}</td>
            {markField}
        </tr>
    );
};

export default SingleAssignmentMark;