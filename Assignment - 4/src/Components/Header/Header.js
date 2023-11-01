import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../Assets/images/logo.svg';
import {searchFromReducer} from '../../Redux/filter/actionCreators'

const Header = () => {
    // --- search functionality implementation
    const searchState = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const searchInState = (text) => {
        dispatch(searchFromReducer(text));
    }

    // --- updating search state in every word input
    const searchEveryWord = (e) => {
        searchInState(e.target.value);
    }
    // console.log(searchState);
    const searchByText = (e) =>{
        e.preventDefault();
        console.log(e.target.search.value);
    }

    
    return (
        <div>
            <nav className="py-4 2xl:px-6">
                <div className="container flex items-center justify-between">
                    <img src={logo} width="150px" className="object-contain" />

                    <ul className="hidden md:flex items-center space-x-6">
                        <li className="font-semibold cursor-pointer">Book Store</li>
                        <li className="cursor-pointer">Wishlist</li>
                        <li className="cursor-pointer">My Collection</li>
                    </ul>

                    <form className="flex items-center" onSubmit={searchByText}>
                        <div className="group relative rounded-md bg-white">
                            <svg width="20" height="20" fill="currentColor"
                                className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-primary">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z">
                                </path>
                            </svg>
                            <input onKeyUp={searchEveryWord} type="text" placeholder="Filter books..." className="search" id="lws-searchBook" name="search" />
                        </div>
                    </form>
                </div>
            </nav>
        </div>
    );
};

export default Header;