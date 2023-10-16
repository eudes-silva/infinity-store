import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesStore = defineStore(
  "favorites",
  () => {
    const favorites = ref(
      [] as Array<{
        id: number;
        name: string;
        price: number;
        photo_url: string;
      }>
    );
    function toggleFavorite(item: {
      id: number;
      name: string;
      price: number;
      photo_url: string;
    }) {
      if (
        !favorites.value.some(
          (favoriteItem: {
            id?: number;
            name: string;
            price: number;
            photo_url: string;
          }) => favoriteItem.id === item.id
        )
      ) {
        favorites.value = [...favorites.value, item];
      } else {
        favorites.value = favorites.value.filter(
          (favoriteItem: {
            id?: number;
            name: string;
            price: number;
            photo_url: string;
          }) => favoriteItem.id !== item.id
        );
      }
    }

    return { favorites, toggleFavorite };
  },
  {
    persist: true,
  }
);
