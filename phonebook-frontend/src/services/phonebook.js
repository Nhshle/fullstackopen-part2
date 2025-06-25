import axios from "axios"

const basedUrl = '/api/persons'

const getAll = () => {
  const req = axios.get(basedUrl)
  return req.then(res => res.data)
}

// const getAll = () => {
//   const req = axios.get(basedUrl)
//   const nonExistingPerson = {
//     id: '100000',
//     name: 'Unknown Person',
//     number: '000-000-000'
//   }
//   return req.then(res => res.data.concat(nonExistingPerson))
// }

const create = (newObject) => {
  const req = axios.post(basedUrl, newObject)
  return req.then(res => res.data)
}

const remove = (id) => {
  return axios.delete(`${basedUrl}/${id}`)
}

const update = (id, newObject) => {
  const req = axios.put(`${basedUrl}/${id}`, newObject)
  return req.then(res => res.data)
}

export default {
  getAll,
  create,
  delete: remove,
  update
}