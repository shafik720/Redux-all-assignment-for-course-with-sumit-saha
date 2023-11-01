import apiSlice from "../api/apiSlice";


export const projectApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getProject : builder.query({
            query : () => `/projects`,
        })
    })
})


export const  {useGetProjectQuery} = projectApi ;