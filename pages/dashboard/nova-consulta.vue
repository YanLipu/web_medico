<!-- pages/dashboard/nova-consulta.vue -->
<template>
  <v-container>
    <h2>Solicitar Consulta</h2>
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="form.patient_id" label="ID do Paciente" type="number" required></v-text-field>
      <v-text-field v-model="form.doctor_id" label="ID do Médico" type="number" required></v-text-field>
      <v-text-field v-model="form.date_consultation" label="Data da Consulta" type="datetime-local" required></v-text-field>
      <v-textarea v-model="form.reason_consultation" label="Motivo da Consulta" required></v-textarea>
      <v-text-field v-model="form.location_consultation" label="Localização" required></v-text-field>
      <v-btn type="submit" color="primary">Solicitar Consulta</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: 'authenticated'
})

import { ref } from 'vue'
import { useToast } from '~/composables/useToast'
// import api from '~/utils/api'
import { createApi } from '~/plugins/api'

const config = useRuntimeConfig()
const api = createApi(config.public.apiBase)

const {showToast} = useToast()

const form = ref({
  patient_id: null,
  doctor_id: null,
  date_consultation: '',
  reason_consultation: '',
  location_consultation: '-21.24539945841578, -45.00298726343433'
})

const submitForm = async () => {
  try {
    const response = await api.post('consultation', form.value)
    
    showToast(`Consulta de ${response.data.patient.name} com ${response.data.doctor.name} agendada com sucesso`, 'success')

    form.value = {
      patient_id: null,
      doctor_id: null,
      date_consultation: '',
      reason_consultation: '',
      location_consultation: ''
    }
  } catch (error) {
    showToast('Erro ao solicitar consulta', 'error')
    console.error('Error submitting form:', error)
  }
}
</script>

<!-- pages/dashboard/nova-consulta.vue -->
<!-- pages/dashboard/nova-consulta.vue -->
<!-- <template>
  <v-container>
    <h2>Solicitar Consulta</h2>
    <GenericForm
      :fields="formFields"
      submit-button-text="Solicitar Consulta"
      @submit="submitForm"
    />
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import debounce from 'lodash.debounce'
import { useToast } from '~/composables/useToast'
import { createApi } from '~/plugins/api'
import { useAuthStore } from '~/store/auth'

definePageMeta({
  layout: 'authenticated'
})

const api = createApi()
const { showToast } = useToast()
const authStore = useAuthStore()

const patientOptions = ref([])
const doctorOptions = ref([])
const patientLoading = ref(false)
const doctorLoading = ref(false)

const debouncedSearchPatients = debounce(async (query) => {
  if (!query) return
  patientLoading.value = true
  try {
    const response = await api.get(`/api/v1/user/search?name=${query}`)

    patientOptions.value = [
      { text: 'Ronal', value: 1 },
    ]
    // patientOptions.value = response.data.users.map(user => ({
    //   text: user.name,
    //   value: user.id
    // }))
  } catch (error) {
    console.error('Error searching patients:', error)
    showToast('Erro ao buscar pacientes', 'error')
  } finally {
    patientLoading.value = false
  }
}, 300)

const debouncedSearchDoctors = debounce(async (query) => {
  if (!query) return
  doctorLoading.value = true
  try {
    const response = await api.get(`/api/v1/user/doctors?name=${query}`)
    doctorOptions.value = response.data.map(doctor => ({
      text: doctor.name,
      value: doctor.id
    }))
  } catch (error) {
    console.error('Error searching doctors:', error)
    showToast('Erro ao buscar médicos', 'error')
  } finally {
    doctorLoading.value = false
  }
}, 300)

const formFields = computed(() => [
  {
    name: 'patient_id',
    label: 'Paciente',
    type: authStore.userRole === 'patient' ? 'text' : 'autocomplete',
    required: true,
    options: authStore.userRole === 'patient' 
      ? [{ text: authStore.userName, value: authStore.userId }]
      : patientOptions.value,
    rules: [v => !!v || 'Paciente é obrigatório'],
    loading: patientLoading.value,
    onSearch: authStore.userRole !== 'patient' ? debouncedSearchPatients : undefined,
    disabled: authStore.userRole === 'patient'
  },
  {
    name: 'doctor_id',
    label: 'Médico',
    type: 'autocomplete',
    required: true,
    options: doctorOptions.value,
    rules: [v => !!v || 'Médico é obrigatório'],
    loading: doctorLoading.value,
    onSearch: debouncedSearchDoctors
  },
  {
    name: 'date_consultation',
    label: 'Data da Consulta',
    type: 'text', // You might want to use a date picker component instead
    required: true,
    rules: [v => !!v || 'Data da consulta é obrigatória']
  },
  {
    name: 'reason_consultation',
    label: 'Motivo da Consulta',
    type: 'text',
    required: true,
    rules: [v => !!v || 'Motivo da consulta é obrigatório']
  },
  {
    name: 'location_consultation',
    label: 'Localização',
    type: 'text',
    required: true,
    rules: [v => !!v || 'Localização é obrigatória']
  }
])

onMounted(async () => {
  if (authStore.userRole !== 'patient') {
    await debouncedSearchPatients('')
  }
  await debouncedSearchDoctors('')
})

const submitForm = async (formData) => {
  try {
    const response = await api.post('consultation', formData)
    showToast(`Consulta de ${response.data.patient.name} com ${response.data.doctor.name} agendada com sucesso`, 'success')
  } catch (error) {
    showToast('Erro ao solicitar consulta', 'error')
    console.error('Error submitting form:', error)
    throw error
  }
}
</script> -->