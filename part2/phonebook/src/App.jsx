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
    personsServices
      .getAll()
      .then(firstPersons => setPersons(firstPersons))
      .catch(error => console.error('❌ Fetch failed:', error))
  }, [])

  const showNotification = ({ type, message }) => {
    setNotification({ type, message })
    setTimeout(() => setNotification({ type: '', message: null }), 6000)
  }

    console.log('🔥 handleBackendError called!')
  console.log('🔥 Full error object:', error)

  // Defensive checks so it never crashes even if response missing
  if (!error.response) {
    console.log('⚠️ No error.response, Axios might be failing before response.')
    showNotification({ type: 'error', message: fallbackMessage })
    return
  }

  console.log('🔥 error.response:', error.response)
  console.log('🔥 error.response.data:', error.response.data)

  let backendMessage = fallbackMessage
  const data = error.response.data

  if (data) {
    if (typeof data.error === 'string') {
      backendMessage = data.error
    } else if (Array.isArray(data.error)) {
      backendMessage = data.error.join(', ')
    } else if (data.message) {
      backendMessage = data.message
    }
  }

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
          .catch(error =>
            handleBackendError(error, `Failed to update ${presentPerson.name}`)
          )
      }
      return
    }

    const newPerson = { name: newName, number: newNumber }
    personsServices
      .create(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')
        showNotification({
          type: 'success',
          message: `Added ${newPerson.name}`,
        })
      })
      .catch(error => handleBackendError(error, `Failed to add ${newPerson.name}`))
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
      <Filter filteredName={filteredName} handleFilteredName={e => setFiltered(e.target.value)} />
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