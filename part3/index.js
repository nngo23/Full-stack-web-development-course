const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
app.use(cors())
app.use(express.static('dist'))

app.use(express.json())
morgan.token('postPerson',request => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
    } return null
})
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :postPerson'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.post('/api/persons', async (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  try {
    const person = new Person({ name, number })
    const savedPerson = await person.save()
    response.json(savedPerson)
  } catch (error) {
    console.error('Save error:', error.message)
    next(error)
  }
}) 

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    const result = await Person.findByIdAndDelete(request.params.id)
    if (!result) {
      return response.status(404).json({ error: 'person not found' })
    }
    response.status(204).end()
  } catch (error) {
    console.error('Delete error:', error.message)
    next(error)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
