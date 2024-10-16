<!-- <template>
  <v-container>
    <h1>Bem-vindo ao Dashboard {{ authStore.name }}</h1>
    <div style="height:600px; width:800px">
      <l-map ref="map" v-model:zoom="zoom" :center="[-21.241289002256142, -44.98673832262368]" :use-global-leaflet="false">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
      </l-map>
    </div>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: 'authenticated'
})
import { useAuthStore } from '~/store/auth'
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { ref } from 'vue'

const authStore = useAuthStore()

const zoom = ref(13)
</script> -->

<template>
  <v-container>
    <h1>Bem-vindo ao Dashboard {{ authStore.name }}</h1>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>Próxima Consulta</v-card-title>
          <v-card-text v-if="nextConsultation">
            <p>Data: {{ formatDate(nextConsultation.date_consultation) }}</p>
            <p>Hora: {{ formatTime(nextConsultation.date_consultation) }}</p>
            <p>Paciente: {{ nextConsultation.patient.name }}</p>
            <p>Médico: {{ nextConsultation.doctor.name }}</p>
            <p>Status: {{ translateStatus(nextConsultation.status) }}</p>
          </v-card-text>
          <v-card-text v-else>
            Nenhuma consulta agendada.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Localização da Próxima Consulta</v-card-title>
          <v-card-text>
            <div style="height: 400px; width: 100%">
              <l-map
                v-if="mapCenter"
                ref="map"
                :zoom="13"
                :center="mapCenter"
                :use-global-leaflet="false"
              >
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
                ></l-tile-layer>
                <l-marker :lat-lng="mapCenter"></l-marker>
              </l-map>
              <p v-else>Localização não disponível</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '~/store/auth'
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet"
import { createApi } from '~/plugins/api';

definePageMeta({
  layout: 'authenticated'
})

const authStore = useAuthStore()
const { $api } = useNuxtApp()
const config = useRuntimeConfig()
const api = createApi(config.public.apiBase)

const consultations = ref([])
const nextConsultation = computed(() => consultations.value[0] || null)
const mapCenter = computed(() => {
  if (nextConsultation.value && nextConsultation.value.location_consultation) {
    const [lat, lng] = nextConsultation.value.location_consultation.split(',').map(Number)
    return [lat, lng]
  }
  return null
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

const formatTime = (dateString) => {
  const options = { hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleTimeString('pt-BR', options)
}

const translateStatus = (status) => {
  const statusMap = {
    'PENDING': 'Pendente',
    'CONFIRMED': 'Confirmada',
    'CANCELLED': 'Cancelada',
    'COMPLETED': 'Concluída'
  }
  return statusMap[status] || status
}

onMounted(async () => {
  try {
    const response = await api.get('consultation/schedule')
    consultations.value = response.data.content
  } catch (error) {
    console.error('Error fetching consultation schedule:', error)
  }
})
</script>