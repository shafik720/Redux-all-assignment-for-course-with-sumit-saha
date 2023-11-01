import React from 'react';
import SideMembers from './SideMembers/SideMembers';
import { useGetTeamMembersQuery } from '../../../../features/teamMembers/teamMembersApi';


const SidebarTeamMembers = () => {
    const {data, isLoading, isError, error} = useGetTeamMembersQuery();

    // console.log(data);

    let content = null ;
    if(isLoading && !isError){
        content = <h1>Loading...</h1>
    }
    if(!isLoading && isError){
        content = <p>{error?.error}</p>
    }
    if(!isLoading && !isError && data.length === 0){
        content = <p>No team Found</p>
    }
    if(!isLoading && !isError && data.length > 0){
        content = data.map(team => <SideMembers 
            key={team.id}
            team = {team}
            ></SideMembers>)
    }
    return (
        <div className="mt-8">
                <h3 className="text-xl font-bold">Team Members</h3>
                {content}
            </div>
    );
};

export default SidebarTeamMembers;