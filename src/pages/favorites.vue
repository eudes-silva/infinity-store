<script lang="ts" setup>
import Card from "@/components/organisms/Card.vue";
import { computed } from "vue";
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();
import { useFavoritesStore } from "@/stores/FavoritesStore";
const store = useFavoritesStore();
const favorites = computed(() => store.favorites);
function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
</script>

<template>
  <v-container class="h-100 pt-16 pb-0">
    <v-row :class="mobile ? 'mx-2' : 'mx-8'" class="h-90 mb-14 mt-4 pt-16">
      <v-col
        v-for="favorite in favorites"
        :key="favorite.id"
        cols="xl-2 lg-3 md-4 sm-1 mx-auto favorite-col mb-16"
      >
        <Card
          kind="secondary"
          props-class="favorite-card h-100 rounded-lg bg-white elevation-5 mx-auto"
        >
          <template #cover>
            <v-img :src="favorite.photo_url" transition="fade-transition">
              <v-icon class="favorite-icon" size="36">mdi-heart</v-icon>
            </v-img>
          </template>
          <template #content>
            <div class="d-flex justify-space-between pa-4">
              <span>{{ favorite.name }}</span
              ><span class="font-weight-bold">{{
                formatCurrency(favorite.price)
              }}</span>
            </div>
          </template>
        </Card>
        <v-btn
          @click="store.removeFavorite(favorite.id)"
          icon
          variant="outlined"
          class="remove-favorite-icon text-red mt-5"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.favorite-col {
  position: relative;
}
.favorite-icon {
  position: absolute;
  top: 20px;
  right: 20px;
}
.remove-favorite-icon {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
