import { defineStore } from 'pinia'
import api from '~/utils/api'
import { useToast } from '~/composables/useToast'

interface User {
  email: string
  name: string
  role: 'patient' | 'nurse' | 'doctor'
}

interface LoginResponse {
  email: string
  name: string
  role: 'patient' | 'nurse' | 'doctor'
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    email: null as string | null,
    name: null as string | null,
    role: null as string | null,
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.role,
  },
  actions: {
    async login(email: string, password: string) {
      const { showToast } = useToast()
      try {
        const response = await api.post<LoginResponse>('auth/login', { email, password })
        this.setUser({ email: response.data.email, name: response.data.name, role: response.data.role }, response.data.token)
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        showToast('Login successful', 'success')
      } catch (error: any) {
        throw error
      }
    },
    logout() {
      this.email = null
      this.name = null
      this.role = null
      this.token = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']

      const { showToast } = useToast()
      showToast('Logged out successfully', 'info')
    },
    setUser(user: User, token: string) {
      this.email = user.email
      this.name = user.name
      this.role = user.role
      this.token = token
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    initializeAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        this.token = null
        delete api.defaults.headers.common['Authorization']
      }
    },
  },
})