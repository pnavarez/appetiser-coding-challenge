<template>
    <div>
        <div class="container">
            <h1>Coding Challenge</h1>

            <p>
                <router-link :to="{ name: 'home' }">Home</router-link> |
                <router-link :to="{ name: 'calendar' }">Calendar</router-link>
            </p>

            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped>

</style>