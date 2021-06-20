import React, { useState } from 'react'

import blogService from '../../services/blogs'

const Blog = ({ blog }) => {
  const [showFullInfo, setShowFullInfo] = useState(false)

  const toggleVisibility = () => {
    setShowFullInfo(!showFullInfo)
  }

  const currentUsername = JSON
    .parse(window.localStorage.getItem('loggedInBlogAppUser'))
    .username

  const deleteButtonVisible = {
    display: blog.user.username === currentUsername
      ? ''
      : 'none'
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  /**
   * Button click function to add a 'like' to a blog entry
   */
  const addLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    console.log(`Updating blog ID ${blog.id} with new value ${updatedBlog}`)

    blogService.update(blog.id, updatedBlog)


  }

  /**
   * Button click function to delete a blog
   */
  const deleteBlog = () => {
    const confirmDelete = window.confirm(
      `Delete blog "${blog.title}" by ${blog.author}?`
    )
    console.log(confirmDelete)

    if (confirmDelete) blogService.remove(blog.id)
  }

  if (!showFullInfo)
    return (
      <div style={blogStyle}>
        {blog.author}: {blog.title} ({blog.likes})
        <button onClick={toggleVisibility}>Show more</button>
      </div>
    )

  else return (
    <div style={blogStyle}>
      <p>
        {blog.author}: {blog.title}
        <button onClick={toggleVisibility}>Show less</button>
      </p>
      <p>
        URL: {blog.url}
      </p>
      <p>
        Likes: {blog.likes}
        <button onClick={addLike}>like</button>
      </p>
      <div>
        Added by: {blog.user.name}
      </div>
      <div style={deleteButtonVisible}>
        <button onClick={deleteBlog}>Delete blog</button>
      </div>
    </div>
  )
}

export default Blog