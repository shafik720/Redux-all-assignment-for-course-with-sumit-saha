import React from 'react';
import { useSelector } from 'react-redux';
import { useGetTaskQuery } from '../../../features/tasks/taskApi';
import SingleTask from './SingleTask/SingleTask';

const TaskList = () => {
    const { data, isLoading, isError, error } = useGetTaskQuery();

    const projectState = useSelector(state => state.project);
    const {projectList} = projectState;
    
    const searchState = useSelector(state => state.search);
    const {searchText} = searchState;

    let content = null;
    if (isLoading && !isError) {
        content = <h1>Loading...</h1>
    }
    if (!isLoading && isError) {
        content = <p>{error?.error}</p>
    }
    if (!isLoading && !isError && data.length === 0) {
        content = <p>No Tasks Found</p>
    }
    if (!isLoading && !isError && data.length > 0) {
        content = data?.filter(task => projectList?.includes(task?.project?.projectName)).filter(task => task?.taskName.toLowerCase().includes(searchText.toLowerCase()) ).map(task => <SingleTask
            key={task.id}
            task={task}
        ></SingleTask>)
    }
    return (
        <div className="lws-task-list">
            {content}
        </div>
    );
};

export default TaskList;