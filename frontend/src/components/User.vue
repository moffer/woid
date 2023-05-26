
<template>
    <div class="greetings" v-if="user.email">
        <h1 class="green">Hello, {{ user.email }}</h1>
    </div>
</template>
<script setup lang="ts">

import { useUserStore } from '@/stores/counter'
import { toRefs } from 'vue'

const store = useUserStore()

const { user } = toRefs(store);
</script>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
}

h3 {
    font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}

@media (min-width: 1024px) {

    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
