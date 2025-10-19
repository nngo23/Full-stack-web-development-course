const Countries = ({countriesToShow}) => {
    if (countriesToShow.length >9) {
        return <p>Too many matches, specify another filter</p>
    } 
    if (countriesToShow.length >1) {
        return (
            <div>
            {countriesToShow.map(country => ( 
                <p key={country.id}> {country.name.common}</p>  
            ))}
            </div>
        )
    }
    if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        return (
            <div>
            <h2>{country.name.common}</h2>
                <br>Capital {country.capital}</br> 
                <br>Area {country.area}</br> 
            <h3>Languages</h3>
                <div>
                {Object.values(country.language).map((language) => (
                    <li key={language.id}>{language}</li>
                ))}
                </div>
            <img src={country.flag.png} width="200"/>
            </div>
            )
            }
}
export default Countries