import React, { useState } from 'react';

const BlogForm = ({ blogService, setNotification, blogs, setBlogs }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleAddBlog = async (event) => {
    event.preventDefault()
    console.log("Adding new blog...")

    try {
      const blog = await blogService.create({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      })

      console.log(`A new blog "${blog.title}" by ${blog.author} was added successfully`)

      setNotification({
        type: 'success',
        content: `A new blog "${blog.title}" by ${blog.author} was added successfully`
      })

      setTimeout(() => {
        setNotification(null)
      }, 5000)

      setBlogs(blogs.concat(blog))

      setNewBlog({
        title: '',
        author: '',
        url: ''
      })

    } catch (exception) {
      setNotification({ type: 'error', content: `Error when adding new blog: ${exception}` })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleAddBlog}>
      <div>
        Title:
          <input
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
        />
      </div>
      <div>
        Author:
          <input
          type="text"
          value={newBlog.author}
          name="Author"
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        />
      </div>
      <div>
        Url:
          <input
          type="text"
          value={newBlog.url}
          name="Url"
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        />
      </div>
      <button type="submit">Add blog</button>
    </form>
  )
}

export default BlogForm