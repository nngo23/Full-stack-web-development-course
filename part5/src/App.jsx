import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ type: '', message: null })
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const showNotification = ({ type, message }) => {
    setNotification({ type, message })
    setTimeout(() => setNotification({ type: '', message: null }), 4000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification({ type: 'success', message: `Welcome ${user.name}` })
    } catch {
      showNotification({ type: 'error', message: 'wrong username or password' })
    }
  }

  const loginForm = () => ( 
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  const addBlog = async (event) => {
    event.preventDefault()

    try {
      //const blog = { title: newTitle, author: newAuthor, url: newUrl }
      const newBlog = await blogService.create({title: newTitle, author: newAuthor, url: newUrl})
      setBlogs(blogs.concat(newBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      showNotification({ type: 'success', message: `a new blog "${newBlog.title} by ${newBlog.author} added"` })
    } catch {
      showNotification({ type: 'error', message: 'error adding blog' })
    }
  }

 // const handleBlogChange = (event) => setNewBlog(event.target.value)
  //const handleTitleChange = (event) => setNewTitle(event.target.value)
 // const handleAuthorChange = {({ target }) => setUsername(target.value)}
  //const handleUrlChange = (event) => setNewUrl(event.target.value)

  const blogForm = () => ( 
    <form onSubmit={addBlog}> 
      <div> title: <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)} /></div> 
      <div> author: <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} /></div> 
      <div> url: <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)} /></div> 
      <div> <button type="submit">create</button> </div>
    </form>
  )

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>
      <h1>Blogs</h1>
      {notification.message && <Notification type={notification.type} message={notification.message} />}
      {!user && loginForm()}
      {user && (
      <div>
        <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
        <h1>Create new</h1>
        {blogForm()}
      </div>
    )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide blogs' : 'show blogs'}
        </button>
        {showAll && blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    </div>

  )
}

export default App