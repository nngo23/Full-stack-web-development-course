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

app.post('/api/persons', (request, response) => {
  const {name, number}=request.body
  if (!name || !number) {
    return response.status(400).json({error: 'name or number missing'}) 
  }      
  const person = new Person({name, number})
  person.save().then(saved_person =>
    response.json(saved_person)
  )
})    

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'malformatted id' })
  }

  Person.findByIdAndDelete(id)
    .then(() => {
      if () response.status(204).end()
      else response.status(404).json({ error: 'person not found' })
    })
    .catch(error => response.status(500).json({ error: 'server error' }))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
