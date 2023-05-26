<template>
    <v-card class="mx-auto bike-card" variant="outlined">
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
            <v-btn variant="outlined">
                Button
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

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
    width: 175px;
}
</style>
