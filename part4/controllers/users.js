const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const validateUserInput = (username, password) => {
  if (!username || username.length < 3) {
    return 'Username must be required and have at least 3 characters'
  }
  if (!password || password.length < 3) {
    return 'Password must be required and have at least 3 characters'
  }
  return ''
}

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  const validationError = validateUserInput(username, password)
  if (validationError) return res.status(400).json({ error: validationError })

  const presentUser = await User.findOne({ username })
  if (presentUser) return res.status(400).json({ error: 'Username must be unique' })

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username, name, passwordHash })

  user.save()
    .then(savedUser => res.status(201).json(savedUser))
    .catch(error => {
      if (error.name === 'ValidationError') res.status(400).json({ error: error.message })
      else next(error)
    })
})


module.exports = usersRouter