import { ref } from 'vue'

interface ToastState {
  show: boolean
  message: string
  color: string
  timeout: number
}

const toast = ref<ToastState>({
  show: false,
  message: '',
  color: 'error',
  timeout: 3000,
})

export function useToast() {
  const showToast = (message: string, color: string = 'error', timeout: number = 3000) => {
    toast.value = {
      show: true,
      message,
      color,
      timeout,
    }
  }

  const hideToast = () => {
    toast.value.show = false
  }

  return {
    toast,
    showToast,
    hideToast,
  }
}