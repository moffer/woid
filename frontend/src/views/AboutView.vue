<template>
  <div id="app">
    <h1>Currently available bikes</h1>
    <Map2Component></Map2Component>
    <Bike v-if="selectedBike.bikeName && !rent.isRented" :bike="selectedBike">
      <v-btn variant="flat" color="primary" @click="rentBike()">
        Rent
      </v-btn>
    </Bike>

    <div v-if="rent.isRented">
      <v-btn class="rent-btn" color="primary" @click="giveBackBike()">
        Return: {{ selectedBike.bikeName }}
      </v-btn>
      <div style="margin:5px;"></div>
      <v-alert text="Return the bike in the yellow marked circle!"></v-alert>
    </div>
  </div>

  <v-snackbar v-model="snackbar">
    {{ text }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useCoordinateStore, useUserStore, useRentStore } from '@/stores/counter'
import { toRefs, ref } from 'vue'
import router from '../router';
import Bike from '../components/Bike.vue';

const coordinateStore = useCoordinateStore();
const rentStore = useRentStore();
const userStore = useUserStore();
const snackbar = ref();
const text = ref();

const { selectedBike } = toRefs(coordinateStore);
const { rent } = toRefs(rentStore);

function rentBike() {
  if (userStore.isUserLoggedIn) {
    rentStore.updateRent();
    text.value = "You have rented the bike"
    snackbar.value = true
  } else {
    router.push({ name: 'login' })
  }
}

function giveBackBike() {
  rentStore.giveBackBike();
}

</script>

<script lang="ts">
import Map2Component from '../components/Map2Component.vue';


export default {
  name: "App",
  components: { Map2Component },
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.grid-cell {
  height: 100%;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
  /* grid-auto-rows: 1fr; */
  grid-gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
}

.cell {
  border-radius: 4px;
  background-color: lightgrey;
}

.cell-map {
  grid-column: 1;
  grid-row-start: 1;
  grid-row-end: 3;
}

.cell-edit {
  grid-column: 2;
  grid-row: 1;
}

.cell-inspect {
  grid-column: 2;
  grid-row: 2;
}

.rent-btn {
  margin-top: 10px;
}
</style>
