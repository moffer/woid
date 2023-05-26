<template>
    <div id="app">
        <h1>Own bikes</h1>
        <Bike v-for="bike in bikes" :bike="bike"></Bike>
    </div>
</template>
  
<script setup lang="ts">
import Bike from '../components/Bike.vue';
</script>
  
<script lang="ts">

const bike: { bikeName: string, id: string } = { bikeName: 'Tobis Bike', id: '123' };
const bike2: { bikeName: string, id: string } = { bikeName: 'Tobis Rennradler', id: '1234' };

const bikes = [bike, bike2];

</script>
  
<style>
#app {
    width: 100%;
}

.width-100 {
    width: 100%;
}
</style>
  