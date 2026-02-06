<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import Navbar from "./components/Navbar.vue"

const route = useRoute()
const showNavbar = ref(true)

// Hide navbar on login page
watch(
  () => route.path,
  (newPath) => {
    showNavbar.value = newPath !== '/login'
  },
  { immediate: true }
)
</script>

<template>
   <Navbar v-if="showNavbar" />
   <router-view />
</template>

<style scoped>
body {
   padding-top: 80px;
}
</style>
