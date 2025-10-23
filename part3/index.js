const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

// --- Middleware ---
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

// Define custom token BEFORE using morgan
morgan.token('postPerson', req => {
  if (req.method === 'POST') return JSON.stringify(req.body)
  return null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postPerson'))

// --- Routes ---
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' })
  }
  const person = new Person({ name, number })
  person
    .save()
    .then(saved => response.json(saved))
    .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(next)
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) res.json(person)
      else res.status(404).json({ error: 'Not found person' })
    })
    .catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updated => {
      if (!updated) return res.status(404).end()
      res.json(updated)
    })
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) res.status(204).end()
      else res.status(404).json({ error: 'Not found person' })
    })
    .catch(next)
})

app.get('/info', (req, res, next) => {
  Person.countDocuments()
    .then(total => res.send(`<p>Phonebook has info for ${total} people</p><p>${new Date()}</p>`))
    .catch(next)
})

// --- Unknown endpoint ---
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

// --- Server ---
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
