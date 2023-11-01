import apiSlice from "../api/apiSlice";


const quizzApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzes : builder.query({
            query : ()=>({
                url : '/quizzes',
                method : 'GET',
            })
        }),
        getQuizz : builder.query({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: 'GET',
            })
        }),
        addQuiz: builder.mutation({
            query: (data) => ({
                url: '/quizzes',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;

                    if (response?.data?.id) {
                        const pathResult = dispatch(apiSlice.util.updateQueryData('getQuizzes', undefined, (draft) => {
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
        editQuiz: builder.mutation({
            query: ({id, data}) => ({
                url: `/quizzes/${id}`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;
                    
                    if (response?.data?.id) {
                        const pathResult2 = await dispatch(apiSlice.util.updateQueryData('getQuizzes', undefined, (draft) => {
                            console.log('ok 2 ')
                            let draftQuiz = draft.find(
                                (c) => c.id == arg.id
                            );                  
                            Object.assign(draftQuiz, arg.data);
                        }))

                        const pathResult3 = await dispatch(apiSlice.util.updateQueryData('getQuizz', arg.id.toString(), (draft) => {
                            Object.assign(draft, arg.data);
                        }))
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        deleteQuiz : builder.mutation({
            query : (id) => ({
                url: `/quizzes/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;
                    
                    if (response.data) {                        
                        const pathResult3 = await dispatch(apiSlice.util.updateQueryData('getQuizzes', undefined, (draft) => {                            
                            const indexToRemove = draft.indexOf(draft.find(index=>index.id==arg));
                            if(indexToRemove >-1){
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

export const{ useGetQuizzesQuery, useGetQuizzQuery, useAddQuizMutation, useEditQuizMutation, useDeleteQuizMutation } = quizzApi ;