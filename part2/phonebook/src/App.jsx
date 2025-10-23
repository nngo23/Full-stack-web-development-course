const handleBackendError = (error, fallbackMessage) => {
  console.log('🔥 handleBackendError called!')
  console.log('🔥 Full error object:', error)

  if (!error.response) {
    console.log('⚠️ No error.response, Axios might be failing before response.')
    showNotification({ type: 'error', message: fallbackMessage })
    return
  }

  const data = error.response.data
  let backendMessage = fallbackMessage

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
Then in addName:

js
Copy code
personsServices
  .create(newPerson)
  .then(res => {
    setPersons(persons.concat(res))
    setNewName('')
    setNewNumber('')
    showNotification({ type: 'success', message: `Added ${res.name}` })
  })
  .catch(err => handleBackendError(err, `Failed to add ${newPerson.name}`))
✅ Now your notification will display the actual Mongoose validation error, instead of “failed to add.”

The key problem before was that handleBackendError was not defined as a callable function in scope, so the catch block wasn’t doing anything meaningful.

If you want, I can rewrite your entire App component with the fixed addName and backend error handling so you can just paste it and it works.







You said:
yes, with my code terms


ChatGPT said:
Perfect! I’ve rewritten your App component using your existing variable names and structure, but with a proper handleBackendError function and a fully fixed addName function so that Mongoose validation errors are displayed correctly.

javascript
Copy code
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
  const handleBackendError = (error, fallbackMessage) => {
    console.log('🔥 handleBackendError called!')
    console.log('🔥 Full error object:', error)

    if (!error.response) {
      console.log('⚠️ No error.response, Axios might be failing before response.')
      showNotification({ type: 'error', message: fallbackMessage })
      return
    }

    const data = error.response.data
    let backendMessage = fallbackMessage

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
      .then(res => {
        setPersons(persons.concat(res))
        setNewName('')
        setNewNumber('')
        showNotification({ type: 'success', message: `Added ${res.name}` })
      })
      .catch(err =>
        handleBackendError(err, `Failed to add ${newPerson.name}`)
      )
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
}

export default App