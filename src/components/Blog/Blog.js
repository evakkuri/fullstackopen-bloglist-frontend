import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showFullInfo, setShowFullInfo] = useState(false)

  const toggleVisibility = () => {
    setShowFullInfo(!showFullInfo)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!showFullInfo)
    return (
      <div style={blogStyle}>
        {blog.author}: {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
    )

  else return (
    <div style={blogStyle}>
      <p>
        {blog.author}: {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </p>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button>like</button>
      </p>
    </div>
  )
}

export default Blog