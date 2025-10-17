import Person from "./person"
const Persons = ({personToShow}) => {
    return (
        <div>
        {personToShow.map(person =>
          <Person key={person.id} person={person} />
        )}
        </div>
    )
}
export default Persons