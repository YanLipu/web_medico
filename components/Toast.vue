<template>
  <v-snackbar
    v-model="toast.show"
    :color="toast.color"
    :timeout="toast.timeout"
  >
    {{ toast.message }}

    <template v-slot:actions>
      <v-btn
        variant="text"
        @click="hideToast"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toast, hideToast } = useToast()
</script>