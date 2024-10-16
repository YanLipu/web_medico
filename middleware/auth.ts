import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (authStore.isAuthenticated && to.path === '/login') {
    return navigateTo('/')
  }

  console.log('User is authenticated:', authStore.isAuthenticated)

  if (authStore.isAuthenticated) {
    const userRole = authStore.userRole
    if (to.path.startsWith('/patient') && userRole !== 'patient') {
      return navigateTo('/')
    }
    if (to.path.startsWith('/nurse') && userRole !== 'nurse') {
      return navigateTo('/')
    }
    if (to.path.startsWith('/doctor') && userRole !== 'doctor') {
      return navigateTo('/')
    }
  }
})