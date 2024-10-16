<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card title="Login">
          <v-card-text>
            <GenericForm
              :fields="loginFields"
              submit-button-text="Login"
              @submit="handleLogin"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
import { ref } from 'vue'
import { useAuthStore } from '~/store/auth'
import { useRouter } from 'vue-router'
import GenericForm from '~/components/GenericForm.vue'

const authStore = useAuthStore()
const router = useRouter()

const loginFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    rules: [
      (v: string) => !!v || 'Email is required',
      (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
    ]
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    rules: [
      (v: string) => !!v || 'Password is required',
      (v: string) => v.length >= 6 || 'Password must be at least 6 characters'
    ]
  }
]

const handleLogin = async (formData: { email: string; password: string }) => {
  try {
    await authStore.login(formData.email, formData.password)
    router.push('/')
  } catch (err) {
    if (err instanceof Error) {
      throw new Error('Login failed. Please check your credentials and try again.')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
</script>