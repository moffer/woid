<template>
    <div id="app">
        <h1>Login</h1>
        <v-text-field class="width-100" label="E-Mail" v-model="email"></v-text-field>
        <v-text-field class="width-100" label="Passwort"></v-text-field>
        <v-btn class="rent-btn" color="primary" @click="submit()">Login</v-btn>
    </div>
</template>
  
<script setup lang="ts">

import { useUserStore } from '@/stores/counter'
import { toRefs, ref } from 'vue'
import router from '../router';

const store = useUserStore()
const email = ref();

function submit() {
    console.log(email)
    store.updateUser(email.value);
    router.push({ name: 'about' })
}
</script>
  
<script lang="ts">


</script>
  
<style>
#app {
    width: 100%;
}

.width-100 {
    width: 100%;
}
</style>
  