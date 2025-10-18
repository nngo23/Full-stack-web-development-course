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
    const existingPerson = persons.find(p => newName.trim().toLowerCase() === p.name.trim().toLowerCase())
    if (existingPerson) {
      const confirmUpdate = window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (confirmUpdate) {
        const updatedPerson =  {... existingPerson, number: newNumber}
        personsServices
        .update(existingPerson.id, updatedPerson).then(returnedPerson => {
        setPersons(persons.map(p => p.id === existingPerson.id ? returnedPerson : p))
        setNewName('')
        setNewNumber('')
        })
        .catch(error => {
          alert(`Information of ${existingPerson.name} was already deleted from server`)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })
        return
      }
    return
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
    
  

  const deleteName = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsServices
      .remove(id)
      .then(() => setPersons(persons.filter(p => p.id !== id)))
      .catch(error => {
        alert(
          `Information of ${name} was already deleted from server`
        )
        setPersons(persons.filter(p => p.id !== id))
      })
    }
    
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
      <Persons personToShow={personToShow} deleteName={deleteName}/>

    </div>
  )
}

export default App