<!-- pages/dashboard/consultas-pendentes.vue -->
<template>
  <v-container>
    <h2>Consultas Pendentes</h2>
    <v-data-table :headers="headers" :items="consultations" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn small color="success" @click="approveConsultation(item.id)">Aprovar</v-btn>
        <v-btn small color="error" @click="rejectConsultation(item.id)">Rejeitar</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: 'authenticated'
})

import { ref, onMounted } from 'vue'
import { createApi } from '~/plugins/api'


const config = useRuntimeConfig()
const api = createApi(config.public.apiBase)

const consultations = ref([])
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Paciente', key: 'patient.name' },
  { title: 'Médico', key: 'doctor.name' },
  { title: 'Data', key: 'date_consultation' },
  { title: 'Status', key: 'status' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const itemsPerPage = ref(10)
const page = ref(1)
const totalItems = ref(0)

onMounted(async () => {
  const newPage = 1 // Set the desired page or receive it from somewhere
  await fetchPendingConsultations(newPage)
})

const fetchPendingConsultations = async (newPage) => {
  try {
    const response = await api.get('consultation/schedule/pending')
    const data = response.data
    consultations.value = data.content
    totalItems.value = data.totalElements
    page.value = newPage
  } catch (error) {
    console.error('Error fetching consultations:', error)
  }
}

const approveConsultation = async (id) => {
  try {
    const response = await api.put(`consultation/approve`, {
      consultation_id: id
    })
    await fetchPendingConsultations(1)
  } catch (error) {
    console.error('Error approving consultation:', error)
  }
}

const rejectConsultation = async (id) => {
  try {
    const response = await api.put(`consultation/${id}/reject`)
    if (response.ok) {
      // Update the list or show success message
    }
  } catch (error) {
    console.error('Error rejecting consultation:', error)
  }
}
</script>