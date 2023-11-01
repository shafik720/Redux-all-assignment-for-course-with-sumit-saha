import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../../features/jobs/jobSlice';
import Loading from '../../Loading/Loading';
import Jobs from './Jobs/Jobs';
import JobsHeader from './JobsHeader/JobsHeader';

const Alljobs = () => {
    const jobState = useSelector(state => state.jobs);
    const dispatch = useDispatch();
    const { jobs, isError, isLoading, error, sortBy, searchBy, salaryRange } = jobState;
    // console.log(salaryRange);



    // --- getting all job data from server
    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    // --- SEARCH FUNCTIONALITY
    const searchFunction = (job) => {
        return job.title.toLowerCase().includes(searchBy.toLowerCase());
    }

    // --- SORTING BY JOB TYPE(intern, full-time, remote)
    const sortingByJobType = job => {
        if (sortBy === 'Internship') {
            if (job.type === 'Internship') {
                return <Jobs key={job?.id} job={job}></Jobs>
            }
        } else if (sortBy === 'Full Time') {
            if (job.type === 'Full Time') {
                return <Jobs key={job?.id} job={job}></Jobs>
            }
        } else if (sortBy === 'Remote') {
            if (job.type === 'Remote') {
                return <Jobs key={job?.id} job={job}></Jobs>
            }
        }
        else {
            return <Jobs key={job?.id} job={job}></Jobs>
        }
    }

    const sortingBySalaryRange = (a, b) => {
        if(salaryRange === 'Salary (Low to High)'){
            return a.salary - b.salary;
        }else if(salaryRange === 'Salary (High to Low)'){
            return b.salary - a.salary;
        } 
    }

    let content = null;
    if (isLoading && !isError) content = <Loading></Loading>;
    if (!isLoading && isError) content = <h2>{error}</h2>
    if (!isLoading && !isError && jobs.length === 0) content = <h2>No Jobs Found</h2>;
    if (!isLoading && !isError && jobs.length > 0) content = jobs.slice().sort(sortingBySalaryRange).filter(searchFunction).map(sortingByJobType)

    return (
        <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
            <JobsHeader></JobsHeader>
            {content}
        </main>
    );
};

export default Alljobs;