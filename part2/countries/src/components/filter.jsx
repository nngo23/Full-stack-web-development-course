const Filter = ({filteredName,handleFilteredName}) => {
    return (
    <div>find countries
        <input 
          value={filteredName}
          onChange={handleFilteredName}
        />
      </div>
    )
}
export default Filter