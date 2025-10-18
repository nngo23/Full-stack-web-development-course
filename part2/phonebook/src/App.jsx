import {useState, useEffect} from 'react'
import personsServices from './services/personss'

import Filter from './components/filter'
import PersonForm from './components/PersonForm'
import Persons from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFiltered] = useState('')

  useEffect(() => {
    personsServices
    .getAll()
    .then(firstPersons => {
      setPersons(firstPersons)
    })
  }, [])

  const personToShow = persons.filter(person => person.name.trim().toLowerCase().includes(filteredName.toLowerCase()))
  
  const addName = (event) => {
    event.preventDefault()
    const overlappedName = persons.some((p) => newName.trim().toLowerCase() === p.name.trim().toLowerCase())
    if (overlappedName) {
      alert(`${newName} is already added to phonebook`)
    } 
    const newPerson = {name: newName, number: newNumber}
    personsServices
    .create(newPerson)
    .then(addedPerson => {
      setPersons(persons.concat(addedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleNewName = (e) => setNewName(e.target.value)
  const handleNewNumber = (e) => setNewNumber(e.target.value)
  const handleFilteredName = (e) => setFiltered(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filteredName={filteredName} handleFilteredName={handleFilteredName} />
      
      <h3>add a new</h3>
      <PersonForm 
        addName={addName}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}       
      />
      <h3>Numbers</h3>
      <Persons personToShow={personToShow}/>
    </div>
  )
}

export default App