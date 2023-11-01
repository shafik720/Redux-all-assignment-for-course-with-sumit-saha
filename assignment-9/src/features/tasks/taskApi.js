import apiSlice from "../api/apiSlice";


export const taskApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTask: builder.query({
            query: () => `/tasks`,
        }),
        getSingleTask: builder.query({
            query: (id) => `/tasks/${id}`,
        }),
        addTask: builder.mutation({
            query: (data) => ({
                url: '/tasks',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {                
                try {
                    const taskAdded = await queryFulfilled;
                    // console.log(taskAdded);
                    if (taskAdded?.data?.id) {
                        dispatch(apiSlice.util.updateQueryData("getTask", arg?.id?.toString(), (draft) => {
                            draft.push(taskAdded?.data);
                        }))
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }),

        changeProgress: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // --- optimastic update 
                const pathResult = dispatch(
                    apiSlice.util.updateQueryData("getTask", undefined, (draft) => {
                        console.log("ok");
                        const draftTask = draft.find((d) => d.id == arg.id);
                        draftTask.status = arg.data.status;
                    }))
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.log(err);
                    pathResult.undo();
                }
            }
        }),
        editTask: builder.mutation({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // --- pessimistic update
                try {
                    const taskEdited = await queryFulfilled;
                    if(taskEdited?.data?.id){                        
                        const res1 = await dispatch(
                                apiSlice.util.updateQueryData("getTask", undefined, (draft) => {
                                    
                                    let draftTask = draft.find((d) => d.id == arg.id);
                                    
                                    draftTask.taskName = arg.data.taskName;
                                    draftTask.project = arg.data.project;
                                    draftTask.teamMember = arg.data.teamMember;
                                    draftTask.deadline = arg.data.deadline;
                                }))

                        const res2 = await dispatch(
                                apiSlice.util.updateQueryData("getSingleTask", arg?.id?.toString(), (draft) => {
                                    console.log(arg.data);
                                    
                                    draft.taskName = arg.data.taskName;
                                    draft.project = arg.data.project;
                                    draft.teamMember = arg.data.teamMember;
                                    draft.deadline = arg.data.deadline;
                                }))
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // --- optimastic update 
                const pathResult = dispatch(
                    apiSlice.util.updateQueryData("getTask", undefined, (draft) => {

                        const deletedTask = draft.find((d) => d.id == arg);
                        
                        const deletedIndex = draft.indexOf(deletedTask);
                        draft.splice(deletedIndex, 1);
                    }))
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.log(err);
                    pathResult.undo();
                }
            }
        })
    })
})


export const { useGetTaskQuery, useAddTaskMutation, useChangeProgressMutation , useDeleteTaskMutation, useGetSingleTaskQuery, useEditTaskMutation } = taskApi;