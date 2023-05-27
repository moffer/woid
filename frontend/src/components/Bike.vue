<template>
    <v-card class="mx-auto bike-card" variant="outlined">
        <v-img
          height="100"
          src="/bicycle-788733_960_720.jpg"
          cover
          class="text-white"
        >
        </v-img>

        <v-card-item>
            <div>
                <div class="text-overline mb-1">
                    BIKE
                </div>
                <div class="text-h6 mb-1">
                    {{ bike.bikeName }}
                </div>
            </div>
        </v-card-item>

        <v-card-actions>
            <slot></slot>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">

export default {
    props: ['bike'],
    created() {
        // props are exposed on `this`
        console.log(this.bike)
    }
}
</script>

<style>
.bike-card {
    margin: 10px;
    width: 200px;
}
</style>
