import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const create = newPerson => axios.post(baseUrl, newPerson, { headers: { 'Content-Type': 'application/json' } })
                                  .then(res => res.data)

const update = (id, updatedPerson) => 
  axios.put(`${baseUrl}/${id}`, updatedPerson, {runValidators: true, context: 'query'})
        .then(res => res.data)
const remove = id => axios.delete(`${baseUrl}/${id}`).then(res => res.data)

export default {getAll, create, update, remove}