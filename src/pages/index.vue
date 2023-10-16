<script lang="ts" setup>
import Card from "@/components/organisms/Card.vue";
import { onMounted, ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();
import { useFavoritesStore } from "@/stores/FavoritesStore";
const store = useFavoritesStore();

const products: any = ref([]);
const infiniteLoadScroll = ref(null);
const offset = ref(0);

onMounted(() => {
  products.value = [];
  fetchProducts();
});
async function fetchProducts() {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products?offset=${offset.value}&limit=20`
    )
      .then((res) => res.json())
      .then((json) => json);
    if (products.value.length < 60) {
      products.value.push(...response);
    }
  } catch (error) {
    console.error(error);
  }
}

useIntersectionObserver(infiniteLoadScroll, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    setTimeout(() => {
      offset.value += 20;
      fetchProducts();
    }, 4000);
  }
});
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
        v-for="product in products"
        :key="product.index"
        cols="xl-2 lg-3 md-4 sm-1"
      >
        <Card
          kind="secondary"
          props-class="product-card h-100 rounded-lg bg-white elevation-5"
        >
          <template #cover>
            <v-img :src="product.images[2]" transition="fade-transition">
              <v-icon
                @click="store.toggleFavorite(product)"
                class="favorite-icon"
                size="36"
                >{{
                  store.favorites.some((item) => item.id == product.id)
                    ? "mdi-heart"
                    : "mdi-heart-outline"
                }}</v-icon
              >
            </v-img>
          </template>
          <template #content>
            <div class="d-flex justify-space-between pa-4">
              <span>{{ product.title }}</span
              ><span class="font-weight-bold">{{
                formatCurrency(product.price)
              }}</span>
            </div>
          </template>
        </Card>
      </v-col>
    </v-row>
    <div v-if="products.length !== 60" class="text-center pb-14">
      <v-progress-circular
        :size="36"
        :width="6"
        ref="infiniteLoadScroll"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>
<style>
.product-card {
  position: relative;
}
.favorite-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>
