<script lang="ts" setup>
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();
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
    class="header d-flex justify-space-between align-center py-8 bg-white w-100 elevation-4"
  >
    <span v-if="$slots.appTitle" class="text-h4 font-weight-bold">
      <router-link to="/" class="text-grey-darken-4 text-decoration-none">
        <slot name="appTitle">
          {{ props.appTitle }}
        </slot>
      </router-link>
    </span>
    <nav>
      <ul class="d-flex">
        <li
          class="nav-item ml-6"
          v-for="navItem in props.navItems"
          :key="navItem.id"
        >
          <router-link
            class="text-grey-darken-4 text-decoration-none"
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
  border-bottom: 1px solid #212121;
}
.nav-item {
  list-style-type: none;
}
</style>
