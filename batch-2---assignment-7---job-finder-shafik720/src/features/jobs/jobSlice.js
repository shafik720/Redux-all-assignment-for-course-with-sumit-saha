import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addJob, getAllJob, modifyJob, removeJob } from "./jobApi"


const initialState = {
    jobs : [],
    isError : false,
    isLoading : false,
    error : '',
    sortBy : '',
    searchBy : '',
    salaryRange : '',
    editing : {},
}

// --- thunk function for getting all job data
export const fetchJobs = createAsyncThunk('job/fetchData', async()=>{
    const data = await getAllJob();
    return data;
})

// --- thunk function for adding new job data 
export const addJobs = createAsyncThunk('job/addData', async({data})=>{
    const jobs = await addJob({data});
    return jobs;
})

// --- thunk function for editing job data 
export const editJob = createAsyncThunk('job/editData', async({id, data})=>{
    const jobs = await modifyJob({id, data});
    return jobs;
})


// --- thunk function for deleting a job
export const deleteJob = createAsyncThunk('job/deleteData', async(id)=>{
    const jobs = await removeJob(id);
    return jobs;
})

const jobSlice = createSlice({
    name : 'jobs',
    initialState,
    reducers : {
        sortByIntern : (state, action) => {
            state.sortBy = 'Internship';
        },
        sortByFullTime : (state, action) => {
            state.sortBy = 'Full Time';
        },
        sortByRemote : (state, action) => {
            state.sortBy = 'Remote';
        },
        sortByDefault : (state, action) => {
            state.sortBy = '';
        },
        editJobs : (state, action) => {
            state.editing = action.payload;
        },
        searchJobs : (state, action) => {
            state.searchBy = action.payload;
        },
        sortBySalaryRange : (state, action) => {
            state.salaryRange = action.payload;
        }
    },
    extraReducers : (builder) => {
        builder 
        // --- case for getting all job data
        .addCase(fetchJobs.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.error = '';
        })
        .addCase(fetchJobs.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.error = '';
            state.jobs = action.payload;
        })
        .addCase(fetchJobs.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
            state.jobs = [];
        })

        // --- case for adding new job data
        .addCase(addJobs.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.error = '';
        })
        .addCase(addJobs.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.error = '';
            state.jobs.push(action.payload);
        })
        .addCase(addJobs.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;            
        })

        // --- case for deleting a job data
        .addCase(deleteJob.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.error = '';
        })
        .addCase(deleteJob.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.error = '';
            state.jobs = state.jobs.filter(job => job.id !== action.meta.arg);
        })
        .addCase(deleteJob.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;            
        })
    }
})



export default jobSlice.reducer;
export const {sortByIntern, sortByFullTime, sortByRemote, sortByDefault, editJobs, searchJobs, sortBySalaryRange} = jobSlice.actions;