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
  const [notification, setNotification] = useState({type: '', message: null})

  useEffect(() => {
  personsServices
    .getAll()
    .then(firstPersons => {
      if (Array.isArray(firstPersons)) {
        setPersons(firstPersons)
      } else {
        console.error('Expected an array but got:',firstPersons)
        setPersons([]) 
      }
    })
    .catch(err => {
      console.error('Fetch failed:', err)
      setPersons([]) 
    })
  }, [])

  const showNotification = ({type, message}) => {
    setNotification({type, message})
    setTimeout(() => setNotification({type: '', message: null}), 6000)
  }

  const handleBackendError = (error, fallbackMessage = 'Server error') => {
    console.log('Backend error:', error)

    if (!error.response) {
      showNotification({type: 'error', message: fallbackMessage})
      return
    }

    const {data} = error.response
    let message = fallbackMessage

    if (data?.error) {
      message = Array.isArray(data.error)
        ? data.error.join(', ')
        : data.error
    } else if (data?.message) {
      message = data.message
    }

    showNotification({type:'error', message})
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
      if (window.confirm(
        `${existingPerson.name} is already added, replace the old number?`
      )) {
        const updatedPerson = {...existingPerson, number: newNumber}
        personsServices
          .update(existingPerson.id, updatedPerson)
          .then(returned => {
            setPersons(persons.map(p => p.id === existingPerson.id ? returned : p))
            setNewName('')
            setNewNumber('')
            showNotification({type: 'success', message: `Updated ${returned.name}`})
          })
          .catch(handleBackendError)
      }
      return
    }

    const newPerson = {name: newName, number: newNumber}
    personsServices
      .create(newPerson)
      .then(created => {
        setPersons(persons.concat(created))
        setNewName('')
        setNewNumber('')
        showNotification({ type:'success', message: `Added ${created.name}`})
      })
      .catch(handleBackendError)
  }

  const deleteName = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification({type: 'success', message: `Deleted ${name}`})
        })
        .catch(() => {
          showNotification({
            type: 'error',
            message: `Information of ${name} was already deleted`
          })
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.message && (
        <Notification type={notification.type} message={notification.message}/>
      )}
      <Filter
        filteredName={filteredName}
        handleFilteredName={e => setFiltered(e.target.value)}
      />
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
