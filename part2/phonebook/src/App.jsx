import {useState, useEffect} from 'react'
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
  const [notification, setNotification] = useState({type:'', message: null})
 
  useEffect(() => {
    personsServices
    .getAll()
    .then(firstPersons => {
      setPersons(firstPersons)
    })
  }, [])
  
  const showNotification = ({type,message}) => {
    setNotification({type,message})
    setTimeout (() => {setNotification({type:'',message:null})}, 6000)
  }
  const personToShow = persons.filter(person => person.name.trim().toLowerCase().includes(filteredName.toLowerCase()))
  
  const handleBackendError = (error, fallbackMessage) => {
  console.log('Axios full error object:', error)

  let backendMessage = fallbackMessage

  // First try normal response data
  let data = error.response?.data

  // Fallback: sometimes Axios can't parse JSON when frontend/backend share the same port
  if (!data && error.response?.request?.responseText) {
    try {
      data = JSON.parse(error.response.request.responseText)
    } catch {
      data = error.response.request.responseText
    }
  }

  if (data) {
    if (typeof data === 'string') backendMessage = data
    else if (data.error) backendMessage = data.error
    else if (Array.isArray(data.error)) backendMessage = data.error.join(', ')
    else if (data.message) backendMessage = data.message
  }

  showNotification({ type: 'error', message: backendMessage })
}
  const addName = (event) => {
    event.preventDefault()
    const presentPerson = persons.find(p => newName.trim().toLowerCase() === p.name.trim().toLowerCase())
    if (presentPerson) {
      const confirmUpdate = window.confirm(`${presentPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (confirmUpdate) {
        const updatedPerson =  {... presentPerson, number: newNumber}
        personsServices.update(presentPerson.id, updatedPerson)
  .then(returnedPerson => {
    setPersons(persons.map(p => p.id === presentPerson.id ? returnedPerson : p))
    setNewName('')
    setNewNumber('')
    showNotification({ type: 'success', message: `Number of ${presentPerson.name} is changed` })
  })
  .catch(error => handleBackendError(error, `Failed to update ${presentPerson.name}`))
}
        return
      }
    return
    }
    
    const newPerson = {name: newName, number: newNumber}
    personsServices.create(newPerson)
  .then(addedPerson => {
    setPersons(persons.concat(addedPerson))
    setNewName('')
    setNewNumber('')
    showNotification({ type:'success', message: `Added ${newPerson.name}` })
  })
  .catch(error => handleBackendError(error, `Failed to add ${newPerson.name}`))
  }

  

  const deleteName = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsServices
      .remove(id)
      .then(() => {setPersons(persons.filter(p => p.id !== id))
      showNotification({type:'success',message:`Deleted ${name}`})
      })
      .catch(error => {
        showNotification({type:'error',message:`Information of ${name} was already deleted from server`})
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
      {notification && <Notification type={notification.type} message={notification.message}/>}
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


export default App