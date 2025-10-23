const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const path = require('path')

// --- Middleware ---
app.use(cors())
app.use(express.json())

// --- Logging with Morgan ---
morgan.token('postPerson', req => {
  if (req.method === 'POST') return JSON.stringify(req.body)
  return null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postPerson'))

// --- API Routes ---
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  const person = new Person({ name, number })
  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(next)
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(next)
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => person ? res.json(person) : res.status(404).json({ error: 'Not found person' }))
    .catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updated => updated ? res.json(updated) : res.status(404).end())
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => result ? res.status(204).end() : res.status(404).json({ error: 'Not found person' }))
    .catch(next)
})

app.get('/info', (req, res, next) => {
  Person.countDocuments()
    .then(total => res.send(`<p>Phonebook has info for ${total} people</p><p>${new Date()}</p>`))
    .catch(next)
})

// --- Serve frontend from dist folder ---
const distPath = path.join(__dirname, 'dist')
app.use(express.static(distPath))

// Catch-all route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

// --- Unknown endpoint handler ---
app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})

// --- Error handler ---
app.use((error, req, res, next) => {
  console.error('🔥 ERROR NAME:', error.name)
  console.error('🔥 ERROR MESSAGE:', error.message)

  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(e => e.message)
    return res.status(400).json({ error: messages.join(', ') })
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' })
  }

  res.status(500).json({ error: 'Internal server error' })
})

// --- Start server ---
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
