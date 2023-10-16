<script setup lang="ts">
import Header from "@/components/organisms/Header.vue";
</script>
<template>
  <Header>
    <template #appTitle> InfinityStore </template>
  </Header>
  <router-view></router-view>
</template>
