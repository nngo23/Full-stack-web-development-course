const PersonForm = ({ addName, newName, handleNewName, newNumber, handleNewNumber }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        console.log('🚀 FORM SUBMITTED') // add this
        addName(e)
      }}
    >
      <div>
        name:{' '}
        <input
          value={newName}
          onChange={handleNewName}
        />
      </div>
      <div>
        number:{' '}
        <input
          value={newNumber}
          onChange={handleNewNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
