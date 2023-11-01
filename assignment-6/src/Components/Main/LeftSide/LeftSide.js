import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelected, sortSelected } from '../../../features/filters/filtersSlice';

const LeftSide = () => {
    const dispatch = useDispatch();

    const filterState = useSelector(state => state.filters);
    const{filter, sort} = filterState;

    // --- changing the filtering state according to sort
    const handleSortingSelection = (event) => {
        dispatch(sortSelected(event.target.value));
    }

    const handleFilterSelection = (event) => {
        dispatch(filterSelected(event.target.value));
    }

    return (
        <aside>
            <div className="sidebar-items">
                <div className="sidebar-content">
                    <h4>Sort</h4>
                    <select value={sort} onChange={handleSortingSelection} name="sort" id="lws-sort" className="w-full max-w-[150px] border-2 rounded-md text-gray-500">
                        <option value="">Default</option>
                        <option  value="newest">Newest</option>
                        <option value="most_liked">Most Liked</option>
                    </select>
                </div>
                <div className="sidebar-content">
                    <h4>Filter</h4>
                    <div className="radio-group">
                        {/* <!-- handle filter on button click --> */}
                        <div>
                            <input onChange={handleFilterSelection}
                            type="radio" 
                            name="filter" 
                            id="lws-all" 
                            className="radio" 
                            value = 'all'
                            checked={ filter == 'all' && true}
                            />
                            <label htmlFor="lws-all">All</label>
                        </div>
                        <div>
                            <input onChange={handleFilterSelection}
                            type="radio" 
                            name="filter" 
                            id="lws-saved" 
                            className="radio" 
                            value="saved"
                            checked={ filter == 'saved' && true}
                            />
                            <label htmlFor="lws-saved">Saved</label>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default LeftSide;