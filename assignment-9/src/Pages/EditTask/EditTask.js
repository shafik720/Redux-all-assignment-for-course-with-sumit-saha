import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useGetProjectQuery } from '../../features/project/projectApi';
import { useGetSingleTaskQuery } from '../../features/tasks/taskApi';
import { useGetTeamMembersQuery } from '../../features/teamMembers/teamMembersApi';
import EditForm from './EditForm.js/EditForm';

const EditTask = () => {

    const params = useParams();
    const {id} = params ; 

    const{data, isLoading, isError, error} = useGetSingleTaskQuery(id);


    let content = null;
    if (isLoading && !isError) {
        content = <h1>Loading...</h1>
    }
    if (!isLoading && isError) {
        content = <p>{error?.error}</p>
    }
    if(!isLoading && !isError && data.id){
        content  = <EditForm data={data}></EditForm>
    }
    return (
        <div className="container relative">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                    Edit Task for Your Team
                </h1>

                <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
                    {content}
                </div>
            </main>
        </div>
    );
};

export default EditTask;