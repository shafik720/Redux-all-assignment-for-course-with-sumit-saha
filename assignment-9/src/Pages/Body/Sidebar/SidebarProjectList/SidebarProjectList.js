import React from 'react';
import { useGetProjectQuery } from '../../../../features/project/projectApi';
import SidebarProject from './SidebarProject/SidebarProject';

const SidebarProjectList = () => {
    const {data, isLoading, isError, error} = useGetProjectQuery() ;
    // console.log(data);

    let content = null ;
    if(isLoading && !isError){
        content = <h1>Loading...</h1>
    }
    if(!isLoading && isError){
        content = <p>{error?.error}</p>
    }
    if(!isLoading && !isError && data.length === 0){
        content = <p>No Project Found</p>
    }
    if(!isLoading && !isError && data.length > 0){
        content = data.map(project => <SidebarProject 
            key={project.id}
            project = {project}
            ></SidebarProject>)
    }
    return (
        <div>
            <h3 className="text-xl font-bold">Projects</h3>

                {content}

        </div>
    );
};

export default SidebarProjectList;