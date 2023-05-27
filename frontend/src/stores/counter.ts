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
    },
    updateBikeStatus(message: string) {
      const data: { gps: { synced: boolean, longitude: string, latitude: string }, gsm: { longitude: string, latitude: string } } = JSON.parse(message);
      console.log(data);
      const x = data.gps.synced ? parseFloat(data.gps.longitude) : parseFloat(data.gsm.longitude);
      const y = data.gps.synced ? parseFloat(data.gps.latitude) : parseFloat(data.gsm.latitude);
      this.bicycle = [x, y];
    },
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
import mqttClient from '../services/mqtt-client';


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
      console.log('rent')
      mqttClient.publish('update/bike1', `{
        "lock": true
      }`);


      this.rent = { isRented: true };
    },
    giveBackBike() {
      console.log('give back')
      mqttClient.publish('update/bike1', `{
        "lock": false
      }`);
      this.rent = { isRented: false };
    }
  }
})




export const useBikeStatusStore = defineStore('bikeStatus', {
  state: () => {
    const coordinate: { x?: number, y?: number } = {};

    return { coordinate }
  },
  actions: {
    updateBikeStatus(x: number, y: number) {
      this.coordinate = { x: x, y: y };
    },
  }
})
