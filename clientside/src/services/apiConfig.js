import axios from 'axios'

console.log("jfsds", import.meta.env )
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, 
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials:true
})

export default api;