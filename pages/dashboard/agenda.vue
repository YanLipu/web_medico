<!-- pages/dashboard/agenda.vue -->
<!-- <template>

  <v-container>
    <h2>Agenda de Consultas</h2>
    <v-data-table :headers="headers" :items="consultations" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn v-if="isDoctor" small color="primary" @click="openFinishModal(item.raw)">Finalizar</v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="finishModal" max-width="500px">
      <v-card>
        <v-card-title>Finalizar Consulta</v-card-title>
        <v-card-text>
          <v-textarea v-model="medicalObservation" label="Observação Médica"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="finishConsultation">Finalizar</v-btn>
          <v-btn color="error" @click="finishModal = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '~/store/auth'
import api from '~/utils/api'


definePageMeta({
  layout: 'authenticated'
})

const authStore = useAuthStore()
const isDoctor = computed(() => authStore.role === 'doctor')

const consultations = ref([])
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Paciente', key: 'patient' },
  { title: 'Médico', key: 'doctor_name' },
  { title: 'Data', key: 'date_consultation' },
  { title: 'Motivo', key: 'reason_consultation' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const finishModal = ref(false)
const medicalObservation = ref('')
const currentConsultation = ref(null)

onMounted(async () => {
  try {
    const response = await api.get('consultation/schedule')
    consultations.value = await response.json()
  } catch (error) {
    console.error('Error fetching consultations:', error)
  }
})

const openFinishModal = (consultation) => {
  currentConsultation.value = consultation
  finishModal.value = true
}

const finishConsultation = async () => {
  try {
    const response = await api.put(`consultation/${currentConsultation.value.id}/finish`, { 
      medical_observation: medicalObservation.value 
    })
    if (response.ok) {
      // Update the list or show success message
      finishModal.value = false
      medicalObservation.value = ''
    }
  } catch (error) {
    console.error('Error finishing consultation:', error)
  }
}
</script> -->

<!-- pages/dashboard/agenda.vue -->
<template>
  <v-container>
    <h2>Agenda de Consultas</h2>
    <v-data-table
      :headers="headers"
      :items="consultations"
      :items-per-page="itemsPerPage"
      :page="page"
      :server-items-length="totalItems"
      @update:page="fetchConsultations"
      class="elevation-1"
    >
      <template v-slot:item.date_consultation="{ item }">
        {{ formatDate(item.date_consultation) }}
      </template>
      <template v-slot:item.status="{ item }">
        {{ translateStatus(item.status) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn v-if="isDoctor && item.status === 'PENDING'" small color="primary" @click="openFinishModal(item)">
          Finalizar
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="finishModal" max-width="500px">
      <v-card>
        <v-card-title>Finalizar Consulta</v-card-title>
        <v-card-text>
          <v-textarea v-model="medicalObservation" label="Observação Médica"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="finishConsultation">Finalizar</v-btn>
          <v-btn color="error" @click="finishModal = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: 'authenticated'
})
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '~/store/auth'
import { createApi } from '~/plugins/api'

const config = useRuntimeConfig()
const api = createApi(config.public.apiBase)

const authStore = useAuthStore()
const isDoctor = computed(() => authStore.role === 'doctor')

const consultations = ref([])
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Paciente', key: 'patient.name' },
  { title: 'Médico', key: 'doctor.name' },
  { title: 'Data', key: 'date_consultation' },
  { title: 'Status', key: 'status' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const finishModal = ref(false)
const medicalObservation = ref('')
const currentConsultation = ref(null)

const itemsPerPage = ref(10)
const page = ref(1)
const totalItems = ref(0)

const fetchConsultations = async (newPage) => {
  try {
    const response = await api.get(`consultation/schedule`)
    console.log('response', response)
    const data = response.data
    consultations.value = data.content
    totalItems.value = data.totalElements
    page.value = newPage
  } catch (error) {
    console.error('Error fetching consultations:', error)
  }
}

onMounted(() => {
  fetchConsultations(1)
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}

const translateStatus = (status) => {
  const statusMap = {
    'PENDING': 'Pendente',
    'COMPLETED': 'Finalizada',
    'CANCELLED': 'Cancelada'
  }
  return statusMap[status] || status
}

const openFinishModal = (consultation) => {
  currentConsultation.value = consultation
  finishModal.value = true
}

const finishConsultation = async () => {
  try {
    const response = await fetch(`/api/consultation/${currentConsultation.value.id}/finish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ medical_observation: medicalObservation.value })
    })
    if (response.ok) {
      // Update the list
      await fetchConsultations(page.value)
      finishModal.value = false
      medicalObservation.value = ''
    }
  } catch (error) {
    console.error('Error finishing consultation:', error)
  }
}
</script>