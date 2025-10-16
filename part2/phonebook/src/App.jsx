import { useState } from 'react'
const Person = ({person}) => {
  return (<p>{person.name}</p>)
}

const App = () => {
  const [persons, setPersons] = useState([
    {id: 1, name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const overlappedName = persons.some((p) => newName.trim().toLowerCase() === p.name.trim().toLowerCase())
    if (overlappedName) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {id: String(persons.length + 1), name: newName}
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
        name: <input 
                value={newName} 
                onChange={(event) => setNewName(event.target.value)}
              />
        </div>
        <div>
        <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Person key={person.id} person={person} />
        )}
    </div>
  )
}

export default App