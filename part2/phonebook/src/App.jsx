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

  // Fetch all persons on mount
  useEffect(() => {
    personsServices.getAll()
      .then(res => setPersons(res.data))
      .catch(err => console.error('❌ Fetch failed:', err))
  }, [])

  // Notification helper
  const showNotification = ({ type, message }) => {
    setNotification({ type, message })
    setTimeout(() => setNotification({ type: '', message: null }), 6000)
  }

  // Filtered persons
  const personToShow = persons.filter(person =>
    person.name.trim().toLowerCase().includes(filteredName.toLowerCase())
  )

  // Add or update person
  const addName = event => {
    event.preventDefault()
    const presentPerson = persons.find(
      p => newName.trim().toLowerCase() === p.name.trim().toLowerCase()
    )

    // Update existing person
    if (presentPerson) {
      const confirmUpdate = window.confirm(
        `${presentPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
      if (confirmUpdate) {
        const updatedPerson = { ...presentPerson, number: newNumber }
        personsServices.update(presentPerson.id, updatedPerson)
          .then(res => {
            setPersons(persons.map(p => p.id === presentPerson.id ? res.data : p))
            setNewName('')
            setNewNumber('')
            showNotification({
              type: 'success',
              message: `Number of ${presentPerson.name} is changed`,
            })
          })
          .catch(err => {
            const backendMessage = err.response?.data?.error
            showNotification({
              type: 'error',
              message: backendMessage || `Failed to update ${presentPerson.name}`,
            })
          })
      }
      return
    }

    // Add new person
    const newPerson = { name: newName, number: newNumber }
    personsServices.create(newPerson)
      .then(res => {
        setPersons(persons.concat(res.data))
        setNewName('')
        setNewNumber('')
        showNotification({ type: 'success', message: `Added ${res.data.name}` })
      })
      .catch(err => {
        console.log('❌ BACKEND ERROR DATA:', err.response?.data)
        const backendMessage = err.response?.data?.error
        showNotification({ type: 'error', message: backendMessage || 'Failed to add person' })
      })
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
            message: `Information of ${name} was already deleted from server`,
          })
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && notification.message && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <Filter
        filteredName={filteredName}
        handleFilteredName={e => setFiltered(e.target.value)}
      />
      <h3>add a new</h3>
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
