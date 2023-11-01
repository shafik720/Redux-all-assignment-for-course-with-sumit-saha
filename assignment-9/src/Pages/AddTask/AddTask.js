import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useGetProjectQuery } from '../../features/project/projectApi';
import { useAddTaskMutation } from '../../features/tasks/taskApi';
import { useGetTeamMembersQuery } from '../../features/teamMembers/teamMembersApi';

const AddTask = () => {
    // --- getting team member list from server
    const {data : teamMembers} = useGetTeamMembersQuery();
    
    // --- getting project details from server
    const {data : projectss} = useGetProjectQuery();

    const [addTask, {data, isLoading, isError, error}] = useAddTaskMutation();
    
    const [taskname, setTaskname] = useState('');
    const [member, setMember] = useState('');
    const [projectName, setProjectName] = useState('');
    const [date, setDate] = useState('');
    
    const navigate = useNavigate();
    const handleSubmit= (e) => {
        e.preventDefault();
        // console.log(member, taskname, projectName, date);        
        addTask({
            taskName : taskname, 
            teamMember : teamMembers.find(index => index.name == member),
            deadline : date,
            project : projectss.find(index => index.projectName == projectName),
            status : 'pending',
        });
        navigate('/');
    }
    // console.log(data);
    return (
        <div className="container relative">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                    Create Task for Your Team
                </h1>

                <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="fieldContainer">
                            <label>Task Name</label>
                            <input
                                type="text"
                                name="taskName"
                                id="lws-taskName"
                                required
                                placeholder="Implement RTK Query"
                                value = {taskname}
                                onChange={e => setTaskname(e.target.value)}
                            />
                        </div>

                        <div className="fieldContainer">
                            <label>Assign To</label>
                            <select name="teamMember" id="lws-teamMember" required onChange={e => setMember(e.target.value)}>
                                <option value={member} hidden >Select Job</option>
                        {/* ----- getting member list from server ----- */}
                                {teamMembers?.map(member => <option key={member.id}>{member.name}</option>)}
                            </select>
                        </div>
                        <div className="fieldContainer">
                            <label>Project Name</label>
                            <select id="lws-projectName" name="projectName" required
                            onChange={e => setProjectName(e.target.value)}
                            >
                                <option value={projectName} hidden >Select Project</option>
                        {/* ----- getting project list from server ----- */}
                                {projectss?.map(projects => <option key={projects.id}>{projects?.projectName}</option>)}
                            </select>
                        </div>

                        <div className="fieldContainer">
                            <label>Deadline</label>
                            <input type="date" name="deadline" id="lws-deadline" required onChange={e => setDate(e.target.value)} value={date} />
                        </div>

                        <div className="text-right">
                            <button type="submit" className="lws-submit">Save</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddTask;