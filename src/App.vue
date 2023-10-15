<script setup lang="ts">
import Header from "@/components/Header.vue";
</script>
<template>
  <Header />
  <main class="wrapper">
    <router-view></router-view>
  </main>
</template>
<style lang="scss">
.wrapper {
  height: 100%;
}
</style>
