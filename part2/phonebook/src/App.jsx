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
  

  const addName = (event) => {
    event.preventDefault()
    const presentPerson = persons.find(p => newName.trim().toLowerCase() === p.name.trim().toLowerCase())
    if (presentPerson) {
      const confirmUpdate = window.confirm(`${presentPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (confirmUpdate) {
        const updatedPerson =  {... presentPerson, number: newNumber}
        personsServices
        .update(presentPerson.id, updatedPerson).then(returnedPerson => {
        setPersons(persons.map(p => p.id === presentPerson.id ? returnedPerson : p))
        setNewName('')
        setNewNumber('')
        showNotification({type: 'success', message: `Number of ${presentPerson.name} is changed`})
        })
        .catch(error => {
          const backendError = error.response?.data?.error
          showNotification({ type: 'error', message: backendError ?? `Failed to update ${presentPerson.name}` })
          setPersons(persons.filter(p => p.id !== presentPerson.id))
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
      showNotification({type:'success', message: `Added ${newPerson.name}`})
    })
    .catch(error => {
    console.log('Axios error:', error)                 // Debug full error
    console.log('Axios error.response:', error.response) // Debug response

    const backendError = error.response?.data?.error     // Read Mongoose message
    if (backendError) {
      showNotification({ type: 'error', message: backendError })
    } else {
      showNotification({ type: 'error', message: `Failed to add ${newPerson.name}` })
    }
    })    
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
}

export default App