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

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(person => 
    response.json(person))
    .catch(next)
})

app.post('/api/persons', (request, response, next) => {
  const {name, number}=request.body 
  if (!name || !number) { 
    return response.status(400).json({error: 'name or number missing'})
   } 
  const person = new Person({name, number}) 
  person.save().then(saved_person =>
    response.json(saved_person)) 
    .catch(next)
  }  
) 

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {return response.status(404).end()}
      person.name = name
      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(person => {
      if (person) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    })
    .catch(next)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(err.message)
  if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  } 
  if (error.name === 'CastError') {
    return response.status(400).send({error:'Invalid ID format'})
  }
  response.status(500).json({error: 'Internal server error'})
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
