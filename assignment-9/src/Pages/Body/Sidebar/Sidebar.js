import React from 'react';
import SidebarProjectList from './SidebarProjectList/SidebarProjectList';
import SidebarTeamMembers from './SidebarTeamMembers/SidebarTeamMembers';

const Sidebar = () => {
    return (
        <div className="sidebar">
            {/* <!-- Projects List --> */}
            <SidebarProjectList></SidebarProjectList>

            {/* <!-- Team Members --> */}
            <SidebarTeamMembers></SidebarTeamMembers>
        </div>
    );
};

export default Sidebar;