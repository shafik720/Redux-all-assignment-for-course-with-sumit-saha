import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { editJob, sortByDefault } from '../../../features/jobs/jobSlice';

const EditJob = () => {
    const jobState = useSelector(state => state.jobs);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {editing} = jobState;
    // console.log(editing.deadline);

    const [title, setTitle] = useState(editing.title);
    const [type, setType] = useState(editing.type);
    const [salary, setSalary] = useState(editing.salary);
    const [date, setDate] = useState(editing.deadline);

    // --- adding a new job
    const handleSubmitEdit = (e) => {
        e.preventDefault();

        dispatch(editJob({
            id : editing.id,
            data : {
                title,
                type,
                salary,
                deadline : date
            }
        }))
        // --- taking user to home after adding a job
        navigate('/');
        dispatch(sortByDefault());
    }
    return (
        <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
            <h1 className="mb-10 text-center lws-section-title">Edit Job</h1>

            <div className="max-w-3xl mx-auto">
                <form className="space-y-6" onSubmit={handleSubmitEdit}>
                    <div className="fieldContainer">
                        <label htmlFor="lws-JobTitle" className="text-sm font-medium text-slate-300">Job Title</label>
                        <select id="lws-JobTitle" name="lwsJobTitle" required onChange={e => setTitle(e.target.value)} defaultValue={title}>
                            <option value="" hidden>Select Job</option>
                            <option>Software Engineer</option>
                            <option>Software Developer</option>
                            <option>Full Stack Developer</option>
                            <option>MERN Stack Developer</option>
                            <option>DevOps Engineer</option>
                            <option>QA Engineer</option>
                            <option>Product Manager</option>
                            <option>Social Media Manager</option>
                            <option>Senior Executive</option>
                            <option>Junior Executive</option>
                            <option>Android App Developer</option>
                            <option>IOS App Developer</option>
                            <option>Frontend Developer</option>
                            <option>Frontend Engineer</option>
                        </select>
                    </div>

                    <div className="fieldContainer">
                        <label htmlFor="lws-JobType">Job Type</label>
                        <select id="lws-JobType" name="lwsJobType" required defaultValue={type} onChange={e => setType(e.target.value)}>
                            <option value="" hidden >Select Job Type</option>
                            <option>Full Time</option>
                            <option>Internship</option>
                            <option>Remote</option>
                        </select>
                    </div>

                    <div className="fieldContainer">
                        <label htmlFor="lws-JobSalary">Salary</label>
                        <div className="flex border rounded-md shadow-sm border-slate-600">
                            <span className="input-tag">BDT</span>
                            <input type="number" name="lwsJobSalary" id="lws-JobSalary" required className="!rounded-l-none !border-0"
                                placeholder="20,00,000" onChange={e => setSalary(e.target.value)} defaultValue={salary} />
                        </div>
                    </div>

                    <div className="fieldContainer">
                        <label htmlFor="lws-JobDeadline">Deadline</label>
                        <input type="date" name="lwsJobDeadline" id="lws-JobDeadline" required onChange={e => setDate(e.target.value)} 
                        defaultValue={date} />
                    </div>

                    <div className="text-right">
                        <button type="submit" id="lws-submit" className="cursor-pointer btn btn-primary w-fit">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default EditJob;