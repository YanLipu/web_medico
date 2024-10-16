// import axios from 'axios'
// import { useToast } from '~/composables/useToast'
// import { useRuntimeConfig } from '#app'

// const config = useRuntimeConfig()

// const api = axios.create({
//   baseURL: config.public.apiBase as string,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')
//     console.log('token', typeof token)
//     if (token && token !== undefined && token !== null) {
//       console.log('entrou no if do token')
//       config.headers['Authorization'] = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { showToast } = useToast()

//     if (error.response) {
//       showToast(error.response.data.message || 'An error occurred', 'error')
//     } else if (error.request) {
//       showToast('No response from server', 'error')
//     } else {
//       showToast('Error setting up the request', 'error')
//     }

//     return Promise.reject(error)
//   }
// )

// export default api