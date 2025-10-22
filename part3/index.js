require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(cors())

app.get('/', (request, response) => {
  response.send(`
    <h1>Phonebook API</h1>
    <p>Use <a href="/api/persons">/api/persons</a> to view all entries.</p>
    <p>Use <a href="/info">/info</a> to see general info.</p>
    `)
})
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
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body=request.body
  if (!body.name || !body.number) {
    return response.status(400).json({error: 'name or number missing'}) 
  }      
  const person = new Person({name, number})
  person.save().then(saved_person =>
  response.json(saved_person)
  )
})  

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
  .then(deleted_person => response.status(204).end())
})

app.get('/info', (request, response) => {
    const time = new Date()
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${time}</p>
        `)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
