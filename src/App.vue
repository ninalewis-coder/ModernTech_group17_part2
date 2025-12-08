<script setup>
import { ref } from "vue"
import Navbar from "./components/Navbar.vue"
</script>

<template>
   <Navbar />
   <router-view />
</template>

<style scoped>
body {
   padding-top: 80px;
}
</style>
