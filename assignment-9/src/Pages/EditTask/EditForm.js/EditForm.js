import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGetProjectQuery } from '../../../features/project/projectApi';
import { useEditTaskMutation } from '../../../features/tasks/taskApi';
import { useGetTeamMembersQuery } from '../../../features/teamMembers/teamMembersApi';

const EditForm = ({ data }) => {
    const {
        taskName: fetchedTaskName,
        teamMember: fetchedTeamMember,
        status,
        deadline,
        id: fetchdId,
        project
    } = data;
    const { projectName: fetchedProjectName } = project;
    const { name: fetchedMemberName } = fetchedTeamMember;
    

    // --- getting team member list from server
    const { data: teamMembers } = useGetTeamMembersQuery();

    // --- getting project details from server
    const { data: projectss } = useGetProjectQuery();

    const [taskname, setTaskname] = useState(fetchedTaskName);
    const [member, setMember] = useState(fetchedMemberName);
    const [projectName, setProjectName] = useState(fetchedProjectName);
    const [date, setDate] = useState(deadline);

    const [editTask, { }] = useEditTaskMutation();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        editTask({
            id: fetchdId,
            data: {
                taskName: taskname,
                teamMember: teamMembers.find(index => index.name == member),
                deadline: date,
                project: projectss.find(index => index.projectName == projectName),
                status: 'inProgress',
                // id : fetchdId,
            }
        });
        navigate('/');
    }
    return (
        <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="fieldContainer">
                    <label>Task Name</label>
                    <input
                        type="text"
                        name="taskName"
                        id="lws-taskName"
                        required
                        placeholder="Implement RTK Query"
                        value={taskname}
                        onChange={e => setTaskname(e.target.value)}
                    />
                </div>

                <div className="fieldContainer">
                    <label>Assign To</label>

                    <select id="lws-teamMember" name="teamMember" required
                        onChange={e => setMember(e.target.value)}
                        defaultValue={fetchedMemberName} value={member}
                    >
                        <option hidden >Select Job</option>
                        {teamMembers?.map(member => <option key={member.id}>{member.name}</option>)}
                    </select>
                </div>

                <div className="fieldContainer">
                    <label>Project Name</label>

                    <select id="lws-projectName" name="projectName" required
                        onChange={e => setProjectName(e.target.value)}
                        defaultValue={fetchedProjectName} value={projectName}
                    >
                        <option hidden >Select Project</option>
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
    );
};

export default EditForm;