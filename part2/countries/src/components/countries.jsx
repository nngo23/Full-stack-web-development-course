import {useState, useEffect} from "react"
import axios from "axios"

const Countries = ({countriesToShow}) => {
    const [showCountry, setShowCountry] = useState('')
    const [weather, setWeather] = useState('')
    const api_key = import.meta.env.VITE_SOME_KEY
    const country = (countriesToShow.length === 1) ? countriesToShow[0] : showCountry
    useEffect(() => {
        if (!country) return
        const capital = country.capital?.[0] || ""
        if (!capital || !api_key) return
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                    capital)}&units=metric&appid=${api_key}`)
            .then((response) => {
            setWeather(response.data)
            })
    }, [country,api_key]);

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
           
            {country && weather && weather.main && (  
                <div>
                <h3>Weather in {country.capital}</h3>
                <p>Temperature: {weather.main.temp} Celsius</p>
                <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
                <p>Wind: {weather.wind.speed} m/s</p>
                </div>
            )}
            {showCountry && (
                <button onClick={() => setShowCountry(null)}>Back to list</button>
            )}
            </div>
            )
    }
    return null

}
export default Countries