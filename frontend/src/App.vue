<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import "vue3-openlayers/dist/vue3-openlayers.css";
import User from './components/User.vue';
import { useCoordinateStore, useUserStore, useRentStore } from '@/stores/counter'

const userStore = useUserStore();

import mqttClient from './services/mqtt-client';


</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="/woid-icon.png" width="125" height="125" />
    <User></User>

    <div class="wrapper">
      <HelloWorld msg="Welcome to Woid bike!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">Currently available bikes</RouterLink>
        <RouterLink v-if="userStore.isUserLoggedIn" to="/ownbike">Own bike</RouterLink>
      </nav>

    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
