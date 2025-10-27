const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
    return null
}

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body

  if (!title || !url) {
    return res.status(400).json({ error: 'Title or URL is missing' })
  }

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.JWT_SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return res.status(400).json({ error: 'No users found in database' })
  }

  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  })

  const savedBlog = await newBlog.save()

  user.blogs = user.blogs || []
  user.blogs.push(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
      
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, 
    {likes: body.likes},
    { new: true, runValidators: true, context: 'query' } 
  )
  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
                    
    
})

module.exports = blogsRouter