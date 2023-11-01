import apiSlice from "../api/apiSlice";
import { assignmentApi } from "../assignment/assignmentApi";
// import {assignmentApi} from '../assignment/assignmentApi'


const assignmentMarkApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // getAssignmentMarks : builder.
        getAssignmentMarks: builder.query({
            query: () => ({
                url: '/assignmentMark',
                method: 'GET'
            })
        }),
        addAssignmentMark: builder.mutation({
            query: (data) => ({
                url: '/assignmentMark',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;

                    if (response?.data?.id) {
                        const pathResult = dispatch(apiSlice.util.updateQueryData('getAssignmentMarks', undefined, (draft) => {
                            const newId = (draft[draft.length - 1].id) + 1;
                            arg.id = newId;
                            draft.push(arg);
                        }))
                        // dispatch(apiSlice.util.updateQueryData('getAssignments', undefined, (draft)=> {
                        //     draft = draft ;
                        // } )) ;
                        // const assignmentsResult = await apiSlice.getAssignments();
                        const assignmentsResult = await dispatch(assignmentApi.endpoints.getAssignments.initiate());
                        console.log(assignmentsResult.data);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        editAssignmentMark: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignmentMark/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;

                    if (response?.data?.id) {
                        console.log(arg)
                        const pathResult2 = await dispatch(apiSlice.util.updateQueryData('getAssignmentMarks', undefined, (draft) => {

                            const draftAssignments = draft.find(
                                (c) => c.id === arg.id
                            );
                            // console.log(arg.data);
                            draftAssignments.mark = arg.data.mark;
                            draftAssignments.status = arg.data.status;
                        }))

                        // const pathResult3 = await dispatch(apiSlice.util.updateQueryData('getAssignment', arg.id.toString(), (draft) => {
                        //     draft.video_title = arg.data.video_title;
                        //     draft.title = arg.data.title;
                        //     draft.totalMark = arg.data.totalMark;
                        //     draft.video_id = arg.data.video_id;
                        // }))
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }),
    })
})

export const { useGetAssignmentMarksQuery, useEditAssignmentMarkMutation, useAddAssignmentMarkMutation } = assignmentMarkApi;