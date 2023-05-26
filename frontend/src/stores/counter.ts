import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useCoordinateStore = defineStore('coordinate', () => {
  const mapCenter = ref([12.100659880924553, 48.995426481656104]);
  const zoom = ref(13);

  const bicycle = ref([12.12, 49.00999]);


  return { mapCenter, zoom, bicycle }
})