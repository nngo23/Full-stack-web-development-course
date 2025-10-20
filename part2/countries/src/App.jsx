import {useState, useEffect} from 'react'

import Filter from './components/filter'
import Countries from './components/countries'
import CountriesServices from './services/countriess'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filteredName, setFiltered] = useState('')
   
  useEffect(() => {
  CountriesServices
    .getAll()
    .then((allCountries) => {
      setCountries(allCountries)
    })
  }, [])

  const countriesToShow = countries.filter(country => country.name.common.trim().toLowerCase().includes(filteredName.toLowerCase()))
  const handleFilteredName = (e) => setFiltered(e.target.value)
  
  return (
    <div>
      <Filter filteredName={filteredName} handleFilteredName={handleFilteredName} />
      <Countries countriesToShow={countriesToShow}/>
    </div>
  )
}

export default App