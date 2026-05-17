<template>
  <div id="app">
    <Header />
    <main class="min-h-screen">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style>
#app {
  width: 100%;
  min-height: 100vh;
}
</style>
