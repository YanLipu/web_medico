import axios from 'axios'
import { useToast } from '~/composables/useToast'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()

const api = axios.create({
  baseURL: config.public.apiBase as string,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { showToast } = useToast()

    if (error.response) {
      showToast(error.response.data.message || 'An error occurred', 'error')
    } else if (error.request) {
      showToast('No response from server', 'error')
    } else {
      showToast('Error setting up the request', 'error')
    }

    return Promise.reject(error)
  }
)

export default api