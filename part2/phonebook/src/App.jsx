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
    personsServices.getAll().then(setPersons).catch(console.error)
  }, [])

  const showNotification = ({ type, message }) => {
    setNotification({ type, message })
    setTimeout(() => setNotification({ type: '', message: null }), 6000)
  }

  const handleBackendError = (error) => {
    const msg = error.response?.data?.error || 'Server error'
    showNotification({ type: 'error', message: msg })
  }

  const addName = (event) => {
    event.preventDefault()
    const presentPerson = persons.find(p => p.name.toLowerCase() === newName.trim().toLowerCase())

    if (presentPerson) {
      if (window.confirm(`${presentPerson.name} already exists. Replace number?`)) {
        personsServices.update(presentPerson.id, { ...presentPerson, number: newNumber })
          .then(updated => {
            setPersons(persons.map(p => (p.id === presentPerson.id ? updated : p)))
            setNewName('')
            setNewNumber('')
            showNotification({ type: 'success', message: `Updated ${updated.name}` })
          })
          .catch(handleBackendError)
      }
      return
    }

    personsServices.create({ name: newName, number: newNumber })
      .then(added => {
        setPersons(persons.concat(added))
        setNewName('')
        setNewNumber('')
        showNotification({ type: 'success', message: `Added ${added.name}` })
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
        .catch(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification({ type: 'error', message: `Information of ${name} already removed from server` })
        })
    }
  }

  const personToShow = persons.filter(p => p.name.toLowerCase().includes(filteredName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.message && <Notification type={notification.type} message={notification.message} />}
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
