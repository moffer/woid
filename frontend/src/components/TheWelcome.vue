<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <v-icon icon="fa-solid fa-share"></v-icon>
    </template>
    <template #heading>Bike sharing</template>

    Introducing BikeShare: Share your private bike effortlessly.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Wide range</template>

    Access a wide range of bikes for any occasion.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <v-icon icon="fa-solid fa-money-bill"></v-icon>
    </template>
    <template #heading>Save money</template>

    Save money by renting out your bike and find affordable rentals.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Enjoy easy booking process</template>

    Enjoy a seamless booking process with a user-friendly interface.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Trust</template>

    Trust and security ensured through our verification system.
  </WelcomeItem>
  <div style="margin-top: 20px;"></div>
  <RouterLink to="about">
  <v-btn variant="plain">Show available bikes now!</v-btn>
</RouterLink>
</template>
