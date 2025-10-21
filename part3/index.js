const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.static('dist'))
app.use(cors())
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

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
  response.json(persons)
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
  const person={
    id: Math.trunc(Math.random()*2000000),
    name: body.name,
    number: body.number
  }
  if (!body.name || !body.number) {
    return response.status(400).json({error: 'name or number missing'}) 
  }      
  const presentName = persons.find(p => p.name.trim().toLowerCase() === body.name.trim().toLowerCase())
  if (presentName) {
    return response.status(400).json({error: 'name must be unique'})
  }
  persons=persons.concat(person)
  response.json(person)
})  

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
    const time = new Date()
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${time}</p>
        `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
