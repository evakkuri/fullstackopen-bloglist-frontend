import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newBlog) => {
  console.log(`Sending request to add like to blog ${id}`)
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  console.log(response.data)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  console.log(`Deleting blog ${id}...`)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response.status)
  return response.data
}

const exports = { getAll, create, update, remove, setToken }
export default exports