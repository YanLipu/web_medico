<!-- pages/dashboard/novo-paciente.vue -->
<template>
  <v-container>
    <h2>Cadastrar Paciente</h2>
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="form.name" label="Nome" required></v-text-field>
      <v-text-field v-model="form.email" label="Email" type="email" required></v-text-field>
      <v-text-field v-model="form.password" label="Senha" type="password" required></v-text-field>
      <v-select
        v-model="form.role"
        :items="roles"
        label="Função"
        required
      ></v-select>
      <v-btn type="submit" color="primary">Cadastrar</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: 'authenticated'
})

import { ref } from 'vue'
import { useToast } from '~/composables/useToast'
import { createApi } from '~/plugins/api'

const config = useRuntimeConfig()
const api = createApi(config.public.apiBase)

const {showToast} = useToast()

const form = ref({
  name: '',
  email: '',
  password: '',
  role: ''
})

const roles = ['DOCTOR', 'PATIENT', 'NURSE']

const submitForm = async () => {
  try {
    const response = await api.post('user', form.value)
    showToast(`Paciente cadastrado com sucesso.`, 'success')
  } catch (error) {
    showToast('Erro ao cadastrar paciente.', 'error')
    console.error('Error submitting form:', error)
  }
}
</script>