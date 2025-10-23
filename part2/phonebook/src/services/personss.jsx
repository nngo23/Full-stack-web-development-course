import axios from 'axios'

// ✅ Use full backend URL
const baseUrl = 'https://phonebook-backend-7ar1.onrender.com/api/persons'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const create = newPerson => axios.post(baseUrl, newPerson).then(res => res.data)

const update = (id, updatedPerson) =>
  axios.put(`${baseUrl}/${id}`, updatedPerson).then(res => res.data)

const remove = id => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, remove }