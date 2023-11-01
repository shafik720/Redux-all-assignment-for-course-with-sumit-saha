import axios from '../../utilities/axios';



const singleBlogApi = async (id) => {
    
    const response = await axios.get(`/blogs/${id}`);
    const blog = response.data;

    return blog;
}


export default singleBlogApi;