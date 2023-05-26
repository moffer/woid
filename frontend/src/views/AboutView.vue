<template>
  <div id="app">
    <h1>Currently available bikes</h1>
    <Map2Component></Map2Component>
    <v-btn class="rent-btn" color="primary" v-if="selectedBike.bikeName">Ausleihen: {{ selectedBike.bikeName }}</v-btn>
  </div>
</template>

<script setup lang="ts">
import { useCoordinateStore } from '@/stores/counter'
import { toRefs } from 'vue'

const coordinateStore = useCoordinateStore()

const { selectedBike } = toRefs(coordinateStore);

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
