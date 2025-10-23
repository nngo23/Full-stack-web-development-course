import axios from 'axios'
const baseUrl = 'https://phonebook-backend-7ar1.onrender.com/api/persons'

const getAll = () => axios.get(baseUrl)

const create = newPerson => axios.post(baseUrl, newPerson)

const update = (id, updatedPerson) => 
  axios.put(`${baseUrl}/${id}`, updatedPerson, {runValidators: true, context: 'query'})

const remove = id => axios.delete(`${baseUrl}/${id}`)

export default {getAll, create, update, remove}