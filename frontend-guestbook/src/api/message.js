
import api from './api'
export function getMessages () {
  return api.get(`/messages`).then(res => res.data);
  
}



export function addMessage(name, message) {
  console.log(name)
  console.log(message)
  return api.post(`/messages`, { name, message })
}