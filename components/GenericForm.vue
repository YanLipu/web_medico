<template>
  <v-form @submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col
          v-for="field in fields"
          :key="field.name"
          cols="12"
        >
          <v-text-field
            v-if="field.type === 'text' || field.type === 'password' || field.type === 'email'"
            variant="outlined"
            v-model="formData[field.name]"
            :label="field.label"
            :type="field.type"
            :rules="field.rules"
            :required="field.required"
          ></v-text-field>
          
          <v-select
            v-else-if="field.type === 'select'"
            v-model="formData[field.name]"
            :label="field.label"
            :items="field.options"
            :rules="field.rules"
            :required="field.required"
          ></v-select>
          
          <v-checkbox
            v-else-if="field.type === 'checkbox'"
            v-model="formData[field.name]"
            :label="field.label"
            :required="field.required"
          ></v-checkbox>
          
          <!-- Add more input types as needed -->
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12">
          <v-alert
            v-if="error"
            type="error"
            class="mb-4"
          >
            {{ error }}
          </v-alert>
          <v-btn
            type="submit"
            color="primary"
            block
            :loading="loading"
          >
            {{ submitButtonText }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { ref, reactive, PropType } from 'vue'

interface FormField {
  name: string
  label: string
  type: 'text' | 'password' | 'email' | 'select' | 'checkbox'
  required?: boolean
  rules?: ((v: any) => boolean | string)[]
  options?: { text: string; value: any }[]
}

const props = defineProps({
  fields: {
    type: Array as PropType<FormField[]>,
    required: true
  },
  submitButtonText: {
    type: String,
    default: 'Submit'
  }
})

const emit = defineEmits(['submit'])

const formData = reactive<Record<string, any>>({})
const loading = ref(false)
const error = ref('')

props.fields.forEach(field => {
  formData[field.name] = ''
})

const submitForm = async () => {
  loading.value = true
  error.value = ''
  try {
    await emit('submit', formData)
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'An unexpected error occurred'
    }
  } finally {
    loading.value = false
  }
}
</script>