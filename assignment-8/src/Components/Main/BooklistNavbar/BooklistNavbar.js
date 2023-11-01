import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../../features/filter/filterSlice';

const BooklistNavbar = () => {
    const filterState = useSelector(state => state.filter);
    const{type} = filterState;

    // --- CHANGING FILTER (all/featured)
    const dispatch = useDispatch();
    const handleFilter = (value) => {
        dispatch(changeFilter(value));
    }
    return (
        <div className="flex items-center justify-between mb-12">
            <h4 className="mt-2 text-xl font-bold">Book List</h4>

            <div className="flex items-center space-x-4">
                <button className={`lws-filter-btn ${type==='all' && 'active-filter'}`} onClick={()=>handleFilter('all')}>All</button>
                <button className={`lws-filter-btn ${type==='featured' && 'active-filter'}`} onClick={()=>handleFilter('featured')}>Featured</button>
            </div>
        </div>
    );
};

export default BooklistNavbar;