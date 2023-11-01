import React from 'react';
import avatarSumit  from '../../../../../assets/images/avatars/sumit.png';

const SideMembers = ({team}) => {
    const{id, name,  avatar} = team ; 
    return (
        <div className="mt-3 space-y-4">

            <div className="checkbox-container">
                <img src={avatar} className="team-avater" />
                <p className="label">{name}</p>
            </div>
        </div>
    );
};

export default SideMembers;