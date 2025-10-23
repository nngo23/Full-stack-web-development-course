import { useState, useEffect } from 'react'
import personsServices from './services/personss'
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

  useEffect(() => {
    personsServices.getAll()
      .then(res => setPersons(res.data))
      .catch(err => console.error('Fetch failed:', err))
  }, [])

  const showNotification = ({ type, message }) => {
    setNotification({ type, message })
    setTimeout(() => setNotification({ type: '', message: null }), 6000)
  }

  const handleBackendError = (err) => {
    console.log('❌ FULL ERROR OBJECT:', err)
    const backendMessage = err.response?.data?.error
    console.log('🔥 backendMessage:', backendMessage)
    showNotification({ type: 'error', message: backendMessage || 'Unknown error' })
  }

  const personToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filteredName.toLowerCase())
  )

  const addName = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(
      p => p.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added. Replace number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personsServices.update(existingPerson.id, updatedPerson)
          .then(res => {
            setPersons(persons.map(p => p.id === existingPerson.id ? res.data : p))
            setNewName('')
            setNewNumber('')
            showNotification({ type: 'success', message: `Updated ${res.data.name}` })
          })
          .catch(handleBackendError)
      }
      return
    }

    const newPerson = { name: newName, number: newNumber }
    personsServices.create(newPerson)
      .then(res => {
        setPersons(persons.concat(res.data))
        setNewName('')
        setNewNumber('')
        showNotification({ type: 'success', message: `Added ${res.data.name}` })
      })
      .catch(handleBackendError)
  }

  const deleteName = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsServices.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification({ type: 'success', message: `Deleted ${name}` })
        })
        .catch(err => {
          handleBackendError(err)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.message && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <Filter filteredName={filteredName} handleFilteredName={e => setFiltered(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNewName={e => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNewNumber={e => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons personToShow={personToShow} deleteName={deleteName} />
    </div>
  )
}

export default App

