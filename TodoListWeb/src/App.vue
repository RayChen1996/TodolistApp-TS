<script setup lang="ts">
import NavBar from './components/Layout/TopNav.vue'
import BeeadCrumb from './components/Layout/BreadCrumb.vue'
</script>

<template>
  <div>
    <NavBar />
    <BeeadCrumb />

    <router-view> </router-view>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('app.vue')
console.log(route)
</script>
