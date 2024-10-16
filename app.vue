<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()
authStore.initializeAuth()
</script>