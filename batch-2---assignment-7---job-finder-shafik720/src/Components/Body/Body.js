import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddJob from './AddJob/AddJob';
import Alljobs from './Alljobs/Alljobs';
import EditJob from './EditJob/EditJob';

const Body = () => {
    return (
        <div className="lg:pl-[14rem]  mt-[5.8125rem]">            
            <Routes>
                <Route path='/' element={<Alljobs></Alljobs>}></Route>
                <Route path='/addJob' element={<AddJob></AddJob>}></Route>
                <Route path='/editJob' element={<EditJob></EditJob>}></Route>
            </Routes>
        </div>
    );
};

export default Body;