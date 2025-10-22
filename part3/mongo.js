const Person = require('./models/person')

if (process.argv.length <3) {
  console.log('Please give the password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


if (process.argv.length === 5) {
    const person = new Person({name, number})
    person.save().then(persons => {
        console.log(`added ${name} number ${number} to phonebook`)
        process.exit()
    })
} else if (!name && !number) {
        Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        })
    }
else {
  console.log('Please provide name and number to add new entry')
  process.exit(1)    
}

