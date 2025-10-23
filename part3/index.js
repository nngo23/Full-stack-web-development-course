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
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).json({error: 'Not found person'})
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const {name, number}=request.body 
  if (!name || !number) { 
    return response.status(400).json({error: 'name or number missing'})
   } 
  const person = new Person({name, number}) 
  person.save().then(saved_person =>
    response.json(saved_person)) 
    .catch(error => next(error))
  }  
) 

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  Person.findById(request.params.id, {name, number}, {new: true, runValidators: true, context: 'query'})
    .then(person => {
      if (!person) {return response.status(404).end()}
      person.name = name
      person.number = number
      
      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  console.log('Request to delete id:', request.params.id)
  Person.findByIdAndDelete(request.params.id)
    .then(person => {
      console.log('Deleted person:', person)
      if (person) {
        response.status(204).end()
      } else {
        response.status(404).json({error: 'Not found person'})
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.countDocuments()
    .then(total => {
      const now = new Date()
      response.send(
        `<p>Phonebook contains ${total} people</p><p>${now}</p>`
      )
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'ValidationError') {
    return response.status(400).send({error: error.message})
  } 
  if (error.name === 'CastError') {
    return response.status(400).send({error:'Invalid ID format'})
  }
  response.status(500).json({error: 'Internal server error'})
  next(error)
  }
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
