const Countries = ({countriesToShow}) => {
    if (!countriesToShow || countriesToShow.length === 0) {
        return <p>No countries found</p>
    }
    if (countriesToShow.length >9) {
        return <p>Too many matches, specify another filter</p>
    } 
    if (countriesToShow.length >1) {
        return (
            <div>
            {countriesToShow.map((country) => ( 
                <p key={country.cca3}> {country.name.common}</p>  
            ))}
            </div>
        )
    }
    if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        return (
            <div>
            <h2>{country.name.common}</h2>
                <p>Capital {country.capital}</p> 
                <p>Area {country.area}</p> 
            <h3>Languages</h3>
                <div>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
                </div>
            <img src={country.flags.png} width="200"/>
            </div>
            )
    }
    return null

}
export default Countries