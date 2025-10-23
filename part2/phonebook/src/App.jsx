import { useState, useEffect } from 'react'
import personsServices from './services/persons'

import Filter from './components/filter'
import PersonForm from './components/PersonForm'
import Persons from './components/persons'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFiltered] = useState('')
  const [notification, setNotification] = useState({ type: '', message: null })

  // Fetch initial data
  useEffect(() => {
    personsServices.getAll().then(firstPersons => setPersons(firstPersons))
  }, [])

  // Notification helper
  const showNotification = ({ type, message }) => {
    setNotification({ type, message })
    setTimeout(() => setNotification({ type: '', message: null }), 6000)
  }

  // Robust backend error handler
  const handleBackendError = (error, fallbackMessage) => {
  console.log('Axios full error:', error)
  let backendMessage = fallbackMessage

  const data = error.response?.data

  if (data) {
    if (typeof data === 'string') backendMessage = data
    else if (data.error) backendMessage = data.error
    else if (Array.isArray(data.error)) backendMessage = data.error.join(', ')
    else if (data.message) backendMessage = data.message
  }

  showNotification({ type: 'error', message: backendMessage })
}
  // Filtered list
  const personToShow = persons.filter(person =>
    person.name.trim().toLowerCase().includes(filteredName.toLowerCase())
  )

  // Add or update person
  const addName = (event) => {
    event.preventDefault()
    const presentPerson = persons.find(
      p => newName.trim().toLowerCase() === p.name.trim().toLowerCase()
    )

    if (presentPerson) {
      const confirmUpdate = window.confirm(
        `${presentPerson.name} is already added, replace the old number?`
      )
      if (confirmUpdate) {
        const updatedPerson = { ...presentPerson, number: newNumber }
        personsServices.update(presentPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === presentPerson.id ? returnedPerson : p))
            setNewName('')
            setNewNumber('')
            showNotification({
              type: 'success',
              message: `Number of ${presentPerson.name} is changed`
            })
          })
          .catch(error => handleBackendError(error, `Failed to update ${presentPerson.name}`))
      }
      return
    }

    const newPerson = { name: newName, number: newNumber }
    personsServices.create(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')
        showNotification({ type: 'success', message: `Added ${newPerson.name}` })
      })
      .catch(error => handleBackendError(error, `Failed to add ${newPerson.name}`))
  }

  // Delete person
  const deleteName = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsServices.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification({ type: 'success', message: `Deleted ${name}` })
        })
        .catch(() => {
          showNotification({
            type: 'error',
            message: `Information of ${name} was already deleted from server`
          })
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  // Input handlers
  const handleNewName = (e) => setNewName(e.target.value)
  const handleNewNumber = (e) => setNewNumber(e.target.value)
  const handleFilteredName = (e) => setFiltered(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification type={notification.type} message={notification.message} />}
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
      <Persons personToShow={personToShow} deleteName={deleteName} />
    </div>
  )
}

export default App