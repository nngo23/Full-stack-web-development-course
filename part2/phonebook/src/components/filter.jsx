const Filter = ({filteredName,handleFilteredName}) => {
    return (
    <div>filter shown with
        <input 
          value={filteredName}
          onChange={(handleFilteredName)}
        />
      </div>
    )
}
export default Filter