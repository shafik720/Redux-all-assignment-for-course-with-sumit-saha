import apiSlice from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
        getAssignments : builder.query({
            query : () => ({
                url : '/assignments',
                method : 'GET'
            })
        }),
        getAssignment : builder.query({
            query : (id) => ({
                url : `/assignments/${id}`,
                method : 'GET'
            })
        }),
        addAssignment: builder.mutation({
            query: (data) => ({
                url: '/assignments',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;

                    if (response?.data?.id) {
                        const pathResult = dispatch(apiSlice.util.updateQueryData('getAssignments', undefined, (draft) => {
                            const newId = (draft[draft.length-1].id) + 1 ;       
                            arg.id = newId ; 
                            draft.push(arg);
                        }))
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        editAssignment: builder.mutation({
            query: ({id, data}) => ({
                url: `/assignments/${id}`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;
                    
                    if (response?.data?.id) {
                        console.log(arg);
                        const pathResult2 = await dispatch(apiSlice.util.updateQueryData('getAssignments', undefined, (draft) => {
                            
                            const draftAssignments = draft.find(
                                (c) => c.id === arg.id
                            );
                            // console.log(arg.data);
                            draftAssignments.video_title = arg.data.video_title;
                            draftAssignments.title = arg.data.title;
                            draftAssignments.totalMark = arg.data.totalMark;
                            draftAssignments.video_id = arg.data.video_id;
                        }))

                        const pathResult3 = await dispatch(apiSlice.util.updateQueryData('getAssignment', arg.id.toString(), (draft) => {
                            draft.video_title = arg.data.video_title;
                            draft.title = arg.data.title;
                            draft.totalMark = arg.data.totalMark;
                            draft.video_id = arg.data.video_id;
                        }))
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        deleteAssignment : builder.mutation({
            query : (id) => ({
                url: `/assignments/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;
                    
                    if (response.data) {                        
                        const pathResult3 = await dispatch(apiSlice.util.updateQueryData('getAssignments', undefined, (draft) => {                            
                            const indexToRemove = draft.indexOf(draft.find(index=>index.id==arg));
                            if(indexToRemove > -1){
                                draft.splice(indexToRemove, 1);
                            }
                            
                        }))
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        })
    })
})

export const{useGetAssignmentQuery, useGetAssignmentsQuery , useAddAssignmentMutation, useEditAssignmentMutation, useDeleteAssignmentMutation} = assignmentApi;