import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import {searchTask} from '../../features/tasks/taskSlice';
const Header = () => {
    const searchState = useSelector(state => state.search);
    
    const dispatch = useDispatch();
    const handleSearchInput = (e) => {
        dispatch(searchTask(e.target.value));
    }
    return (
        <nav className="container relative py-3">
            <div className="flex items-center justify-between">
                <Link to="/">
                    <img src={logo} />
                </Link>
                <div className="flex-1 max-w-xs search-field group">
                    <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
                    <input type="text" placeholder="Search Task" className="search-input" id="lws-searchTask" onChange={handleSearchInput} />
                </div>
            </div>
        </nav>
    );
};

export default Header;