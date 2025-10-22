const mongoose = require('mongoose')

if (process.argv.length <3) {
  console.log('Please give the password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const encodedPassword = encodeURIComponent(password)
const url = `mongodb+srv://fullstack:${encodedPassword}@cluster01.aai9gm9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    const person = new Person({name, number})
    person.save().then(persons => {
        console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    })
} else {
    if (!name || !number) {
        Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        })
    }
}

