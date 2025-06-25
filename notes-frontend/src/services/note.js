import axios from "axios"

const basedUrl = '/api/notes'

const getAll = () => {
  const req = axios.get(basedUrl)
  return req.then(res => res.data)
}

// const getAll = () => {
//   const req = axios.get(basedUrl)
//   const nonExistingNote = {
//     id: '1000000',
//     content: 'This note is not saved in the server.',
//     important: false
//   }
//   return req.then(res => res.data.concat(nonExistingNote))
// }

const create = (newObject) => {
  const req = axios.post(basedUrl, newObject)
  return req.then(res => res.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${basedUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const req = axios.delete(`${basedUrl}/${id}`)
  return req.then(res => res.data)
}

export default {
  getAll,
  create,
  update,
  delete: remove
}