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
    personsServices
      .getAll()
      .then(firstPersons => setPersons(firstPersons))
      .catch(error => console.error('❌ Fetch failed:', error))
  }, [])

  // Notification helper
  const showNotification = ({ type, message }) => {
    setNotification({ type, message })
    setTimeout(() => setNotification({ type: '', message: null }), 6000)
  }

  // Proper backend error handler
    const handleBackendError = error => {
    console.log('🔥 handleBackendError called!')
    console.log('🔥 Full error object:', error)

    if (!error.response) {
      showNotification({ type: 'error', message: 'No response from server' })
      return
    }

    const data = error.response.data
    console.log('🔥 error.response.data:', data)

    // ✅ Always prefer backend error message directly
    if (data && typeof data.error === 'string') {
      showNotification({ type: 'error', message: data.error })
    } else if (data && data.message) {
      showNotification({ type: 'error', message: data.message })
    } else {
      showNotification({ type: 'error', message: 'Unknown backend error' })
    }
  }
      // If still empty, fallback to generic (rare)
      if (!backendMessage) backendMessage = fallbackMessage || 'Unknown backend error'

      showNotification({ type: 'error', message: backendMessage })
    }

  const personToShow = persons.filter(person =>
    person.name.trim().toLowerCase().includes(filteredName.toLowerCase())
  )

  const addName = event => {
  event.preventDefault()

  const presentPerson = persons.find(
    p => newName.trim().toLowerCase() === p.name.trim().toLowerCase()
  )

  if (presentPerson) {
    const confirmUpdate = window.confirm(
      `${presentPerson.name} is already added to phonebook, replace the old number with a new one?`
    )
    if (confirmUpdate) {
      const updatedPerson = { ...presentPerson, number: newNumber }
      personsServices
        .update(presentPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(
            persons.map(p => (p.id === presentPerson.id ? returnedPerson : p))
          )
          setNewName('')
          setNewNumber('')
          showNotification({
            type: 'success',
            message: `Number of ${presentPerson.name} is changed`,
          })
        })
        .catch(err => {
  console.log('❌ BACKEND ERROR RESPONSE:', err.response?.data)
  console.log('❌ BACKEND ERROR STATUS:', err.response?.status)
  console.log('❌ BACKEND ERROR FULL:', err)

  // show backend message directly if exists
  const backendMessage = err.response?.data?.error

  if (backendMessage) {
    showNotification({ type: 'error', message: backendMessage })
  } else {
    showNotification({ type: 'error', message: `Failed to add ${newPerson.name}` })
  }
})
    }
    return
  }

  const newPerson = { name: newName, number: newNumber }

  personsServices
    .create(newPerson)
    .then(res => {
      setPersons(persons.concat(res))
      setNewName('')
      setNewNumber('')
      showNotification({ type: 'success', message: `Added ${res.name}` })
    })
    .catch(err => {
  console.log('❌ BACKEND ERROR RESPONSE:', err.response?.data)
  console.log('❌ BACKEND ERROR STATUS:', err.response?.status)
  console.log('❌ BACKEND ERROR FULL:', err)

  // show backend message directly if exists
  const backendMessage = err.response?.data?.error

  if (backendMessage) {
    showNotification({ type: 'error', message: backendMessage })
  } else {
    showNotification({ type: 'error', message: `Failed to add ${newPerson.name}` })
  }
})
}

  const deleteName = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification({ type: 'success', message: `Deleted ${name}` })
        })
        .catch(error => {
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
      {notification && (
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


export default App