import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {removeProject, showProject} from '../../../../../features/project/projectSlice'

const SidebarProject = ({project}) => {
    const {id, projectName, colorClass} = project ; 

    const [check, setCheck] = useState(true);
    const dispatch = useDispatch();
    const toggleCheckBox = () => {
        if(!check){
            dispatch(showProject(projectName));
        }else{
            dispatch(removeProject(projectName));
        }
    }

    const projectState = useSelector(state => state.project );
    // console.log(projectState);
    return (
        <div className="mt-3 space-y-4">

            <div className="checkbox-container">
                <input 
                type="checkbox" 
                className={`${colorClass}`} 
                checked = {check}
                onChange = {() => setCheck(!check)}
                onClick = {toggleCheckBox}
                />
                <p className="label">{projectName}</p>
            </div>

        </div>
    );
};

export default SidebarProject;