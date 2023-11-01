import apiSlice from "../api/apiSlice";

const videosApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => ({
                url: '/videos',
                method: 'GET',
            })
        }),
        getVideo : builder.query({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'GET',
            })
        }),
        addVideos: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const videos = await queryFulfilled;

                    if (videos?.data?.id) {
                        const pathResult = dispatch(apiSlice.util.updateQueryData('getVideos', undefined, (draft) => {
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
        editVideos: builder.mutation({
            query: ({id, data}) => ({
                url: `/videos/${id}`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const video = await queryFulfilled;
                    
                    if (video?.data?.id) {
                        const pathResult2 = await dispatch(apiSlice.util.updateQueryData('getVideos', undefined, (draft) => {
                            console.log('ok 2 ')
                            let draftVideo = draft.find(
                                (c) => c.id == arg.id
                            );                            
                            // draftVideo.title = arg.data.title;
                            // draftVideo = {...draftVideo, ...arg.data};
                            // console.log('draftVideo: ',draftVideo)
                            // console.log("arg.data: ",arg.data)
                            Object.assign(draftVideo, arg.data);
                        }))

                        const pathResult3 = await dispatch(apiSlice.util.updateQueryData('getVideo', arg.id.toString(), (draft) => {
                            
                            // console.log("arg.data: ",arg.data)
                            Object.assign(draft, arg.data);
                        }))
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        deleteVideo : builder.mutation({
            query : (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;
                    
                    if (response.data) {                        
                        const pathResult3 = await dispatch(apiSlice.util.updateQueryData('getVideos', undefined, (draft) => {                            
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

export const { useGetVideosQuery, useGetVideoQuery, useAddVideosMutation, useEditVideosMutation, useDeleteVideoMutation } = videosApi;