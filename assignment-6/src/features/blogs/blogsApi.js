import axios from '../../utilities/axios';



const blogsApi = async ({ sort, filter }) => {
    
    const response = await axios.get('/blogs');
    const blogs = response.data;

    let sortedBlogs = blogs;

    // --- function for sorting blog post according to newest date
    function sortByCreatedAt(blogs) {
        blogs.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        sortedBlogs = blogs;
    }

    // --- function for sorting blog post according to most liked
    function sortBlogsByLikes(blogs) {
        blogs.sort((a, b) => b.likes - a.likes);
        sortedBlogs = blogs;
    }

    // --- function for sorting blog post according to the most recent post
    if (sort === 'newest') {
        sortByCreatedAt(blogs);
    } else if (sort === 'most_liked') {
        sortBlogsByLikes(blogs);
    }

    // --- function for sorting blog post according to saved, non-saved
    let blogContainer = [];
    if (filter === 'saved') {
        blogs.map(blogs => {
            if (blogs.isSaved) {
                blogContainer.push(blogs);
            }
        })
        sortedBlogs = blogContainer;
    }

    return sortedBlogs;
}


export default blogsApi;