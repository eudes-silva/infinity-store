<script lang="ts" setup>
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();

import { useRoute } from "vue-router";
const route = useRoute();

const props = withDefaults(
  defineProps<{
    navItems?: { id: number; path: string; title: string }[];
    appTitle?: string;
  }>(),
  {
    navItems: () => [
      { id: 1, path: "/", title: "Home" },
      { id: 2, path: "/favorites", title: "Favoritos" },
    ],
  }
);
</script>
<template>
  <header
    :class="mobile ? 'px-4' : 'px-10'"
    class="bg-grey-darken-4 header d-flex justify-space-between align-center py-8 bg-white w-100 elevation-6"
  >
    <span v-if="$slots.appTitle" class="text-h4 font-weight-bold">
      <router-link to="/" class="text-white text-decoration-none">
        <slot name="appTitle">
          {{ props.appTitle }}
        </slot>
      </router-link>
    </span>
    <nav>
      <ul class="d-flex">
        <li
          class="nav-item ml-8 user-select-none"
          v-for="navItem in props.navItems"
          :key="navItem.id"
          :class="{
            'text-decoration-underline': navItem.path === route.fullPath,
          }"
        >
          <router-link
            class="text-white text-decoration-none font-weight-medium"
            :to="navItem.path"
            >{{ navItem.title }}</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>
<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 10;
}
.nav-item {
  list-style-type: none;
  text-underline-offset: 6px;
  text-decoration-thickness: 3px !important;
}
</style>
