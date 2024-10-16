// import axios from 'axios'
// import { useToast } from '~/composables/useToast'

// export default defineNuxtPlugin((nuxtApp) => {
//   const config = useRuntimeConfig()

//   const api = axios.create({
//     baseURL: config.public.apiBase as string,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })

//   api.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token')
//       if (token && token !== 'undefined' && token !== 'null') {
//         config.headers['Authorization'] = `Bearer ${token}`
//       }
//       return config
//     },
//     (error) => {
//       return Promise.reject(error)
//     }
//   )

//   api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       const { showToast } = useToast()

//       if (error.response) {
//         showToast(error.response.data.message || 'An error occurred', 'error')
//       } else if (error.request) {
//         showToast('No response from server', 'error')
//       } else {
//         showToast('Error setting up the request', 'error')
//       }

//       return Promise.reject(error)
//     }
//   )

//   return {
//     provide: {
//       api
//     }
//   }
// })

// plugins/api.ts~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import axios from 'axios'
import { useToast } from '~/composables/useToast'

export const createApi = (baseURL: string) => {
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token && token !== 'undefined' && token !== 'null') {
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

  return api
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const api = createApi(config.public.apiBase as string)

  return {
    provide: {
      api
    }
  }
})