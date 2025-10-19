import {useState} from "react"
const Countries = ({countriesToShow}) => {
    const [showCountry, setShowCountry] = useState('')
    if (!countriesToShow || countriesToShow.length === 0) {
        return <p>No countries found</p>
    }
    if (countriesToShow.length >9) {
        return <p>Too many matches, specify another filter</p>
    } 
    if (countriesToShow.length >1 && !showCountry) {
        return (
            <div>
            {countriesToShow.map((country) => ( 
                <p key={country.cca3}> {country.name.common}
                <button onClick={() => setShowCountry(country)}>Show</button>
                </p>  
            ))}
            </div>
        )
    }
    if (countriesToShow.length === 1 || showCountry) {
        const country = (countriesToShow.length === 1) ? countriesToShow[0] : showCountry
        return (
            <div>
            <h2>{country.name.common}</h2>
                <p>Capital {country.capital}</p> 
                <p>Area {country.area}</p> 
            <h3>Languages</h3>
                <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
                </ul>
            <img src={country.flags.png} width="200"/>
            <p />  
            {showCountry && (
                <button onClick={() => setShowCountry(null)}>Back to list</button>
            )}
            </div>
            )
    }
    return null

}
export default Countries