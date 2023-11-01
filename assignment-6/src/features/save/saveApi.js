


const saveApi = async(id)=>{
    const response = await fetch(`http://localhost:9000/blogs/${id}`);
    const blog = await response.json();

    blog.isSaved = !blog.isSaved;

    await fetch(`http://localhost:9000/blogs/${id}`, {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(blog)
    })

    return blog;
}

export default saveApi;