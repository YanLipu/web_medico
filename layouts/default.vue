<template>
  <v-app>
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <Toast />
  </v-app>
</template>

<script setup lang="ts">
import Toast from '~/components/Toast.vue'
</script>