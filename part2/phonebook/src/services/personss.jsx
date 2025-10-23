import axios from 'axios'

// Keep same port, relative path works with frontend + backend on 3001
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const create = newPerson =>
  axios.post(baseUrl, newPerson)
       .then(res => res.data)

const update = (id, updatedPerson) =>
  axios.put(`${baseUrl}/${id}`, updatedPerson, { 
        runValidators: true, 
        context: 'query', 
        headers: { 'Content-Type': 'application/json' } 
  }).then(res => res.data)

const remove = id => axios.delete(`${baseUrl}/${id}`).then(res => res.data)

export default { getAll, create, update, remove }