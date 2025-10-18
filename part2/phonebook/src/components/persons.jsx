const Persons = ({personToShow, deleteName}) => {
    return (
        <div>
        {personToShow.map(person => (
          <p key={person.id}> {person.name} {person.number} 
          <button onClick={() => deleteName(person.id, person.name)}>delete</button>
          </p>
        ))}
        </div>
    )
}
export default Persons