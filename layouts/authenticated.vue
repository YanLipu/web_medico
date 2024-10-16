<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Clinica Lipu</v-app-bar-title>
      <v-btn v-if="authStore.isAuthenticated" @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue'

import { useAuthStore } from '~/store/auth'
import { useRouter } from 'vue-router'

const drawer = ref(false)
const authStore = useAuthStore()
const router = useRouter()

const menuItems = computed(() => {
  const items = [
    { title: 'Início', icon: 'mdi-home', to: '/dashboard', roles: ['patient', 'nurse', 'doctor'] },
    { title: 'Solicitar Consulta', icon: 'mdi-medical-bag', to: '/dashboard/nova-consulta', roles: ['patient', 'nurse', 'doctor'] },
    { title: 'Consultas Pendentes', icon: 'mdi-account-clock', to: '/dashboard/consultas-pendentes', roles: ['nurse', 'doctor'] },
    { title: 'Agenda de Consultas', icon: 'mdi-calendar-multiselect', to: '/dashboard/agenda', roles: ['doctor', 'nurse'] },
    {title: 'Consultas Finalizadas', icon: 'mdi-check-circle-outline', to: '/dashboard/consultas-finalizadas', roles: ['doctor']},
    {title: 'Cadastrar Paciente', icon: 'mdi-account-plus', to: '/dashboard/novo-paciente', roles: ['doctor']},
  ]

  return items.filter(item => item.roles.includes(authStore.role ?? ''))
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>