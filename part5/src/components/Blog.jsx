import { useState } from 'react'

const Blog = ({ blog, updateLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}</button>
      </p>
   
    {visible && (
      <div>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={() => updateLike(blog)}>like</button></p>
      <p>{blog.username || blog.user.name}</p>
      </div>
    )}
  
    </div>

)}

export default Blog