<script lang="ts" setup>
import { computed } from "vue";
import { useFavoritesStore } from "@/stores/FavoritesStore";
const store = useFavoritesStore();
const favorites = computed(() => store.favorites);
</script>

<template>
  <div class="h-100 bg-green ma-auto">{{ favorites }}</div>
</template>
