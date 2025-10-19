import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newCountry => {
  const request = axios.post(baseUrl, newCountry)
  return request.then(response => response.data)
}

const update = (id, updatedCountry) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedCountry)
  return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)   
    return request.then(response => response.data) 
}


export default {getAll, create, update, remove}