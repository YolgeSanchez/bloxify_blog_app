import axios from 'axios'
const API = 'http://localhost:3000/api'

export const registerCall = async (user) => {
  const { username, password, email } = user
  const request = `${API}/register`
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  }

  const response = await fetch(request, requestOptions)
  const data = await response.json()

  return data
}

export const axiosRegister = (user) => axios.post(`${API}/register`, user)
