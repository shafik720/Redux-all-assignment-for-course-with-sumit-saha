import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortByIntern, sortByRemote, sortByFullTime, sortByDefault } from '../../features/jobs/jobSlice';

const Sidebar = () => {
    const dispatch = useDispatch();

    // --- sort jobs by intern
    const internSort = (e) => {
        dispatch(sortByIntern());
    }

    // --- sort jobs by full-time
    const fulltimeSort = (e) => {
        dispatch(sortByFullTime());
    }

    // --- sort jobs by remote job
    const remoteSort = (e) => {
        dispatch(sortByRemote());
    }

    // --- showing all job
    const defaultSort = (e) => {
        dispatch(sortByDefault());
    }
    return (
        <div className="sidebar">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/"
                            className="main-menu menu-active"
                            id="lws-alljobs-menu"
                            onClick={defaultSort}>
                            <i className="fa-solid fa-briefcase"></i>
                            <span> All Available Jobs</span>
                        </Link>
                        <ul className="space-y-6 lg:space-y-2 ">
                            <li>
                                <Link
                                    className="sub-menu"
                                    // href="/jobs/internship" 
                                    to="/"
                                    id="lws-internship-menu"
                                    onClick={internSort}>
                                    <i className="fa-solid fa-stop !text-[#FF5757]"></i>
                                    Internship
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="sub-menu"
                                    // href="/jobs/fulltime"
                                    to="/"
                                    id="lws-fulltime-menu"
                                    onClick={fulltimeSort}>
                                    <i className="fa-solid fa-stop !text-[#FF8A00]"></i>
                                    Full Time
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="sub-menu"
                                    // href="/jobs/remote" 
                                    to='/'
                                    id="lws-remote-menu"
                                    onClick={remoteSort}>
                                    <i className="fa-solid fa-stop !text-[#56E5C4]"></i>
                                     Remote
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/addjob" className="main-menu" id="lws-addJob-menu">
                            <i className="fa-solid fa-file-circle-plus"></i>
                            <span> Add NewJob</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;