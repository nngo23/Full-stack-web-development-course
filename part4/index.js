const express = require('express')
const app = express()
//const cors = require('cors')
//const morgan = require('morgan')
const Blog = require('./models/blog')

//app.use(cors())
//app.use(express.static('dist'))
app.use(express.json())

//morgan.token('postPerson', (req) => (req.method === 'POST' ? JSON.stringify(req.body) : null))
//app.use(morgan(':method :url :status :res[content-length] :response-time ms :postPerson'))

app.post('/api/blogs', (request, response) => {
  
  const blog = new Blog(request.body)
  blog.save()
    .then(savedBlog => response.json(savedBlog))
    
})

app.get('/api/blogs', (req, res) => {
  Blog.find({})
    .then(blogs => res.json(blogs))
    
})

const PORT = 3003
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
