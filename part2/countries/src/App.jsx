import {useState, useEffect} from 'react'
import countriesService from './services/countries'

import Filter from './components/filter'
//import CountryForm from './components/CountryForm'
import Countries from './components/countries'

const App = () => {
  const [countries, setCountries] = useState([]) 
  //const [newName, setNewName] = useState('')
  const [filteredName, setFiltered] = useState('')
 
 
  useEffect(() => {
  countriesServices
    .getAll()
    .then(allCountries => {
      setCountries(allCountries)
    })
  }, [])

  const countriesToShow = countries.filter(country => country.name.common.trim().toLowerCase().includes(filteredName.toLowerCase()))
  

  //const addName = (event) => {
   // event.preventDefault()
    //const newCountry = {name: newName}
    //countriesServices
   // .create(newCountry)
   // .then(addedCountries => {
     // setCountries(newCountry.concat(addedCountries))
      //setNewName('')
    //})
  //}
  //const handleNewName = (e) => setNewName(e.target.value)
  const handleFilteredName = (e) => setFiltered(e.target.value)
 
  return (
    <div>
      <Filter filteredName={filteredName} handleFilteredName={handleFilteredName} />
      <Countries countriesToShow={countriesToShow}/>
    </div>
  )
}

export default App