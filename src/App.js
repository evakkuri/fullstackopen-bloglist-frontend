import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ type: 'error', content: 'Wrong username or password' })
      setTimeout(() => {
        setNotification({})
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    window.location.reload()
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleAddBlog = async (event) => {
    event.preventDefault()
    console.log("Adding new blog...")

    try {
      const blog = await blogService.create({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      })

      console.log(`A new blog "${blog.title}" by ${blog.author} added`)

      setNotification({
        type: 'success',
        content: `A new blog "${blog.title}" by ${blog.author} added`
      })

      setNewBlog({
        title: '',
        author: '',
        url: ''
      })

      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch (exception) {
      setNotification({ type: 'error', content: `Error when adding new blog: ${exception}` })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const blogForm = () => (
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

  return (
    <div>
      <h1>Cool Blog App</h1>

      <div>
        <Notification notifObj={notification} />
      </div>

      {user === null ?
        loginForm() :
        <div>
          <p>
            {user.name} is logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <h2>Add new blog</h2>
          {blogForm()}
        </div>
      }

      <h2>Stored blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App