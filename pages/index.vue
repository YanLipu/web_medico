<template>
  <div>
    <h1>Welcome to the Medical Clinic</h1>
    <v-btn v-if="authStore.userRole === 'patient'" to="/patient/dashboard">Patient Dashboard</v-btn>
    <v-btn v-if="authStore.userRole === 'nurse'" to="/nurse/dashboard">Nurse Dashboard</v-btn>
    <v-btn v-if="authStore.userRole === 'doctor'" to="/doctor/dashboard">Doctor Dashboard</v-btn>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()
definePageMeta({
  layout: 'authenticated'
})
</script>