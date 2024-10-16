import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated && to.path !== '/login') {
    if (from.path !== '/login') {
      return navigateTo('/login')
    }
  }

  if (authStore.isAuthenticated && to.path === '/login') {
    if (from.path !== '/') {
      return navigateTo('/')
    }
  }

  if (authStore.isAuthenticated) {
    const userRole = authStore.userRole

    if (to.path === '/') {
      return navigateTo('/dashboard')
    }

    if (to.path.startsWith('/nurse') && userRole !== 'nurse') {
      if (from.path !== '/') {
        return navigateTo('/')
      }
    }
    if (to.path.startsWith('/doctor') && userRole !== 'doctor') {
      if (from.path !== '/') {
        return navigateTo('/')
      }
    }
  }

  console.log('Navigation allowed to:', to.fullPath)
})