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

export const useCoordinateStore = defineStore('coordinate', {
  state: () => {
    const mapCenter = ref([12.100659880924553, 48.995426481656104]);
    const zoom = ref(13);

    const bicycle = ref([12.12, 49.00999]);

    const selectedBike: { bikeName?: string, bikeId?: string } = {};

    return { mapCenter, zoom, bicycle, selectedBikeValue: selectedBike }
  },
  getters: {
    selectedBike: (state) => state.selectedBikeValue
  },
  actions: {
    updateSelectedBike(bikeName: string, bikeId: string) {
      this.selectedBikeValue = { bikeName, bikeId };
    }
  }
})

export const useUserStore = defineStore('user', {
  state: () => {
    const user: { email?: string } = {};

    return { user }
  },
  getters: {
    loggedInUser: (state) => state.user,
    isUserLoggedIn: (state) => state.user.email != null
  },
  actions: {
    updateUser(email: string) {
      this.user = { email };
    }
  }
})


export const useRentStore = defineStore('rent', {
  state: () => {
    const rent: { isRented?: boolean } = {};

    return { rent }
  },
  getters: {
    bikeRented: (state) => state.rent.isRented,
  },
  actions: {
    updateRent() {
      this.rent = { isRented: true };
    },
    giveBackBike() {
      this.rent = { isRented: false };
    }
  }
})
