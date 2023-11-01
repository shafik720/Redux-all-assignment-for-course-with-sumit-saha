import axios from '../../utilities/axios';

// ?tags_like=javascript&tags_like=react&id_ne=4

const relatedBlogsApi = async ({ tags, id }) => {
    
    let queryString = 
    tags?.length > 0 
    ? tags.map((tag) => `tags_like=${tag}`).join("&") + `&id_ne=${id}`
    : `&id_ne=${id}`


    const response = await axios.get(`/blogs?${queryString}`);
    
    return response.data;
}


export default relatedBlogsApi;