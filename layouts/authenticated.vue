<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>Medical Clinic</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="authStore.isAuthenticated" @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <Toast />
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { useRouter } from 'vue-router'
import Toast from '~/components/Toast.vue'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>